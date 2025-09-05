const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Barbeiro_model = require('./Barbeiro_model.js');

const Disponibilidade_model = Conexao.define(
    "Disponibilidade_model",
    {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_barbeiro: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Barbeiro_model,
                key: 'id'
            }
        },
        dia_semana: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        hora_inicio: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        hora_fim: { 
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        tableName: 'Disponibilidade'
    }
)

// 🔗 Relacionamento
Barbeiro_model.hasMany(Disponibilidade_model, { foreignKey: 'id_barbeiro' })
Disponibilidade_model.belongsTo(Barbeiro_model, { foreignKey: 'id_barbeiro', as: 'barbeiro' })

module.exports = Disponibilidade_model;
