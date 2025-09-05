const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Cliente_model = Conexao.define(
    "Cliente_model", 
    {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        nome_cliente: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true 
        },
        senha: { 
            type: DataTypes.STRING,
            allowNull: false 
        }
    },
    {
        tableName: 'Clientes'
    }
)  
module.exports = Cliente_model;   