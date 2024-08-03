// // User
// import { Model, Sequelize } from 'sequelize';
// const { hashPassword } = require('../utils');
// module.exports = (sequelize) => {
//     class User extends Model {
//         static associate() {
// 			this.belongsTo(sequelize.models.Role, { foreignKey: 'role_id' });
//         }
//     }

//     User.init({
//         user_id: {
//             type: Sequelize.UUID,
//             defaultValue: Sequelize.UUIDV4,
//             allowNull: false,
//             primaryKey: true
//         },
//         rut_user: {
//             type: Sequelize.STRING(20)
//         },
//         name: {
//             type: Sequelize.STRING(1000)
//         },
//         user: {
//             type: Sequelize.STRING(255),
//             unique: true,
//             validate: {
//                 is: /^[a-zA-Z0-9_]+$/, // Solo letras, números y guiones bajos
//             }
//         },
//         password: {
//             type: Sequelize.STRING(255) // Considerar encriptación y longitud adecuada
//         },
//         email: {
//             type: Sequelize.STRING(255),
//             unique: true,
//             validate: {
//                 isEmail: true,
//             }
//         },
//         personal_phone: {
//             type: Sequelize.STRING(20)
//         },
//         verification_code: {
//             type: Sequelize.STRING(20)
//         },
//         verified: {
//             type: Sequelize.BOOLEAN
//         },
//         avatar: {
//             type: Sequelize.STRING(255)
//         },
//         state: {
//             type: Sequelize.STRING(20)
//         },
// 		role_id: {
//             type: Sequelize.INTEGER
//         },
//     }, {
//         timestamps: true,
//         tableName: 'user',
// 		modelName: 'User',
// 		hooks: {
//             // Hook para hashear la contraseña antes de guardar
//             beforeCreate: async (user) => {
//                 if (user.password) {
//                     user.password = await hashPassword(user.password);
//                 }
//             },
//             beforeUpdate: async (user) => {
//                 if (user.password) {
//                     user.password = await hashPassword(user.password);
//                 }
//             },
//         },
//         sequelize,
//         indexes: [
//             {
//                 unique: true,
//                 fields: ['email']
//             },
//             // Otros índices según sea necesario
//         ]
//     });

//     return User;
// };


// models/User.js

import { Model, DataTypes } from 'sequelize';
import { hashPassword } from '../utils/index.js';

class User extends Model {
    static associate(models) {
        this.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
}

const initializeUser = (sequelize) => {
    User.init({
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        rut_user: {
            type: DataTypes.STRING(20)
        },
        name: {
            type: DataTypes.STRING(1000)
        },
        user: {
            type: DataTypes.STRING(255),
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9_]+$/, // Solo letras, números y guiones bajos
            }
        },
        password: {
            type: DataTypes.STRING(255) // Considerar encriptación y longitud adecuada
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        personal_phone: {
            type: DataTypes.STRING(20)
        },
        verification_code: {
            type: DataTypes.STRING(20)
        },
        verified: {
            type: DataTypes.BOOLEAN
        },
        avatar: {
            type: DataTypes.STRING(255)
        },
        state: {
            type: DataTypes.STRING(20)
        },
        role_id: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: true,
        tableName: 'user',
        modelName: 'User',
        hooks: {
            // Hook para hashear la contraseña antes de guardar
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
        sequelize,
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
            // Otros índices según sea necesario
        ]
    });

    return User;
};

export default initializeUser;
