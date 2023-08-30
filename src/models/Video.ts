const {viddb} = require('../../postgresconfig')
const { DataTypesV } = require('sequelize');

    const Video = viddb.define('Video',{
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        videoId: {
                type:DataTypes.STRING(255),
                unique: true,
                allowNull: false
            },
        title: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type:DataTypes.STRING(255),
            allowNull: true
        },
        publishedAt: {
            type:  DataTypesV.DATE,
            allowNull: false
        },
        channelId: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        channelTitle: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        thumbnailUrl: {
            type:DataTypes.STRING(255),
            allowNull: false
        }
    })
    
    module.exports = {Video}