 const  MealPlan = require('../models/MealPlan');
 const recipe  = require('../models/Recipe');
 exports.createMealPlan = async (req , res ) => {
    const {userId ,meals} = req.body;

    try{
        //const mealPlan = await MealPlan.create(req.body);
        const mealPlan = new MealPlan({
            user:userId,
            meals,
        });  
        await mealPlan.save();
       // res.json(mealPlan);
       res.status(201).json(mealPlan);

    }catch (error){
   res.status(500).json({error : error.message});
    }
    
 };
 

 exports.getMealPlans = async ( req, res ) => {

    try {
        const mealPlan  = await MealPlan.findOne({user:req.user.id}).populate(
            'meals.breakfast meals.lunch meals.dinner');
            if(!mealPlan) 
                return
                res.status(404).json({message:'Meal plan not found'});
            
           // res.json(mealPlan);
        res.status(200).json(mealPlan);
    } catch (error){
        res.status(500).json({error:error.message});
    }
 
 } ;
exports.updateMealPlan = async (req,res)=>{
    const {meals}=req.body;
    try{
        const mealPlan = await MealPlan.findOne({user:req.user.id});
        if(!mealPlan)
            return
        res.status(404).json({msg:'Meal plan not found'});
        mealPlan.meals =  meals;
        await mealPlan.save();
         // res.json(mealPlan);
        res.status(200).json(mealPlan);
    }catch(err){
        res.status(500).json({error:error.message});
    }
};