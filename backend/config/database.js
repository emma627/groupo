const Sequelize = require('sequelize');
// groupo 2 : la base
// login :root
// psw :root
const sequelize = new Sequelize('groupo2','root','root',{ 
    dialect:'mysql',
    host:'localhost',
    port:8889
});

module.exports = sequelize;
