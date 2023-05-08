const { usersSchema, UsersSchema } = require("../models/userModel");

function setupModels(sequelize) {
  UsersSchema.init(usersSchema, UsersSchema.config(sequelize));
}

module.exports = setupModels;
