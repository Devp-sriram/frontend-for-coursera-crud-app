'use client'

import { redirect } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {useState} from 'react'

export default function DashboardPage() {
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

  return (
    <>
      <h1 className='justify-center'>Employees</h1>
      <div>
        <form>
          <label>firstname</label>
          <input type='text' />
          
          <label>lastname</label>
          <input type='text' />
          
          <label>department</label>
          <input type='text' />
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
