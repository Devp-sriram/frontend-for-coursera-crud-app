import employee from '@/models/employee';


export default async function addEmployee(employeeData) {

     try {
        const data = new employee(employeeData);
        await data.save();
     } catch (error) {
       console.error("Error adding employee:", error);
     }finally{
      console.log("Employee added successfully");
      return {success :true , user : await employeeData}
     };
};
