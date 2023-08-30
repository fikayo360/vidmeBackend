const { Sequelize, DataTypes } = require('sequelize');
const DataTypes = require("sequelize/lib/data-types");

    const User = sequelize.define('User', {
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
          defaultValue: sequelize.NOW,
        },
        updated_at: {
          type: DataTypes.TIMESTAMPWITHTIMEZONE,
          defaultValue: sequelize.NOW,
        },
      });

      console.log(User === sequelize.models.User);