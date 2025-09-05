const Barbeiro_model = require("../Model/Barbeiro_model");
const Error_services = require("../Services/Error_services");

const Barbeiro_Controller = {
    listar: async (request, response) => {
        try {
            const dados = await Barbeiro_model.findAll();
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível listar os barbeiros.', e, response);
        }
    },
    
    consultarPorID: async (request, response) => {
        try {
            const id = request.params.id;
            const dados = await Barbeiro_model.findByPk(id);
            
            if (!dados) {
                return response.status(404).json({
                    message: 'Barbeiro não encontrado.'
                });
            }
            
            return response.json(dados);
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível consultar o barbeiro.', e, response);
        }
    },
    
    criar: async (request, response) => {
        try {
            const dados = request.body;
            
            // Validação básica do nome
            if (!dados.nome_barbeiro || dados.nome_barbeiro.trim().length < 2) {
                return response.status(400).json({
                    message: 'O nome do barbeiro deve ter pelo menos 2 caracteres.'
                });
            }
            
            // Verifica se já existe um barbeiro com o mesmo nome
            const barbeiroExistente = await Barbeiro_model.findOne({
                where: { nome_barbeiro: dados.nome_barbeiro }
            });
            
            if (barbeiroExistente) {
                return response.status(422).json({
                    message: 'Já existe um barbeiro com este nome.'
                });
            }
            
            await Barbeiro_model.create(dados);
            return response.json({ 
                message: 'Barbeiro criado com sucesso!',
                data: dados
            })  
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível cadastrar o barbeiro.', e, response);
        }
    },
    
    atualizar: async (request, response) => {
        try {
            const dados = request.body;
            const id = request.params.id;
            
            // Validação básica do nome
            if (!dados.nome_barbeiro || dados.nome_barbeiro.trim().length < 2) {
                return response.status(400).json({
                    message: 'O nome do barbeiro deve ter pelo menos 2 caracteres.'
                });
            }
            
            // Verifica se já existe outro barbeiro com o mesmo nome
            const barbeiroExistente = await Barbeiro_model.findOne({
                where: { 
                    nome_barbeiro: dados.nome_barbeiro,
                    id: { [Barbeiro_model.sequelize.Op.ne]: id }
                }
            });
            
            if (barbeiroExistente) {
                return response.status(422).json({
                    message: 'Já existe outro barbeiro com este nome.'
                });
            }
            
            await Barbeiro_model.update(dados, {
                where: {
                    id: id
                }
            });
            
            return response.json({
                message: "Barbeiro atualizado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar o barbeiro.', e, response);
        }
    },
    
    deletar: async (request, response) => {
        try {
            const id = request.params.id;
            
            // Verifica se o barbeiro existe
            const barbeiro = await Barbeiro_model.findByPk(id);
            if (!barbeiro) {
                return response.status(404).json({
                    message: 'Barbeiro não encontrado.'
                });
            }
            
            await Barbeiro_model.destroy({
                where: {
                    id: id
                }
            });
            
            return response.json({
                message: "Barbeiro deletado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar o barbeiro.', e, response);
        }
    }
};

module.exports = Barbeiro_Controller;
