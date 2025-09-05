const { DataTypes } = require('sequelize')
const Conexao = require('../Config/Conexao.js');

const Barbeiro_model = require('./Barbeiro_model.js');

const Excecao_Model = Conexao.define(
    "Excecao_Model",
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
                model: Barbeiro_Model,
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
        tipo_excecao: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Excecoes'
    }
)

// 🔗 Relacionamento
Barbeiro_Model.hasMany(Excecao_model, { foreignKey: 'id_barbeiro' })
Excecao_Model.belongsTo(Barbeiro_model, { foreignKey: 'id_barbeiro', as: 'barbeiro' })

module.exports = Excecao_Model;
