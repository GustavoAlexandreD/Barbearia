const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Barbeiro_model = Conexao.define(
    "Barbeiro_model",
    {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_barbeiro: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Barbeiros'
    }
)

module.exports = Barbeiro_model;
