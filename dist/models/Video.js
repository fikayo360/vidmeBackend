"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelizee } = require('../../postgresconfig');
const Video = sequelizee.define('Video', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    videoId: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    publishedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    channelId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    channelTitle: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    thumbnailUrl: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
module.exports = Video;
