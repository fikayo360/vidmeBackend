module.exports = (sequelize,DataTypes) => {
    const Video = sequelize.define('Video',{
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
            type: Sequelize.DATE,
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
    return Video

}