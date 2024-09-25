const Tutorials = require('../models/Tutorials');


exports.SearchTutorials = async(req,res)=>{
    try{
        const {keyword,mealTtorial,generateTuiorial} = req.query;
        const query ={};
        if(keyword){
            query.name={$regex:keyword,
                $options:'i'
            };

        }
        if(mealTtorial){
            query.mealTtorial=mealTtorial;
        }
        if(generateTuiorial){
            query.generateTuiorial=generateTuiorial;
        }
        const recipes = await recipes.find(query);
        //res.json(recipes);
        res.status(200).json(Tutorials);
        
    }catch(err){
        res.status(500).json({error:error.message});
    }
};
