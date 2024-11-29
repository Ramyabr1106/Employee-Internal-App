// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     emailId: '',
//     password: '',
//     confirmPassword: '',
//     employeeId: '',
//     mobileNo: ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Prevent non-numeric input for mobile number
//     if (name === 'mobileNo') {
//       const numericValue = value.replace(/\D/g, '');
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: numericValue.slice(0, 10)
//       }));
//       return;
//     }

//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Name validation (only letters and spaces)
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (!nameRegex.test(formData.name)) {
//       newErrors.name = "Name can only contain letters and spaces";
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.emailId.trim()) {
//       newErrors.emailId = "Email is required";
//     } else if (!emailRegex.test(formData.emailId)) {
//       newErrors.emailId = "Invalid email format";
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
//       newErrors.password = "Password must include uppercase, lowercase, number, and special character";
//     }
    
//     // Confirm Password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     // Employee ID validation (alphanumeric)
//     const employeeIdRegex = /^[A-Za-z0-9]+$/;
//     if (!formData.employeeId.trim()) {
//       newErrors.employeeId = "Employee ID is required";
//     } else if (!employeeIdRegex.test(formData.employeeId)) {
//       newErrors.employeeId = "Employee ID must be alphanumeric";
//     }
    
//     // Mobile Number validation (exactly 10 digits)
//     if (!formData.mobileNo.trim()) {
//       newErrors.mobileNo = "Mobile number is required";
//     } else if (formData.mobileNo.length !== 10) {
//       newErrors.mobileNo = "Mobile number must be 10 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       console.log('Form submitted', formData);
//       // Add your registration logic here
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
      
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
//             <input 
//               type="text" 
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="emailId">Email ID</label>
//             <input 
//               type="email" 
//               id="emailId"
//               name="emailId"
//               value={formData.emailId}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.emailId ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>}
//           </div>

//           {/* Password Fields */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
//             <input 
//               type="password" 
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">Confirm Password</label>
//             <input 
//               type="password" 
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.confirmPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//           </div>

//           {/* Employee ID Field */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="employeeId">Employee ID</label>
//             <input 
//               type="text" 
//               id="employeeId"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.employeeId ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
//           </div>

//           {/* Mobile Number Field */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="mobileNo">Mobile Number</label>
//             <input 
//               type="tel" 
//               id="mobileNo"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               maxLength="10"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.mobileNo ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//               }`}
//             />
//             {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Register
//           </button>

//           {/* Login Link */}
//           <div className="text-center mt-4">
//             <p className="text-gray-600">
//               Already registered? 
//               <a href="/login" className="text-blue-600 hover:underline ml-2">
//                 Login
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;















// import React, { useState } from 'react';
// import './register.css'; // Import the CSS file

// function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     employeeId: '',
//     mobileNumber: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here, e.g., send data to a server
//     console.log(formData);
//   };

//   return (
//     <div className="registration-form-container4">
//       <h2>Registration Form</h2><br/>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label   
//  htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required   

//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email ID:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}   

//             required
//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}   

//             onChange={handleChange}
//             required
//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required   

//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="employeeId">Employee ID:</label>
//           <input
//             type="text"
//             id="employeeId"
//             name="employeeId"
//             value={formData.employeeId}   

//             onChange={handleChange}
//             required   

//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="mobileNumber">Mobile Number:</label>
//           <input
//             type="number"
//             id="mobileNumber"
//             name="mobileNumber"
//             value={formData.mobileNumber}   

//             onChange={handleChange}
//             required
//             className="input-field-reg" // Unique class with descriptive name
//           />
//         </div>
  
//         <button type="submit">Register</button> 
//         <br/>  <br/><p>Already registered? <a href="elogin">Login</a></p>
//       </form>
//     </div>
//   );
// }

// export default RegistrationForm;








import React, { useState } from 'react';
import './register.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    mobileNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexMobile = /^[0-9]{10}$/;

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email || !regexEmail.test(formData.email)) errors.email = "Valid email is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords must match.";
    if (!formData.employeeId) errors.employeeId = "Employee ID is required.";
    if (!formData.mobileNumber || !regexMobile.test(formData.mobileNumber)) errors.mobileNumber = "Valid 10-digit mobile number is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;  // Only submit if validation passes

    // Submit data to the server if validation passes
    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      employeeId: formData.employeeId,
      mobileNumber: formData.mobileNumber,
    };

    // Use fetch to send data to the server
    fetch('http://localhost:5000/submit-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert('Registration successful!');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="registration-form-container4">
      <h2>Registration Form</h2><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.employeeId && <p className="error">{errors.employeeId}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="input-field-reg"
          />
          {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
        </div>

        <button type="submit">Register</button>
        <br /> <br />
        <p>Already registered? <a href="elogin">Login</a></p>
      </form>
    </div>
  );
}

export default RegistrationForm;
