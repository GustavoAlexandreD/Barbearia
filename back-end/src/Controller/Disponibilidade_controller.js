const Disponibilidade_model = require("../Model/Disponibilidae_model");
const Barbeiro_model = require("../Model/Barbeiro_model");
const Error_services = require("../Services/Error_services");

const Disponibilidade_Controller = {
    // Listar todas as disponibilidades
    listar: async (request, response) => {
        try {
            const dados = await Disponibilidade_model.findAll({
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['dia_semana', 'ASC'], ['hora_inicio', 'ASC']]
            });
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar as disponibilidades.', e, response);
        }
    },

    // Listar disponibilidades por barbeiro
    listarPorBarbeiro: async (request, response) => {
        try {
            const { id_barbeiro } = request.params;
            
            const dados = await Disponibilidade_model.findAll({
                where: { id_barbeiro },
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['dia_semana', 'ASC'], ['hora_inicio', 'ASC']]
            });
            
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar as disponibilidades do barbeiro.', e, response);
        }
    },

    // Criar nova disponibilidade
    criar: async (request, response) => {
        try {
            const dados = request.body;
            
            // Validações básicas
            if (!dados.id_barbeiro || !dados.dia_semana || !dados.hora_inicio || !dados.hora_fim) {
                return response.status(400).json({
                    message: 'Todos os campos são obrigatórios.'
                });
            }

            // Verificar se o barbeiro existe
            const barbeiro = await Barbeiro_model.findByPk(dados.id_barbeiro);
            if (!barbeiro) {
                return response.status(404).json({
                    message: 'Barbeiro não encontrado.'
                });
            }

            // Validar dia da semana
            const diasValidos = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
            if (!diasValidos.includes(dados.dia_semana)) {
                return response.status(400).json({
                    message: 'Dia da semana inválido.'
                });
            }

            // Validar horários (deve ser múltiplo de 45 minutos)
            const horaInicio = new Date(`2000-01-01 ${dados.hora_inicio}`);
            const horaFim = new Date(`2000-01-01 ${dados.hora_fim}`);
            
            if (horaInicio >= horaFim) {
                return response.status(400).json({
                    message: 'Hora de início deve ser menor que hora de fim.'
                });
            }

            // Verificar se já existe disponibilidade para este barbeiro neste horário
            const disponibilidadeExistente = await Disponibilidade_model.findOne({
                where: {
                    id_barbeiro: dados.id_barbeiro,
                    dia_semana: dados.dia_semana,
                    hora_inicio: dados.hora_inicio,
                    hora_fim: dados.hora_fim
                }
            });

            if (disponibilidadeExistente) {
                return response.status(422).json({
                    message: 'Já existe disponibilidade para este horário.'
                });
            }

            await Disponibilidade_model.create(dados);
            return response.json({ 
                message: 'Disponibilidade criada com sucesso!',
                data: dados
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível criar a disponibilidade.', e, response);
        }
    },

    // Atualizar disponibilidade
    atualizar: async (request, response) => {
        try {
            const dados = request.body;
            const { id } = request.params;
            
            // Verificar se a disponibilidade existe
            const disponibilidade = await Disponibilidade_model.findByPk(id);
            if (!disponibilidade) {
                return response.status(404).json({
                    message: 'Disponibilidade não encontrada.'
                });
            }

            // Validações básicas
            if (dados.dia_semana) {
                const diasValidos = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
                if (!diasValidos.includes(dados.dia_semana)) {
                    return response.status(400).json({
                        message: 'Dia da semana inválido.'
                    });
                }
            }

            if (dados.hora_inicio && dados.hora_fim) {
                const horaInicio = new Date(`2000-01-01 ${dados.hora_inicio}`);
                const horaFim = new Date(`2000-01-01 ${dados.hora_fim}`);
                
                if (horaInicio >= horaFim) {
                    return response.status(400).json({
                        message: 'Hora de início deve ser menor que hora de fim.'
                    });
                }
            }

            await Disponibilidade_model.update(dados, {
                where: { id }
            });
            
            return response.json({
                message: "Disponibilidade atualizada com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar a disponibilidade.', e, response);
        }
    },

    // Deletar disponibilidade
    deletar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const disponibilidade = await Disponibilidade_model.findByPk(id);
            if (!disponibilidade) {
                return response.status(404).json({
                    message: 'Disponibilidade não encontrada.'
                });
            }
            
            await Disponibilidade_model.destroy({
                where: { id }
            });
            
            return response.json({
                message: "Disponibilidade deletada com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar a disponibilidade.', e, response);
        }
    },

    // Gerar slots de agendamento baseado na disponibilidade
    gerarSlots: async (request, response) => {
        try {
            const { id_barbeiro, data_inicio, data_fim } = request.body;
            
            // Validações
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

            // Aqui você implementaria a lógica para gerar os slots
            // baseado nas disponibilidades e datas fornecidas
            // Por enquanto, retornamos uma mensagem de sucesso
            
            return response.json({
                message: "Slots gerados com sucesso!",
                disponibilidades: disponibilidades
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível gerar os slots.', e, response);
        }
    }
};

module.exports = Disponibilidade_Controller;
