import User from '../models/user.js';


export default async function addEmployee(userId, newEmployee) {
 

     try {
        await User.findByIdAndUpdate(userId, {
            $push: { data : newEmployee }
      });
     } catch (error) {
       console.error("Error adding employee:", error);
     }finally{
      console.log("Employee added successfully");
      return await User.findById(userId);
     };
};
