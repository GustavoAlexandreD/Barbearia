const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Cliente_model = require('./Cliente_model.js');
const Barbeiro_model = require('./Barbeiro_model.js');
const SlotModel = require('./SlotModel.js');

const Agendamento_model = Conexao.define(
    "Agendamento_model",
    {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cliente_model,
                key: 'id'
            }
        },
        id_barbeiro: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Barbeiro_model,
                key: 'id'
            }
        },
        id_slot: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SlotModel,
                key: 'id'
            }
        },
        observacao: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        tipo: { 
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'Agendamentos'
    }
)

// 🔗 Relacionamentos
Cliente_model.hasMany(Agendamento_model, { foreignKey: 'id_cliente' })
Agendamento_model.belongsTo(Cliente_model, { foreignKey: 'id_cliente', as: 'cliente' })

Barbeiro_model.hasMany(Agendamento_model, { foreignKey: 'id_barbeiro' })
Agendamento_model.belongsTo(Barbeiro_model, { foreignKey: 'id_barbeiro', as: 'barbeiro' })

SlotModel.hasMany(Agendamento_model, { foreignKey: 'id_slot' })
Agendamento_model.belongsTo(SlotModel, { foreignKey: 'id_slot', as: 'slot' })

module.exports = Agendamento_model;
