// import { Model, Sequelize } from 'sequelize';

// module.exports = (sequelize) => {
//     class RoleAccion extends Model {
//     }
//     RoleAccion.init({
//         role_id: {
//             type: Sequelize.INTEGER,
//             references: {
//                 model: 'role',
//                 key: 'id',
//             },
//         },
//         action_id: {
//             type: Sequelize.INTEGER,
//             references: {
//                 model: 'action',
//                 key: 'id',
//             },
//         },
//     }, {
//         sequelize,
//         tableName: 'RoleAccion',
//         modelName: 'RoleAccion',
//         timestamps: false,

//     });

//     return RoleAccion;
// };
// models/RoleAccion.js

import { Model, DataTypes } from 'sequelize';

class RoleAccion extends Model {
    static associate(models) {
        // Define associations here if needed
    }
}

const initializeRoleAccion = (sequelize) => {
    RoleAccion.init({
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        accion_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'acciones',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: 'role_accion',
        modelName: 'RoleAccion',
        timestamps: false,
    });

    return RoleAccion;
};

export default initializeRoleAccion;

