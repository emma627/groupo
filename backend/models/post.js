const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require("../models/user");
const Comment = require("../models/comment");
const Post = sequelize.define('post',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement :true,
        allowNull:false,
        primaryKey:true
    },
    titre: {
        type: Sequelize.STRING,
        allowNull:false
    },
    texte: Sequelize.STRING,
     img: {
        type: Sequelize.STRING,
        allowNull:false
    
    },
    
    
});

module.exports = Post;