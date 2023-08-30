const {likedb} = require('../../postgresconfig')

  const Like = likedb.define('Like', {
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