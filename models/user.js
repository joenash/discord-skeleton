'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
      },
    tag: DataTypes.TEXT,
    role: DataTypes.TEXT,
    joinDate: DataTypes.TEXT,
    lastActiveDate: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};