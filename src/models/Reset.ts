import { DataTypes } from "sequelize";
const {sequelizee} = require('../../postgresconfig')

    const Reset = sequelizee.define('Reset', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING(255),
          unique: true,
          notNull: true,
        }
      });

      module.exports = {Reset}