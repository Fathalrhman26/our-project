const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');




exports.register =  async (req, res) => {
  const { username, email, password } = req.body;
  try{
    const hashedPassword =await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({id:user.id,username:user.username,email:user.email});
  }catch (error){
    res.json({error:error.message});
  }

};

exports.login = async (req, res) => {
 const {email,password} = req.body;
 try{
  const user =await User.findAll({
    where:{email,password}
  });
  if(!user || !( await bcrypt.compare(password,user.password)))
    return 
    res.status(401).json({message:'Invalid credentails'});
 
 const token = jwt.sign({id:user.id},
 process.env.JWT_SECRET,{expiresIn:'h1'});
 res.json({token});
 }catch(error){
  res.json({error:error.message});
 }
};
