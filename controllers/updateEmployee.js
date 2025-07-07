import User from'../models/user.js'


export default async function updateEmployee(userId, employeeId ,newDetails){
     try{
          const result = await User.updateOne(
            {_id:userId, 'data._id':employeeId},
            {$set : newDetails}
          )   

          if(result.modifiedCount === 0) {
            return { message: "Employee not found or no changes made" };
          }

     }catch (error) {
          console.log({ message: "Error updating employee", error: error.message });
     }
}
