// // models/Action.js

// import { Model, Sequelize } from 'sequelize';

// module.exports = (sequelize) => {
//     class Action extends Model {
//         static associate() {
// 			this.belongsToMany(sequelize.models.Role, { foreignKey: 'action_id' });
//         }
//     }
//     Action.init({
//         action_id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
// 		description: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//     }, {
//         sequelize,
// 		tableName: 'action',
//         modelName: 'Action',
// 		timestamps: false,

//     });

//     return Action;
// };
// models/Accion.js

import { Model, DataTypes } from 'sequelize';

class Accion extends Model {
    static associate(models) {
        this.belongsToMany(models.Role, { through: models.RoleAccion, foreignKey: 'accion_id' });
    }
}

const initializeAccion = (sequelize) => {
    Accion.init({
        accion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'accion',
        modelName: 'Accion',
        timestamps: false,
    });

    return Accion;
};

export default initializeAccion;
