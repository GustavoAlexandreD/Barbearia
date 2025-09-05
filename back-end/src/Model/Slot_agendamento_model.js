const { DataTypes } = require('sequelize');
const Conexao = require('../Config/Conexao.js');

const Barbeiro_model = require('./Barbeiro_model.js');

const Slot_agendamento_model = Conexao.define(
    "Slot_agendamento_model",
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
            allowNull: false,
            defaultValue: 'disponivel',
            validate: {
                isIn: [['disponivel', 'agendado', 'cancelado', 'finalizado']]
            }
        }
    },
    {
        tableName: 'Slots_Agendamento',
        timestamps: true
    }
);

// 🔗 Relacionamento
Barbeiro_model.hasMany(Slot_agendamento_model, { foreignKey: 'id_barbeiro' });
Slot_agendamento_model.belongsTo(Barbeiro_model, { foreignKey: 'id_barbeiro', as: 'barbeiro' });

module.exports = Slot_agendamento_model;

