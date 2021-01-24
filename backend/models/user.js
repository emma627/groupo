const Sequelize = require('sequelize');
// on reprend la config de connection à la data base
const sequelize = require('../config/database');
// first argument:model name
// seceond argument:define the structure of model
const User = sequelize.define('user',{
    id:{
        type : Sequelize.INTEGER, // INT
        autoIncrement :true,
        allowNull:false,
        primaryKey:true//for retrieving the data and define relations
    },
    email: {
        type: Sequelize.STRING, // VARCHAR
        allowNull:false, // obliger d entrer un mail
        unique: true // on ne peut avoir 2 fois le même email
    },
    nom: {
        type: Sequelize.STRING,// VARCHAR
        allowNull:false
    
    },
    img: Sequelize.STRING,// VARCHAR
    prenom: {
        type: Sequelize.STRING,// VARCHAR
        allowNull:false
    
    },
    admin: {
        // dans l 'objet admin : true ou false
        type: Sequelize.BOOLEAN, // dans la base TINY INT 1 ou 0
        // par default user n'est pas admin
        defaultValue : false, 
        allowNull:false
    
    },
    password: {
        type: Sequelize.STRING,// VARCHAR
        allowNull:false
    
    },
    password:  Sequelize.STRING
    
    
});
module.exports = User;