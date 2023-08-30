const {sequelizeeC} = require('../../postgresconfig')

    const Comments = sequelizeeC.define('Comment', {
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
      },
      comment: {
          type: DataTypes.STRING(255),
          allowNull: false
      }
  });

  module.exports = {Comments}