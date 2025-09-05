const SlotModel = require("../Model/SlotModel.js");
const Barbeiro_model = require("../Model/Barbeiro_model");
const Disponibilidade_model = require("../Model/Disponibilidae_model");
const Excecao_model = require("../Model/Excecao_model");
const Error_services = require("../Services/Error_services");

const Slot_agendamento_Controller = {
    // Listar todos os slots
    listar: async (request, response) => {
        try {
            const dados = await SlotModel.findAll({
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['data', 'ASC'], ['hora_inicio', 'ASC']]
            });
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os slots.', e, response);
        }
    },

    // Listar slots por barbeiro
    listarPorBarbeiro: async (request, response) => {
        try {
            const { id_barbeiro } = request.params;
            const { data } = request.query;
            
            let whereClause = { id_barbeiro };
            if (data) {
                whereClause.data = data;
            }
            
            const dados = await SlotModel.findAll({
                where: whereClause,
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['data', 'ASC'], ['hora_inicio', 'ASC']]
            });
            
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os slots do barbeiro.', e, response);
        }
    },

    // Listar slots disponíveis por barbeiro e data
    listarDisponiveis: async (request, response) => {
        try {
            const { id_barbeiro, data } = request.params;
            
            if (!id_barbeiro || !data) {
                return response.status(400).json({
                    message: 'ID do barbeiro e data são obrigatórios.'
                });
            }

            // Buscar slots disponíveis (status: 'disponivel')
            const slotsDisponiveis = await SlotModel.findAll({
                where: {
                    id_barbeiro,
                    data,
                    status: 'disponivel'
                },
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['hora_inicio', 'ASC']]
            });

            return response.json(slotsDisponiveis);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os slots disponíveis.', e, response);
        }
    },

    // Criar slots baseado na disponibilidade semanal
    criarSlots: async (request, response) => {
        try {
            const { id_barbeiro, data_inicio, data_fim } = request.body;
            
            if (!id_barbeiro || !data_inicio || !data_fim) {
                return response.status(400).json({
                    message: 'Todos os campos são obrigatórios.'
                });
            }

            // Verificar se o barbeiro existe
            const barbeiro = await Barbeiro_model.findByPk(id_barbeiro);
            if (!barbeiro) {
                return response.status(404).json({
                    message: 'Barbeiro não encontrado.'
                });
            }

            // Buscar disponibilidades do barbeiro
            const disponibilidades = await Disponibilidade_model.findAll({
                where: { id_barbeiro }
            });

            if (disponibilidades.length === 0) {
                return response.status(400).json({
                    message: 'Barbeiro não possui disponibilidades cadastradas.'
                });
            }

            const slotsCriados = [];
            const dataInicio = new Date(data_inicio);
            const dataFim = new Date(data_fim);

            // Gerar slots para cada dia no intervalo
            for (let data = new Date(dataInicio); data <= dataFim; data.setDate(data.getDate() + 1)) {
                const diaSemana = this.getDiaSemana(data);
                
                // Buscar disponibilidades para este dia da semana
                const disponibilidadeDia = disponibilidades.filter(d => d.dia_semana === diaSemana);
                
                for (const disp of disponibilidadeDia) {
                    // Gerar slots de 45 em 45 minutos
                    const slots = this.gerarSlotsDoHorario(disp.hora_inicio, disp.hora_fim, data);
                    
                    for (const slot of slots) {
                        // Verificar se já existe slot para este horário
                        const slotExistente = await SlotModel.findOne({
                            where: {
                                id_barbeiro,
                                data: slot.data,
                                hora_inicio: slot.hora_inicio,
                                hora_fim: slot.hora_fim
                            }
                        });

                        if (!slotExistente) {
                            // Verificar se há exceção para este horário
                            const excecao = await Excecao_model.findOne({
                                where: {
                                    id_barbeiro,
                                    data: slot.data,
                                    hora_inicio: slot.hora_inicio,
                                    hora_fim: slot.hora_fim
                                }
                            });

                            if (!excecao) {
                                const novoSlot = await SlotModel.create({
                                    id_barbeiro,
                                    data: slot.data,
                                    hora_inicio: slot.hora_inicio,
                                    hora_fim: slot.hora_fim,
                                    status: 'disponivel'
                                });
                                slotsCriados.push(novoSlot);
                            }
                        }
                    }
                }
            }

            return response.json({
                message: `${slotsCriados.length} slots criados com sucesso!`,
                slots_criados: slotsCriados
            });

        } catch(e) {
            return Error_services.validacaoErro('Não foi possível criar os slots.', e, response);
        }
    },

    // Atualizar status do slot
    atualizarStatus: async (request, response) => {
        try {
            const { id } = request.params;
            const { status } = request.body;
            
            const statusValidos = ['disponivel', 'agendado', 'cancelado', 'finalizado'];
            if (!statusValidos.includes(status)) {
                return response.status(400).json({
                    message: 'Status inválido. Use: disponivel, agendado, cancelado ou finalizado.'
                });
            }

            const slot = await SlotModel.findByPk(id);
            if (!slot) {
                return response.status(404).json({
                    message: 'Slot não encontrado.'
                });
            }

            await SlotModel.update({ status }, {
                where: { id }
            });
            
            return response.json({
                message: "Status do slot atualizado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar o status do slot.', e, response);
        }
    },

    // Deletar slot
    deletar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const slot = await SlotModel.findByPk(id);
            if (!slot) {
                return response.status(404).json({
                    message: 'Slot não encontrado.'
                });
            }
            
            await SlotModel.destroy({
                where: { id }
            });
            
            return response.json({
                message: "Slot deletado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar o slot.', e, response);
        }
    },

    // Método auxiliar para obter dia da semana
    getDiaSemana: (data) => {
        const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return dias[data.getDay()];
    },

    // Método auxiliar para gerar slots de 45 em 45 minutos
    gerarSlotsDoHorario: (horaInicio, horaFim, data) => {
        const slots = [];
        const inicio = new Date(`2000-01-01 ${horaInicio}`);
        const fim = new Date(`2000-01-01 ${horaFim}`);
        
        let horaAtual = new Date(inicio);
        
        while (horaAtual < fim) {
            const horaFimSlot = new Date(horaAtual.getTime() + 45 * 60000); // +45 minutos
            
            if (horaFimSlot <= fim) {
                slots.push({
                    data: data.toISOString().split('T')[0],
                    hora_inicio: horaAtual.toTimeString().slice(0, 5),
                    hora_fim: horaFimSlot.toTimeString().slice(0, 5)
                });
            }
            
            horaAtual = horaFimSlot;
        }
        
        return slots;
    }
};

module.exports = Slot_agendamento_Controller;
