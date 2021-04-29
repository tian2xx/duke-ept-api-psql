const { Sequelize } = require("sequelize");

// DB
// module.exports = new Sequelize(
//   "db_a71b63_user",
//   "a71b63_user",
//   "@X7xJPMG2KSuFRP",
//   {
//     host: "mysql5037.site4now.net",
//     dialect: "mysql",
//     logging: true,
//   }
// );

module.exports = new Sequelize("eptpsql", "ept", "ept!45@DB", {
  host: "vcm-20066.vm.duke.edu",
  dialect: "postgres",
  port: 5432,
});

// var conn = mysql.createConnection({
//   host: "eptmysql.mysql.database.azure.com",
//   user: "zt45@eptmysql",
//   password: {your_password},
//   database: {your_database},
//   port: 3306,
//   ssl:{ca:fs.readFileSync({ca-cert filename})}
// });
