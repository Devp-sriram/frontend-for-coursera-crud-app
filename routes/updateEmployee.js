import express from 'express';
import { ObjectId } from 'mongodb';
import updateEmployee from '../controllers/updateEmployee.js'

const router = express.Router();


export default router.put('/:userId/:employeeId',async (req,res)=>{

  const details = {};

  if(req.body.firstname) details['data.$.firstname'] = req.body.firstname;
  if(req.body.lastname) details['data.$.lastname'] = req.body.lastname;
  if(req.body.dep) details['data.$.dep'] = req.body.dep;
  
  const userId = ObjectId.createFromHexString(req.params.userId);
  const employeeId =ObjectId.createFromHexString(req.params.employeeId);

  if(!req.body){
    return res.status(404).send('please edit the feild');
  }
  try{
    await updateEmployee(userId,employeeId,details)
    return res.status(201).json("Employee updated successfully");
  }catch(err){
      console.log(err)
      return res.status(401).send(`employee not added`);
  } 
})
