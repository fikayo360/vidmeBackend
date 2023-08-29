module.exports = (sequelize,DataTypes) => {
    const Comment = sequelize.define('Comment', {
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
      },
      created_at: {
          type: DataTypes.TIMESTAMPWITHTIMEZONE,
          defaultValue: sequelize.NOW,
      },
      updated_at: {
          type: DataTypes.TIMESTAMPWITHTIMEZONE,
          defaultValue: sequelize.NOW,
      }
  });

  return Comment
}