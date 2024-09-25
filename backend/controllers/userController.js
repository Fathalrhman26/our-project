//const { verify } = require('jsonwebtoken');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const User = require('../models/User');

 exports.getProfile =  async (req,ers)=>{
 /* const token = headers['authorization']?.split('')[1];
  if(!token) return
  res.status(403).send('Access denied');
  jwt.verify(token,process.env.jwt_SECRET, async (err,user)=>{
    if(err)return
    res.status(403).send('Invalid token');*/
    /*try{
      const user = await User.findById(req.urser.id);
         if(!user)return
         res.status(404).send('User not found');
                res.json({id:user.id,username:user.username,dietarypreference:user.dietarypreference,
                  preferredCuisine:user.preferredCuisine,allergies:user.allergies,healthGoals:user.healthGoals
                });
    }catch(error){
      res.status(500).json({error:error.message});
    }*/
   try{
    const user  = await User.findById(req.user.id).select('-password');
    res.json(user)

   }
   catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
   }
  
};

 exports.updateProfile = async (req ,res) => {
   
         /* try{
   const { username ,dietaryPreferences,preferredCuisine,dislikeIngdients,allergies,healthGoals }=req.body;
          const user = await User.update({username,dietaryPreferences,preferredCuisine,dislikeIngdients,allergies,healthGoals},
            {where :{id:user.id}}
          );
          res.send(' Profile updated sucessfuly.');
          } catch (error){
            res.status(500).json({error:error.message});
          }*/
         
   const { dietaryPreferences,preferredCuisine,dislikeIngdients,allergies,healthGoals }=req.body;

   const pofileFields={};
   if(dietaryPreferences)
    pofileFields.dietaryPreferences = dietaryPreferences;
  if(preferredCuisine)
    profileFields.preferredCuisine = preferredCuisine;
  if(dislikeIngdients)
    profileFields.dislikeIngdients = dislikeIngdients;
  if(allergies)
    profileFields.allergies = allergies;
  if(healthGoals)
    profileFields.healthGoals = healthGoals;
  try{
    const user = await User.findById(req.user.id);
      if(user){
        user = await User.findByIdAndUpdate(req.user.id,
          {$set:profileFields},
          {new:true},
        )
          return ;
        
        }
        res.json(user);
      }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
  }
     
 };
    











