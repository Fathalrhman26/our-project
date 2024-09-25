const { DataTypes } = require('sequelize');
const sequelize =require('../config/dbConfig');
 
const GroceryLists = sequelize.define('roceryLists',
    {
      
        items : {
            type : DataTypes.STRING,
            allowNull:false,
        },
        quantity : {
            type : DataTypes.INET,
            allowNull:false,
        },
    }
);

module.exports = GroceryLists;