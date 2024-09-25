const Recipe = require('../models/GroceryLists');


    exports.getGroceryLists = async (req , res ) => {
        try {
            const recipes = await Recipe.findAll();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    };
  
    exports.addGroceryLists = async (req, res ) => {
        try {
            const groceryLists = await GroceryLists.add(req.body);
            res.status(201).json(groceryLists);
        } catch (error){
            res.status(500).json({error:error.message});
        }
    };
    exports.deleteGroceryLists = async (req, res ) => {
        try {
            const groceryLists = await GroceryLists.delete(req.body);
            res.status(201).json(groceryLists);
        } catch (error){
            res.status(500).json({error:error.message});
        }
    };