const Excecao_model = require("../Model/Excecao_model");
const Barbeiro_model = require("../Model/Barbeiro_model");
const Error_services = require("../Services/Error_services");

const Excecao_Controller = {
    // Listar todas as exceções
    listar: async (request, response) => {
        try {
            const dados = await Excecao_model.findAll({
                include: [{
                    model: Barbeiro_model,
                    as: 'barbeiro',
                    attributes: ['id', 'nome_barbeiro']
                }],
                order: [['data', 'ASC'], ['hora_inicio', 'ASC']]
            });
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar as exceções.', e, response);
        }
    },

    // Listar exceções por barbeiro
    listarPorBarbeiro: async (request, response) => {
        try {
            const { id_barbeiro } = request.params;
            const { data_inicio, data_fim } = request.query;
            
            let whereClause = { id_barbeiro };
            
            if (data_inicio && data_fim) {
                whereClause.data = {
                    [Excecao_model.sequelize.Op.between]: [data_inicio, data_fim]
                };
            }
            
            const dados = await Excecao_model.findAll({
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
            return Error_services.validacaoErro('Não foi possível listar as exceções do barbeiro.', e, response);
        }
    },

    // Criar nova exceção
    criar: async (request, response) => {
        try {
            const dados = request.body;
            
            // Validações básicas
            if (!dados.id_barbeiro || !dados.data || !dados.hora_inicio || !dados.hora_fim || !dados.tipo_excecao) {
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

            // Validar tipo de exceção
            const tiposValidos = ['ferias', 'feriado', 'doenca', 'evento', 'outro'];
            if (!tiposValidos.includes(dados.tipo_excecao)) {
                return response.status(400).json({
                    message: 'Tipo de exceção inválido. Use: ferias, feriado, doenca, evento ou outro.'
                });
            }

            // Validar data (não pode ser no passado)
            const dataExcecao = new Date(dados.data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            if (dataExcecao < hoje) {
                return response.status(400).json({
                    message: 'Data da exceção não pode ser no passado.'
                });
            }

            // Validar horários
            const horaInicio = new Date(`2000-01-01 ${dados.hora_inicio}`);
            const horaFim = new Date(`2000-01-01 ${dados.hora_fim}`);
            
            if (horaInicio >= horaFim) {
                return response.status(400).json({
                    message: 'Hora de início deve ser menor que hora de fim.'
                });
            }

            // Verificar se já existe exceção para este barbeiro neste horário
            const excecaoExistente = await Excecao_model.findOne({
                where: {
                    id_barbeiro: dados.id_barbeiro,
                    data: dados.data,
                    hora_inicio: dados.hora_inicio,
                    hora_fim: dados.hora_fim
                }
            });

            if (excecaoExistente) {
                return response.status(422).json({
                    message: 'Já existe exceção para este horário.'
                });
            }

            await Excecao_model.create(dados);
            return response.json({ 
                message: 'Exceção criada com sucesso!',
                data: dados
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível criar a exceção.', e, response);
        }
    },

    // Criar exceção para período (múltiplos dias)
    criarExcecaoPeriodo: async (request, response) => {
        try {
            const { id_barbeiro, data_inicio, data_fim, hora_inicio, hora_fim, tipo_excecao } = request.body;
            
            if (!id_barbeiro || !data_inicio || !data_fim || !hora_inicio || !hora_fim || !tipo_excecao) {
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

            // Validar tipo de exceção
            const tiposValidos = ['ferias', 'feriado', 'doenca', 'evento', 'outro'];
            if (!tiposValidos.includes(tipo_excecao)) {
                return response.status(400).json({
                    message: 'Tipo de exceção inválido.'
                });
            }

            // Validar datas
            const inicio = new Date(data_inicio);
            const fim = new Date(data_fim);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            if (inicio < hoje || fim < inicio) {
                return response.status(400).json({
                    message: 'Datas inválidas.'
                });
            }

            // Validar horários
            const horaInicio = new Date(`2000-01-01 ${hora_inicio}`);
            const horaFim = new Date(`2000-01-01 ${hora_fim}`);
            
            if (horaInicio >= horaFim) {
                return response.status(400).json({
                    message: 'Hora de início deve ser menor que hora de fim.'
                });
            }

            const excecoesCriadas = [];
            
            // Criar exceção para cada dia no período
            for (let data = new Date(inicio); data <= fim; data.setDate(data.getDate() + 1)) {
                const dataFormatada = data.toISOString().split('T')[0];
                
                // Verificar se já existe exceção para este dia
                const excecaoExistente = await Excecao_model.findOne({
                    where: {
                        id_barbeiro,
                        data: dataFormatada,
                        hora_inicio,
                        hora_fim
                    }
                });

                if (!excecaoExistente) {
                    const novaExcecao = await Excecao_model.create({
                        id_barbeiro,
                        data: dataFormatada,
                        hora_inicio,
                        hora_fim,
                        tipo_excecao
                    });
                    excecoesCriadas.push(novaExcecao);
                }
            }

            return response.json({
                message: `${excecoesCriadas.length} exceções criadas com sucesso!`,
                excecoes_criadas: excecoesCriadas
            });

        } catch(e) {
            return Error_services.validacaoErro('Não foi possível criar as exceções do período.', e, response);
        }
    },

    // Atualizar exceção
    atualizar: async (request, response) => {
        try {
            const dados = request.body;
            const { id } = request.params;
            
            // Verificar se a exceção existe
            const excecao = await Excecao_model.findByPk(id);
            if (!excecao) {
                return response.status(404).json({
                    message: 'Exceção não encontrada.'
                });
            }

            // Validações
            if (dados.tipo_excecao) {
                const tiposValidos = ['ferias', 'feriado', 'doenca', 'evento', 'outro'];
                if (!tiposValidos.includes(dados.tipo_excecao)) {
                    return response.status(400).json({
                        message: 'Tipo de exceção inválido.'
                    });
                }
            }

            if (dados.data) {
                const dataExcecao = new Date(dados.data);
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                
                if (dataExcecao < hoje) {
                    return response.status(400).json({
                        message: 'Data da exceção não pode ser no passado.'
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

            await Excecao_model.update(dados, {
                where: { id }
            });
            
            return response.json({
                message: "Exceção atualizada com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar a exceção.', e, response);
        }
    },

    // Deletar exceção
    deletar: async (request, response) => {
        try {
            const { id } = request.params;
            
            const excecao = await Excecao_model.findByPk(id);
            if (!excecao) {
                return response.status(404).json({
                    message: 'Exceção não encontrada.'
                });
            }
            
            await Excecao_model.destroy({
                where: { id }
            });
            
            return response.json({
                message: "Exceção deletada com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar a exceção.', e, response);
        }
    }
};

module.exports = Excecao_Controller;
