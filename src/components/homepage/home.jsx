import React from 'react';
import"./home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <h1 className='heading'> Attendence Register</h1>
    <div class="container">
  <div class="top-right">
    <Link to='/register'>Register</Link>
    <Link to='/elogin'>Login</Link>
    
  </div>
</div>

    <div className='parent'>
     
      <div className='card'>
        <h1 className='head'>Employee</h1>
      <Link to="/elogin">
        <img className='img-v' src="https://static.vecteezy.com/system/resources/previews/002/905/628/original/company-staff-business-team-flat-illustration-professional-businessmen-and-businesswomen-cartoon-characters-successful-entrepreneurs-corporate-personnel-office-workers-directors-board-vector.jpg" alt="emp" />
        <button className='butn'>Enter</button>
        </Link>
      </div>
    
     
      <div className='card'>
        <h1 className='head'>Admin</h1>
      <Link to='/alog'>
     <img className='img-v' src="https://png.pngtree.com/png-clipart/20220910/original/pngtree-administration-illustration-with-women-on-the-phone-and-talking-many-things-png-image_8528916.png" alt="admin" />
     <button className='butn'> Enter</button>
      </Link> 
      </div>
    
     </div>
  </>
  )
}
export default Home;
