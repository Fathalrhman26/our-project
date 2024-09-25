const Recipe = require('../models/Recipe');

/*xports.createRecipe = async (req, res ) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
    } catch (error){
        res.status(500).json({error:error.message});
    }
};*/
    exports.getRcipes = async (req , res ) => {
        try {
            const recipes = await Recipe.findAll();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    };
    exports.SearchRecipes = async(req,res)=>{
        try{
            const {keyword,dietaryPreference,mealType,prepTime} = req.query;
            const query ={};
            if(keyword){
                query.name={$regex:keyword,
                    $options:'i'
                };

            }
            if(dietaryPreference){
                query.dietaryPreference=dietaryPreference;
            }
            if(mealType){
                query.mealType=mealType;
            }
            if(prepTime){
                query.prepTime= {$slt:prepTime};
            }
            const recipes = await recipes.find(query);
            //res.json(recipes);
            res.status(200).json(recipes);
            
        }catch(err){
            res.status(500).json({error:error.message});
        }
    };
