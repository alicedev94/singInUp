const { Sequelize } = require("sequelize");
const setupModels = require("./models/index");

const sequelize = new Sequelize(
  "ALICE_QA",
  "client_developer",
  "alicepassword",
  {
    dialect: "mssql",
    dialectOptions: {
      options: {
        host: 'localhost',
        trustServerCertificate: true,
      },
    },
  }
);

setupModels(sequelize);
sequelize.sync();

module.exports = { sequelize };
