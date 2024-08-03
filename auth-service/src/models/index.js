// 'use strict';

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { Sequelize, DataTypes } from 'sequelize';
// // Definir __filename y __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const basename = path.basename(__filename);
// import connection from '../middleware/database.js'

// const models = {}
// fs
//     .readdirSync(__dirname)
//     .filter((file) => {
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(async (file) => {
//         const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes);
//         models[model.name] = model;
//     });

// Object.keys(models).forEach(modelName => {
//     if (models[modelName].associate) {
//         models[modelName].associate(models);
//     }
// });
// // fs
// //     .readdirSync(__dirname)
// //     .filter((file) => {
// //         const returnFile = (file.indexOf('.') !== 0)
// //             && (file !== basename)
// //             && (file.slice(-3) === '.js');
// //         return returnFile;
// //     })
// //     .forEach((file) => {
// //         const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes);
// //         models[model.name] = model;
// //     });

// // Object.keys(models).forEach(modelName => {
// //     console.log(modelName)
// //     if (models[modelName].associate) {
// //         models[modelName].associate(models);
// //     }
// // });

// models.sequelize = connection;
// models.Sequelize = Sequelize;

// export default models;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../middleware/database.js';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const models = {};

// Importar e inicializar modelos dinámicamente
const initializeModel = async (file) => {
    const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes);
    models[model.name] = model;
};

const initModels = async () => {
    const files = fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });

    for (const file of files) {
        await initializeModel(file);
    }

    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
};

await initModels();

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
