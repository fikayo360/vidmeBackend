const {sequelizee} = require('../../postgresconfig')

    const Userr = sequelizee.define('User', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          unique: true,
          notNull: true,
        },
        username: {
          type: DataTypes.STRING(100),
          unique: true,
          notNull: true,
        },
        password: {
          type: DataTypes.STRING(255),
          notNull: true,
        },
        profile_pic: {
          type: DataTypes.STRING(255),
        },
        resettoken: {
          type: DataTypes.STRING(255),
        },
        created_at: {
          type: DataTypes.TIMESTAMPWITHTIMEZONE,
          defaultValue: sequelizee.NOW,
        },
        updated_at: {
          type: DataTypes.TIMESTAMPWITHTIMEZONE,
          defaultValue: sequelizee.NOW,
        },
      });

      module.exports = {Userr}