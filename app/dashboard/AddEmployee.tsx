import { useAuth } from '../context/AuthContext';
import React , { useEffect , useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv'
dotenv.config()


export default function AddEmployee(){
  const { create } = useAuth();

  const { user } = useAuth();
  const [ employeDetails , setEmployeDetails] = useState({
    firstname : "",
    lastname : "",
    role : ""
  });

  const clearEmployeDetails = () => {
    setEmployeDetails(( prevState ) =>({
        ...prevState,
        firstname : '',
        lastname  : '',
        role : '',
      })
    )
  }

  const validateEmployeDetails = () => {
    return employeDetails.firstname && employeDetails.lastname && employeDetails.role != "" ? true : false
  }
  const handleChange = (e) => {
    setEmployeDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      console.log(`user`,user._id);
      const response : AxiosResponse = await axios.post(`/api/dashboard?id=${user._id}`,employeDetails);
      console.log(response);
      if(response?.status === 200){
        create(employeDetails);
        clearEmployeDetails()
      }
    }catch(error: unknown){
      console.log(error);
    }
  }

  useEffect(()=>{
    console.log( 'id', user._id)
  },[user])

    return (
      <div className='w-full flex flex-col justify-center items-center p-6'>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 justify-center items-center border-gray-500 border-solid border-2" >
          <h1 className='justify-center py-2'>Add new Employees</h1>
          <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col w-full gap-2 text-white'>
            <label>Firstname</label>
            <input 
              name='firstname'
              type='text'
              value={employeDetails.firstname}
              onChange={handleChange}   
              className=" rounded"
            />

            <label>Lastname</label>
            <input 
              name='lastname'
              type='text' 
              value={employeDetails.lastname}
              onChange={handleChange}
              className="rounded"
            />

            <label>Role</label>
              <select
                name ='role'
                value={employeDetails.role || ''}
                onChange={handleChange}
                className=" rounded"
              >
                <option value="">Select Department</option>
                <option value="dentist">Dentist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="gynecologist">Gynecologist</option>
              </select>
            <button 
              type='submit' 
              disabled ={!validateEmployeDetails} 
              className="rounder w-full px-4 my-4 rounded-2xl border-gray-500 border-solid border-2 bg-red-500"
            >
              Add new Employee
            </button>
          </form>
        </div> 
      </div>
  )
}


