"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { sequelizee } = require('../../postgresconfig');
const sequelize_1 = require("sequelize");
const Video = require('./Video');
const Comment = sequelizee.define('Comment', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    videoId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Video,
            key: 'videoId'
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    userPic: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
module.exports = Comment;
