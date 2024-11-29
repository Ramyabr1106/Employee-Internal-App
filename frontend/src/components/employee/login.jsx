// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './log.css';

// function EmployeeLoginForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     mobileNumber: '',
//     date: new Date().toISOString().split('T')[0],
//     loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const confirmLoginTime = window.confirm("Are you sure you want to submit the form with the current login time?");
//     if (confirmLoginTime) {
//       try {
//         const res = await axios.post('http://localhost:5000/submit-login', formData);
//         if (res.data.message === 'Form submitted successfully!') {
//           alert('Data submission succeeded');
//         } else {
//           alert('Data submission failed');
//         }
//       } catch (err) {
//         alert('Data submission error: ' + err.message);
//       }

//       // Reset form fields
//       setFormData({
//         name: '',
//         mobileNumber: '',
//         date: new Date().toISOString().split('T')[0],
//         loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       });
//     }
//   };

//   return (
//     <div className='lock'>
//       <form id="employee-login-form" onSubmit={handleSubmit}className='employee-login-form'>
//         <div className="logo-container">
//           <h2 className="form-heading">Employee Work Login Form</h2>
//         </div>

//         <label htmlFor="date">Date:</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//           className='employee-login-form-input'
//         />

//         <label htmlFor="login-time">Login Time:</label>
//         <input
//           type="name"
//           id="login-time"
//           name="loginTime"
//           value={formData.loginTime}
//           readOnly
//            className='employee-login-form-input'
//         />

//         <label htmlFor="name">Name:</label>
//         <input
//           type="name"
//           id="name"
//           name="name"
          
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className='employee-login-form-input'
//         />

//         <label htmlFor="mobile-number">Mobile Number:</label>
//         <input
//           type="tel"
//           id="mobile-number"
//           name="mobileNumber"
//           inputmode="numeric"
//           maxlength="10"
//           value={formData.mobileNumber}
//           onChange={handleChange}
//           required
//           className='employee-login-form-input'
//         />

//         <input type="submit" value="Submit"  className='employee-login-form-input-submit'/>

//         <p className='jj'> Already Logged In? <Link to='/elogout'> Logout</Link></p>
//       </form>
//     </div>
//   );
// }

// export default EmployeeLoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './log.css';

function EmployeeLoginForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    date: new Date().toISOString().split('T')[0],
    loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmLoginTime = window.confirm('Are you sure you want to submit the form with the current login time?');
  
    if (confirmLoginTime) {
      console.log('Form Data:', formData); // Add this line to log form data
      try {
        const res = await axios.post('http://localhost:5000/submit-login', formData);
        if (res.status === 200) {
          alert('Form submitted successfully!');
        } else {
          alert('Form submission failed: ' + res.data.message);
        }
      } catch (err) {
        alert('Error submitting data: ' + (err.response?.data?.message || err.message));
      }
  
      // Reset form fields
      setFormData({
        name: '',
        mobileNumber: '',
       
        date: new Date().toISOString().split('T')[0],
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
  };
  
  

  return (
    <div className="lock">
      <form id="employee-login-form" onSubmit={handleSubmit} className="employee-login-form">
        <div className="logo-container">
          <h2 className="form-heading">Employee Work Login Form</h2>
        </div>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="employee-login-form-input"
        />

        <label htmlFor="login-time">Login Time:</label>
        <input
          type="name"
          id="login-time"
          name="loginTime"
          value={formData.loginTime}
          readOnly
          className="employee-login-form-input"
        />

        <label htmlFor="name">Name:</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="employee-login-form-input"
        />

        <label htmlFor="mobile-number">Mobile Number:</label>
        <input
          type="tel"
          id="mobile-number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
          className="employee-login-form-input"
        />

        <input type="submit" value="Submit" className="employee-login-form-input-submit" />

        <p className="jj">
          Already Logged In? <Link to="/elogout">Logout</Link>
        </p>
      </form>
    </div>
  );
}

export default EmployeeLoginForm;





