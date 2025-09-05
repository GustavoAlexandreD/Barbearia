const Cliente = require("../models/Cliente_model");

const Cliente_services = {

    validandoCliente: async (dados) => {

        // Validação do nome
        if (!dados.nome_cliente || dados.nome_cliente.trim().length < 3) {
            throw ('O nome deve ter pelo menos 3 caracteres.');
        }

        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // aceita letras e acentos
        if (!regexNome.test(dados.nome_cliente)) {
            throw ('O nome deve conter apenas letras e espaços.');
        }

        // Validação do e-mail - deve terminar com @gmail.com
        const regexEmailGmail = /^[^\s@]+@gmail\.com$/;
        if (!dados.email || !regexEmailGmail.test(dados.email)) {
            throw ('O e-mail deve terminar com @gmail.com');
        }

        // Verifica se o e-mail já está em uso
        const clienteExistente = await Cliente.findOne({
            where: { email: dados.email }
        });
        if (clienteExistente) {
            throw ('E-mail já está sendo utilizado por outro cliente.');
        }

        // Validação da senha
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!dados.senha || !regexSenha.test(dados.senha)) {
            throw ('A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo.');
        }
    }
};

module.exports = Cliente_services;
