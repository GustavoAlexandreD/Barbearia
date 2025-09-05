const Agendamento_model = require("../Model/Agendamento_model");
const Cliente_model = require("../Model/Cliente_model");
const Barbeiro_model = require("../Model/Barbeiro_model");
const SlotModel = require("../Model/SlotModel");
const Error_services = require("../Services/Error_services");

const Agendamento_Controller = {
    // Listar todos os agendamentos
    listar: async (request, response) => {
        try {
            const dados = await Agendamento_model.findAll({
                include: [
                    {
                        model: Cliente_model,
                        as: 'cliente',
                        attributes: ['id', 'nome_cliente', 'email']
                    },
                    {
                        model: Barbeiro_model,
                        as: 'barbeiro',
                        attributes: ['id', 'nome_barbeiro']
                    },
                    {
                        model: SlotModel,
                        as: 'slot',
                        attributes: ['id', 'data', 'hora_inicio', 'hora_fim', 'status']
                    }
                ],
                order: [['slot', 'data', 'ASC'], ['slot', 'hora_inicio', 'ASC']]
            });
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os agendamentos.', e, response);
        }
    },

    // Listar agendamentos por cliente
    listarPorCliente: async (request, response) => {
        try {
            const { id_cliente } = request.params;
            
            const dados = await Agendamento_model.findAll({
                where: { id_cliente },
                include: [
                    {
                        model: Cliente_model,
                        as: 'cliente',
                        attributes: ['id', 'nome_cliente', 'email']
                    },
                    {
                        model: Barbeiro_model,
                        as: 'barbeiro',
                        attributes: ['id', 'nome_barbeiro']
                    },
                    {
                        model: SlotModel,
                        as: 'slot',
                        attributes: ['id', 'data', 'hora_inicio', 'hora_fim', 'status']
                    }
                ],
                order: [['slot', 'data', 'ASC'], ['slot', 'hora_inicio', 'ASC']]
            });
            
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os agendamentos do cliente.', e, response);
        }
    },

    // Listar agendamentos por barbeiro
    listarPorBarbeiro: async (request, response) => {
        try {
            const { id_barbeiro } = request.params;
            const { data } = request.query;
            
            let whereClause = { id_barbeiro };
            
            const dados = await Agendamento_model.findAll({
                where: whereClause,
                include: [
                    {
                        model: Cliente_model,
                        as: 'cliente',
                        attributes: ['id', 'nome_cliente', 'email']
                    },
                    {
                        model: Barbeiro_model,
                        as: 'barbeiro',
                        attributes: ['id', 'nome_barbeiro']
                    },
                    {
                        model: SlotModel,
                        as: 'slot',
                        attributes: ['id', 'data', 'hora_inicio', 'hora_fim', 'status']
                    }
                ],
                order: [['slot', 'data', 'ASC'], ['slot', 'hora_inicio', 'ASC']]
            });
            
            // Filtrar por data se fornecida
            let agendamentosFiltrados = dados;
            if (data) {
                agendamentosFiltrados = dados.filter(agendamento => 
                    agendamento.slot.data === data
                );
            }
            
            return response.json(agendamentosFiltrados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os agendamentos do barbeiro.', e, response);
        }
    },

    // Consultar agendamento por ID
    consultarPorID: async (request, response) => {
        try {
            const { id } = request.params;
            
            const dados = await Agendamento_model.findByPk(id, {
                include: [
                    {
                        model: Cliente_model,
                        as: 'cliente',
                        attributes: ['id', 'nome_cliente', 'email']
                    },
                    {
                        model: Barbeiro_model,
                        as: 'barbeiro',
                        attributes: ['id', 'nome_barbeiro']
                    },
                    {
                        model: SlotModel,
                        as: 'slot',
                        attributes: ['id', 'data', 'hora_inicio', 'hora_fim', 'status']
                    }
                ]
            });
            
            if (!dados) {
                return response.status(404).json({
                    message: 'Agendamento não encontrado.'
                });
            }
            
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível consultar o agendamento.', e, response);
        }
    },

    // Criar novo agendamento
    criar: async (request, response) => {
        try {
            const dados = request.body;
            
            // Validações básicas
            if (!dados.id_cliente || !dados.id_barbeiro || !dados.id_slot) {
                return response.status(400).json({
                    message: 'Todos os campos são obrigatórios.'
                });
            }

            // Verificar se o cliente existe
            const cliente = await Cliente_model.findByPk(dados.id_cliente);
            if (!cliente) {
                return response.status(404).json({
                    message: 'Cliente não encontrado.'
                });
            }

            // Verificar se o barbeiro existe
            const barbeiro = await Barbeiro_model.findByPk(dados.id_barbeiro);
            if (!barbeiro) {
                return response.status(404).json({
                    message: 'Barbeiro não encontrado.'
                });
            }

            // Verificar se o slot existe e está disponível
            const slot = await SlotModel.findByPk(dados.id_slot);
            if (!slot) {
                return response.status(404).json({
                    message: 'Slot de agendamento não encontrado.'
                });
            }

            if (slot.status !== 'disponivel') {
                return response.status(422).json({
                    message: 'Slot não está disponível para agendamento.'
                });
            }

            // Verificar se o slot pertence ao barbeiro
            if (slot.id_barbeiro !== dados.id_barbeiro) {
                return response.status(422).json({
                    message: 'Slot não pertence ao barbeiro selecionado.'
                });
            }

            // Verificar se o cliente já tem agendamento neste horário
            const agendamentoExistente = await Agendamento_model.findOne({
                where: {
                    id_cliente: dados.id_cliente,
                    id_slot: dados.id_slot
                }
            });

            if (agendamentoExistente) {
                return response.status(422).json({
                    message: 'Cliente já possui agendamento neste horário.'
                });
            }

            // Criar o agendamento
            const novoAgendamento = await Agendamento_model.create(dados);
            
            // Atualizar o status do slot para 'agendado'
            await SlotModel.update(
                { status: 'agendado' },
                { where: { id: dados.id_slot } }
            );

            return response.json({ 
                message: 'Agendamento criado com sucesso!',
                data: novoAgendamento
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível criar o agendamento.', e, response);
        }
    },

    // Atualizar agendamento
    atualizar: async (request, response) => {
        try {
            const dados = request.body;
            const { id } = request.params;
            
            // Verificar se o agendamento existe
            const agendamento = await Agendamento_model.findByPk(id);
            if (!agendamento) {
                return response.status(404).json({
                    message: 'Agendamento não encontrado.'
                });
            }

            // Se estiver alterando o slot, verificar disponibilidade
            if (dados.id_slot && dados.id_slot !== agendamento.id_slot) {
                const novoSlot = await SlotModel.findByPk(dados.id_slot);
                if (!novoSlot || novoSlot.status !== 'disponivel') {
                    return response.status(422).json({
                        message: 'Novo slot não está disponível.'
                    });
                }

                // Liberar o slot antigo
                await SlotModel.update(
                    { status: 'disponivel' },
                    { where: { id: agendamento.id_slot } }
                );

                // Reservar o novo slot
                await SlotModel.update(
                    { status: 'agendado' },
                    { where: { id: dados.id_slot } }
                );
            }

            await Agendamento_model.update(dados, {
                where: { id }
            });
            
            return response.json({
                message: "Agendamento atualizado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar o agendamento.', e, response);
        }
    },

    // Cancelar agendamento
    cancelar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const agendamento = await Agendamento_model.findByPk(id);
            if (!agendamento) {
                return response.status(404).json({
                    message: 'Agendamento não encontrado.'
                });
            }

            // Liberar o slot
            await SlotModel.update(
                { status: 'disponivel' },
                { where: { id: agendamento.id_slot } }
            );

            // Deletar o agendamento
            await Agendamento_model.destroy({
                where: { id }
            });
            
            return response.json({
                message: "Agendamento cancelado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível cancelar o agendamento.', e, response);
        }
    },

    // Finalizar agendamento
    finalizar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const agendamento = await Agendamento_model.findByPk(id);
            if (!agendamento) {
                return response.status(404).json({
                    message: 'Agendamento não encontrado.'
                });
            }

            // Atualizar status do slot para 'finalizado'
            await SlotModel.update(
                { status: 'finalizado' },
                { where: { id: agendamento.id_slot } }
            );
            
            return response.json({
                message: "Agendamento finalizado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível finalizar o agendamento.', e, response);
        }
    },

    // Deletar agendamento
    deletar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const agendamento = await Agendamento_model.findByPk(id);
            if (!agendamento) {
                return response.status(404).json({
                    message: 'Agendamento não encontrado.'
                });
            }

            // Liberar o slot se estiver agendado
            if (agendamento.slot && agendamento.slot.status === 'agendado') {
                await SlotModel.update(
                    { status: 'disponivel' },
                    { where: { id: agendamento.id_slot } }
                );
            }
            
            await Agendamento_model.destroy({
                where: { id }
            });
            
            return response.json({
                message: "Agendamento deletado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar o agendamento.', e, response);
        }
    }
};

module.exports = Agendamento_Controller;
