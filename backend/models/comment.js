const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement :true,
        allowNull:false,
        primaryKey:true
    },
    texte: {
        type: Sequelize.STRING,
        allowNull:false
    
    },
    
    
});
module.exports = Comment;