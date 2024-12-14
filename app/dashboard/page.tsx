'use client'

import { redirect } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated, user);

  if (!isAuthenticated) {
    redirect('/login');
  }

  if (!user || !user.data) {
    return <div>Loading...</div>;
  }

  const employees = user.data;

  return (
    <>
      <h1>Company: {user.company}</h1>
      <ul>
        {employees.map((emp, index) => (
          <li key={index}>{emp.firstname} {emp.lastname}--{emp.dep}</li>
        ))}
      </ul>
    </>
  );
}
