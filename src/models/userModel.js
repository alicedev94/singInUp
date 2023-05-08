const { sequelize } = require("../database");
const bcrypt = require("bcrypt-nodejs");

const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "master_users";
const modelName = "modelMasterUsers";

const usersSchema = {
  email: {
    field: "email",
    allowNull: false,
    type: DataTypes.STRING(20),
  },
  password: {
    field: "password",
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  rolUser: {
    field: "rol_usuario",
    allowNull: true,
    type: DataTypes.STRING(10),
  },
};

class UsersSchema extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tableName,
      modelName: modelName,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    };
  }
}

module.exports = {
  tableName,
  usersSchema,
  UsersSchema,
};
