 const { DataTypes } = require ('sequelize');
 const sequelize =require ('../config/dbConfig');
 const Recipe = sequelize.define('Recipe',{
    name:  {
        type: DataTypes.STRING,
        allowNull:false,
    },
    ingredients : {
        type : DataTypes.TEXT,
        allowNull:false,
    },
    instructions : {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    calories : {
        type : DataTypes.FLOAT,
        allowNull:false,
    },
    prepTime : {
        type : DataTypes.INET,
        allowNull:false,
    },
    mealType : {
        type : DataTypes.STRING,
        allowNull:false,
    },
 });


 module.exports = Recipe;