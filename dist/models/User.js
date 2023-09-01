"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelizee } = require('../../postgresconfig');
const User = sequelizee.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        notNull: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        notNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        notNull: true,
    },
    profile_pic: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    resettoken: {
        type: sequelize_1.DataTypes.STRING(255),
    }
});
module.exports = User;
