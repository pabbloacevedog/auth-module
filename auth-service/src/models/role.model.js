// // models/Role.js

// import { Model, Sequelize } from 'sequelize';

// module.exports = (sequelize) => {
//     class Role extends Model {
//         static associate() {
//             this.belongsToMany(sequelize.models.Action, { foreignKey: 'role_id' });
//         }
//     }
//     Role.init({
//         role_id: {
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
// 		tableName: 'role',
//         modelName: 'Role',
// 		timestamps: false,

//     });

//     return Role;
// };
// models/Role.js

import { Model, DataTypes } from 'sequelize';

class Role extends Model {
    static associate(models) {
        this.belongsToMany(models.Accion, { through: models.RoleAccion, foreignKey: 'role_id' });
    }
}

const initializeRole = (sequelize) => {
    Role.init({
        role_id: {
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
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'role',
        modelName: 'Role',
        timestamps: false,
    });

    return Role;
};

export default initializeRole;
