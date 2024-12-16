import { useAuth , Data } from '../context/AuthContext';
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios';


export default function AddEmployee(){
  const { update } = useAuth();

  const { user } = useAuth();
  const [ employeDetails , setEmployeDetails] = useState({
    firstname : "",
    lastname : "",
    dep : ""
  });

  const clearEmployeDetails = () => {
    setEmployeDetails(prevState =>({
        ...prevState,
        firstname : '',
        lastname  : '',
        dep : ''
      })
    )
  }

  const validateEmployeDetails = () => {
    return employeDetails.firstname && employeDetails.lastname && employeDetails.dep != "" ? true : false
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    try{
      const response : AxiosResponse = await axios.post(`http://localhost:4000/addEmployee/${user._id}`,{...employeDetails});
      console.log(response);
      clearEmployeDetails()
      update(response.data.allEmployees);
    }catch(error: any){
      console.log(error);
    }
  }

    return (
      <div className='w-full flex flex-col justify-center items-center'>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 justify-center items-center border-gray-500 border-solid border-2" >
          <h1 className='justify-center'>Add new Employees</h1>
          <form onSubmit={handleSubmit} className='flex flex-col' >
            <label>firstname</label>
            <input 
              type='text'
              value={employeDetails.firstname}
              onChange={e=>setEmployeDetails((prevState)=>({
                ...prevState ,firstname : e.target.value,
                })
              )
              }   
              className="text-black rounded"
            />

            <label>lastname</label>
            <input 
              type='text' 
              value={employeDetails.lastname}
              onChange={e=>setEmployeDetails((prevState)=>({
                ...prevState ,lastname : e.target.value,
                })
                )
              }
              className="text-black rounded"
            />

            <label>Department</label>
              <select
                value={employeDetails.dep || ''}
                onChange={(e) => setEmployeDetails(prev => ({...prev, dep: e.target.value}))}
                className="text-black rounded"
              >
                <option value="">Select Department</option>
                <option value="dentist">Dentist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="gynecologist">Gynecologist</option>
              </select>
            <button 
              type='submit' 
              disabled ={!validateEmployeDetails} 
              className="rounder w-full px-4 my-2 rounded-2xl border-gray-500 border-solid border-2 bg-red-500"
            >
              Add new Employee
            </button>
          </form>
        </div> 
      </div>
  )
}


