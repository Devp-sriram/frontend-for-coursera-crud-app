import express from 'express';
import User from '../models/user.js';
import CheckUser from '../controllers/checkuser.js'
const router = express.Router();


export default router.post('/',async (req,res)=>{
 
  const { email , password , company }  = req.body;

  if(!(email,password)){
    return res.status(401).send('please put the email , password');
  }

  if(CheckUser(email)){
      return res.status(401).send('user aldreay exist');
  }
   try{
   const newUser = new User({ email , password , company });
   await newUser.save();
       if(newUser){
             return res.status(200).send(`user created `);
       }else{
             return res.status(401).send(`user not creted`);
       }
   }catch(err){
         console.log(err)
    }
    
  
})
