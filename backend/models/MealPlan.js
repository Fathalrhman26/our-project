
const { DataTypes } = require('sequelize');
const sequelize =require('../config/dbConfig');
 
const MealPlan = sequelize.define('MealPlan',
    {
        user : {
            type : DataTypes.STRING,
            allowNull:false,
        },
        meals : {
           type:DataTypes.STRING,
         
        },
        day : {
            type : DataTypes.STRING,
            allowNull:false,
        },
    }
);

module.exports = MealPlan;