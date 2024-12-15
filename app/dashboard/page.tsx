'use client'

import { redirect } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react'
import axios from 'axios';


export default function DashboardPage() {

  const {login} = useAuth()

  const { isAuthenticated, user } = useAuth();
  const [ employeDetails , setEmployeDetails] = useState({
    firstname : "",
    lastname : "",
    dep : ""
  });

  if (!isAuthenticated) {
    redirect('/login');
  }

  if (!user || !user.data) {
    return <div>Loading...</div>;
  }

  const employees = user.data;

  const validateEmployeDetails = () => {
    return employeDetails.firstname && employeDetails.lastname && employeDetails.dep ? true : false
  }
  const clearEmployeDetails = () => {
    setEmployeDetails(prevState =>({
        ...prevState,
        firstname : '',
        lastname  : '',
        dep : ''
      })
    )
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    try{
      const response : any = await axios.post(`http://localhost:4000/addEmployee/${user._id}`,{...employeDetails});
      console.log(response);
      clearEmployeDetails()
      login(response.data.allEmployees);
    }catch(error: any){
      console.log(error);
    }
  }

  return (
    <>
      <h1 className='justify-center'>Employees</h1>
      <div >
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
      
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>{emp.firstname} {emp.lastname}--{emp.dep}</li>
        ))}
      </ul>
    </>
  );
}
