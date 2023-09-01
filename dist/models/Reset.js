"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelizee } = require('../../postgresconfig');
const Reset = sequelizee.define('Reset', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        notNull: true,
    }
});
module.exports = { Reset };
