// models/User.js
/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const { Height } = require('@mui/icons-material');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
       
    },
    email: {
        type: DataTypes.STRING,
       
    },
    password: {
        type: DataTypes.STRING,
        
    },
    age:  {
        type:DataTypes.INTEGER,
    },
    currentWeight:  {
        type:DataTypes.STRING,
    },
    height:  {
        type:DataTypes.FLOAT,
    },
     dietaryPreferences:  {
        type:DataTypes.STRING,
    },
    preferredCuisine:{
        type:DataTypes.STRING,
    },
    dislikeIngdients:{
        type:DataTypes.STRING,
    },
   
    allergies: {
        type: DataTypes.STRING,
        
       
    },
       
    healthGoals: {
        type: DataTypes.STRING,
        
       
    },
});

module.exports = User;


