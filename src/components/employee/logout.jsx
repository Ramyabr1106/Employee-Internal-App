// import React, { useState, useEffect } from 'react';
// import "./log.css";
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function EmployeeLogoutForm() {
//   const [formData, setFormData] = useState({
//     date: '',
//     logoutTime: '',
//     name: '',
//     mobileNumber: '',
//     sessionType: 'in-office',
//     morningTask: '',
//     afternoonTask: '',
//     suggestionBox: ''
//   });

//   useEffect(() => {
//     const currentDate = new Date().toISOString().split('T')[0];
//     const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//     setFormData(prevState => ({
//       ...prevState,
//       date: currentDate,
//       logoutTime: currentTime
//     }));
//   }, []);

//   const confirmTime = () => {
//     const confirmLogoutTime = window.confirm("Are you sure you want to submit the form with the current logout time?");
//     if (confirmLogoutTime) {
//       submitForm();
//     }
//   }

//   const submitForm = async () => {
//     if (!validateForm()) return;

//     // Check if the mobile number matches the expected format
//     if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(formData.mobileNumber)) {
//       alert("Please enter a valid mobile number.");
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/submit-logout', formData);
//       if (res.data.message === 'Logout form submitted successfully!') {
//         alert('Logout form submitted successfully!');
//       } else {
//         alert('Data submission failed');
//       }
//     } catch (err) {
//       alert('Data submission error: ' + err.message);
//     }
//   }

//   const validateForm = () => {
//     const { name, mobileNumber, morningTask, afternoonTask } = formData;
//     if (!name || !mobileNumber || !morningTask || !afternoonTask) {
//       alert("Please fill in all the required fields.");
//       return false;
//     }
//     return true;
//   }

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   }

//   return (
//     <div className="lock">
//       <form className='employee-login-form' id="employee-logout-form" onSubmit={(e) => { e.preventDefault(); confirmTime(); }}>
//         <div className="logo-container">
//           <h2 className="form-heading">Employee Work Logout Form</h2>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label htmlFor="date">Date:</label>
//             <input type="date" id="date" name="date" value={formData.date} readOnly className='employee-login-form-input'/>
//           </div>
//           <div className="form-column">
//             <label htmlFor="logout-time">Logout Time:</label>
//             <input type="name" id="logout-time" name="logoutTime" value={formData.logoutTime} readOnly className='employee-login-form-input' />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label htmlFor="name">Name:</label>
//             <input type="name" id="name" name="name" value={formData.name} onChange={handleInputChange} required className='employee-login-form-input'/>
//           </div>
//           <div className="form-column">
//             <label htmlFor="mobile-number">Mobile Number:</label>
//             <input type="tel" id="mobile-number" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required className='employee-login-form-input'/>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label htmlFor="session-type">Session Type:</label>
//             <select id="session-type" name="sessionType" value={formData.sessionType} onChange={handleInputChange}>
//               <option value="in-office">In Office</option>
//               <option value="work-from-home">Work from Home</option>
//             </select>
//           </div>
//         </div>

//         <div className={formData.sessionType === 'work-from-home' ? 'upload1' : 'upload'}>


//           <div className="form-row" id="morning-task-row">
//             <div className="form-column">
//               <label className='tap' htmlFor="morning-task">Morning Task:</label>
//               <textarea id="morning-task" name="morningTask" rows="4" value={formData.morningTask}
//                         onChange={handleInputChange} required/>
//             </div>
//           </div>

//           <div className="form-row" id="afternoon-task-row">
//             <div className="form-column">
//               <label className='tap' htmlFor="afternoon-task">Afternoon Task:</label>
//               <textarea id="afternoon-task" name="afternoonTask" rows="4" value={formData.afternoonTask} onChange={handleInputChange} required/>
//             </div>
//           </div>
//           <div className="form-row" id="afternoon-task-row">
//             <div className="form-column">
//               <label className='tap' htmlFor="suggestion-box">Suggestion Box:</label>
//               <textarea id="suggestion-box" name="suggestionBox" rows="4" value={formData.suggestionBox}
//                         onChange={handleInputChange} />
//             </div>
//           </div>
//         </div>

//         <input type="submit" value="Submit" className='employee-login-form-input-submit' />
//         <p className='jj'>Get Back To Login? <Link to='/elogin'> Log In</Link></p>
//       </form>
//     </div>
//   );
// }

// export default EmployeeLogoutForm;




import React, { useState, useEffect } from 'react';
import "./log.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogoutForm() {
  const [formData, setFormData] = useState({
    date: '',
    logoutTime: '',
    name: '',
    mobileNumber: '',
    sessionType: 'in-office',
    morningTask: '',
    afternoonTask: '',
    suggestionBox: ''
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFormData(prevState => ({
      ...prevState,
      date: currentDate,
      logoutTime: currentTime
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, mobileNumber, morningTask, afternoonTask } = formData;
    if (!name || !mobileNumber || !morningTask || !afternoonTask) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/submit-logout', formData);
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Network error or server is unavailable.');
      }
    }
  };

  return (
    <div className="lock">
      <form className="employee-login-form" id="employee-logout-form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <h2 className="form-heading">Employee Work Logout Form</h2>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} readOnly className="employee-login-form-input" />
          </div>
          <div className="form-column">
            <label htmlFor="logout-time">Logout Time:</label>
            <input type="name" id="logout-time" name="logoutTime" value={formData.logoutTime} readOnly className="employee-login-form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="name">Name:</label>
            <input type="name" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="employee-login-form-input" />
          </div>
          <div className="form-column">
            <label htmlFor="mobile-number">Mobile Number:</label>
            <input type="tel" id="mobile-number" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required className="employee-login-form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="session-type">Session Type:</label>
            <select id="session-type" name="sessionType" value={formData.sessionType} onChange={handleInputChange} className="employee-login-form-input">
              <option value="in-office">In Office</option>
              <option value="work-from-home">Work from Home</option>
            </select>
          </div>
        </div>

        <div className="form-row" id="morning-task-row">
          <div className="form-column">
            <label className='tap'htmlFor="morning-task">Morning Task:</label>
            <textarea id="morning-task" name="morningTask" rows="4" value={formData.morningTask} onChange={handleInputChange} required  />
          </div>
          

         
          <div className="form-column">
            <label className='tap' htmlFor="afternoon-task">Afternoon Task:</label>
            <textarea id="afternoon-task" name="afternoonTask" rows="4" value={formData.afternoonTask} onChange={handleInputChange} required  />
          </div>
         

        <div className="form-row">
          <div className="form-column">
            <label className='tap' htmlFor="suggestion-box">Suggestion Box:</label>
            <textarea id="suggestion-box" name="suggestionBox" rows="4" value={formData.suggestionBox} onChange={handleInputChange}  />
          </div>
        </div>
        </div>

        <input type="submit" value="Submit" className="employee-login-form-input-submit" />
        <p className="jj">Get Back To Login? <Link to="/elogin">Log In</Link></p>
      </form>
    </div>
  );
}

export default EmployeeLogoutForm;
