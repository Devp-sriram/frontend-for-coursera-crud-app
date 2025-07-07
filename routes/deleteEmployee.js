import express from 'express';
import { ObjectId } from 'mongodb';
import User from '../models/user.js';


const router = express.Router();


export default router.delete('/:userId/:employeeId',async (req,res)=>{ 
  
    try {
        const userId = ObjectId.createFromHexString(req.params.userId);
        const employeeId = ObjectId.createFromHexString(req.params.employeeId);

        const result = await User.updateOne(
          { _id: userId },
          { $pull: { data: { _id: employeeId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Employee not found or already deleted" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Error deleting employee", error: error.message });
  };
});
