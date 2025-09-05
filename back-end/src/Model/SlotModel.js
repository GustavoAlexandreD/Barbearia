const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Barbeiro_model = require('./Barbeiro_model.js');

const SlotModel = Conexao.define(
    "SlotModel",
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
        data: { 
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hora_inicio: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        hora_fim: { 
            type: DataTypes.TIME,
            allowNull: false
        },
        status: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Slots_Agendamento'
    }
)

// 🔗 Relacionamento
Barbeiro_model.hasMany(SlotModel, { foreignKey: 'id_barbeiro' })
SlotModel.belongsTo(Barbeiro_model, { foreignKey: 'id_barbeiro', as: 'barbeiro' })

module.exports = SlotModel;
