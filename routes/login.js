import express from 'express';
import checkUser from '../controllers/checkuser.js'

const router = express.Router();

export default router.post('/',async (req,res)=>{
 
  const { email , password }  = req.body;

  if(!(email , password)){
    return res.status(401).send('please put the correct email , password');
  }

  const user = await checkUser(email);
    if(!user){return res.status(404).send('this email not already registerted, go to signin')}
  let pw = user.password;
   // console.log(pw);
   // console.log(password);
   console.log(user);
      if(password === pw){
           return res.status(200).send(user); // sending user data to client
      }else{
           return res.status(401).send(`wrong password`);
      }
  
})
