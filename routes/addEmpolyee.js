import express from 'express';
import addEmployee from '../controllers/addEmployee.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

export default router.post('/:id',async (req,res)=>{
 
  const { firstname , lastname , dep }  = req.body;
  const userId = req.params.id;
  
  const id = ObjectId.createFromHexString(userId); // to covert a normal sting into ObjectId which mongoDB understand as id ; 

  if(!id){ res.status(401).send('please login')};

  if(!(firstname , lastname)){
    return res.status(404).send('please put the username , password');
  }
 
  try{
  const user = await addEmployee(id,{firstname , lastname , dep })
  if(user){res.status(201).json({    
            message: `Employee ${firstname} ${lastname} added successfully`,
            employee: { firstname, lastname, dep },
            allEmployees : user.data,
        })}
  }catch(err){
      console.log(err)
      return res.status(404).send(`employee not added`);
  } 
})
