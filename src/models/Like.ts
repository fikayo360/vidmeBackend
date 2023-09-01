const {sequelizee} = require('../../postgresconfig')
import { DataTypes } from "sequelize";
const Video = require('./Video')
  const Like = sequelizee.define('Like', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    videoId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Video,
            key: 'videoId'
        }
    },
    userId: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})


module.exports = {Like}