var Sequelize = require("sequelize")
var sequelize = new Sequelize('a0614152456', 'a0614152456', '2c96d072', {
  host: '10.losacos.website',
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions:{
    //字符集
    charset:'utf8mb4',
    collate:'utf8mb4_bin',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'  //东八时区
})

module.exports = {
  sequelize
}