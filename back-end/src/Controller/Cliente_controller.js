const Cliente_model = require("../Model/Cliente_model");
const Error_services = require("../Services/Error_services");
const Cliente_services = require("../Services/Cliente_services");
const Helpers = require('../Config/Helper.js');

const Cliente_Controller = {
    listar: async (request, response) => {
        const dados = await Cliente_model.findAll();
        return response.json(dados);
    },
    
    consultarPorID: async (request, response) => {
        const id = request.params.id;
        const dados = await Cliente_model.findByPk(id);
        return response.json(dados);
    },
    
    criar: async (request, response) => {
        try {
            const dados = request.body;
            dados.senha = Helpers.crypto(dados.senha);
            await Cliente_services.validandoCliente(dados);
            await Cliente_model.create(dados);
            return response.json({ 
                message: 'Cliente criado com sucesso!',
                data: dados
            })  
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível cadastrar seu cliente.', e, response);
        }
    },
    
    atualizar: async (request, response) => {
        try {
            const dados = request.body;
            const id = request.params.id;
            
            if (dados.senha) {
                dados.senha = Helpers.crypto(dados.senha);
            }
            
            await Cliente_model.update(dados, {
                where: {
                    id: id
                }
            });
            
            return response.json({
                message: "Cliente atualizado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível atualizar o cliente.', e, response);
        }
    },
    
    deletar: async (request, response) => {
        try {
            const id = request.params.id;
            await Cliente_model.destroy({
                where: {
                    id: id
                }
            });
            
            return response.json({
                message: "Cliente deletado com sucesso!"
            });
        } catch(e) {
            return Error_services.validacaoErro('Não foi possível deletar o cliente.', e, response);
        }
    }
};

module.exports = Cliente_Controller;
