const { DataTypes } = require('sequelize');
const sequelize =require('../config/dbConfig');
 
const Tutorials = sequelize.define('MealPlan',
    {
        mealTutorail : {
            type : DataTypes.STRING,
            allowNull:false,
        },
        generateTuiorial: {
            type : DataTypes.STRING,
            allowNull:false,
        },
    }
);

module.exports =Tutorials;