'use client'

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import { useAuth , Data } from '../context/AuthContext'
import AddEmployee from './AddEmployee';


export default function DashboardPage() {


  const { isAuthenticated , user } = useAuth();
  
  const [ employeDetails , setEmployeDetails] = useState({
    firstname : "",
    lastname : "",
    dep : "",
    _id : ""

  });
  useEffect(()=>{
    console.log(employeDetails)
  },[employeDetails])


  const [edit,setEdit] = useState({
      status: false,
      id : ""
  });
  
  if (!user || !user.data) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    redirect('/login');
  }  
  const employees = user?.data;



  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <AddEmployee/>
      <h1 className='justify-center'>Employees</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Actions</th>
              </tr>
          </thead>
          <tbody>
            {employees.map((emp : Data) => (
              <tr key={emp._id} className="border-b">
                <td className="p-3">
                  {edit.status? (
                    <>
                    <input
                      type="text"
                      value={emp.firstname}
                      onChange={(e) =>setEmployeDetails(prev => ({...prev, firstname: e.target.value , _id :emp._id}))}
                      className="w-full p-2 border rounded text-black"
                    />
                    <input
                      type="text"
                      value={emp.lastname}
                      onChange={(e) =>setEmployeDetails(prev => ({...prev, lastname: e.target.value, _id :emp._id }))}
                      className="w-full p-2 border rounded text-black"
                    />
                    </>
                  ) : (
                    <span className="font-medium">{emp.firstname} {emp.lastname}</span>
                  )}
                </td>
                <td className="p-3">
                    {edit.status ?(
                      <select
                        value={emp.dep || ''}
                        onChange={(e) => setEmployeDetails(prev => ({...prev, dep: e.target.value, _id :emp._id }))}
                        className="text-black rounded"
                      >
                        <option value="">Select Department</option>
                        <option value="dentist">Dentist</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="gynecologist">Gynecologist</option>
                      </select>
                      ):(
                      <span>{emp.dep}</span>
                    )}
                </td>
              <td className="p-3 flex justify-end items-center space-x-2">
                
                  <button
                    onClick={() => setEdit(prevState=>({ ...prevState,status: !edit.status}))}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                  >
                    {edit.status ? 'save' : 'edit'}
                  </button>
              </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>

      </div>
  );
}
