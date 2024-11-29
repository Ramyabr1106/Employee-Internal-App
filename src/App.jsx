import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homepage/home';
import RegisterForm from './components/homepage/register'
import EmployeeLogoutForm from './components/employee/logout';
import EmployeeLoginForm from './components/employee/login';
import AdminLog from './components/admin/login';
import AdminTable from './components/admin/table';
import TasksPage from './components/admin/taskpge';


function App() {
 

  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/elogin' element={<EmployeeLoginForm/>}/>
        <Route path='/elogout' element={<EmployeeLogoutForm/>}/>
        <Route path='/alog' element={<AdminTable/>}/>
        <Route path="/tasks" element={<TasksPage/>} />
       </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
