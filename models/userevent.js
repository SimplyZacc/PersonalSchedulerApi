'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Event.belongsToMany(models.User, { through: UserEvent });
      models.User.belongsToMany(models.Event, { through: UserEvent });
    }
  };
  UserEvent.init({
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserEvent',
  });
  return UserEvent;
};