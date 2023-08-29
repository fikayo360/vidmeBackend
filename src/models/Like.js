module.exports = (sequelize,DataTypes) => {
  const Like = sequelize.define('Like', {
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
    created_at: {
        type: DataTypes.TIMESTAMPWITHTIMEZONE,
        defaultValue: sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.TIMESTAMPWITHTIMEZONE,
        defaultValue: sequelize.NOW,
    }
})

return Like

}