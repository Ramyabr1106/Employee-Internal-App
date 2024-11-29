import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import './table.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); // Empty dependency array ensures this effect runs only once

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employee-logins'); // Adjust the URL as per your server endpoint
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(i => i !== id) : [...prevSelected, id]
        );
    };

    const handleExport = () => {
        const selectedData = data.filter(employee => selectedIds.includes(employee.id));
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "employees.xlsx");
    };

    const handleNextPage = () => {
        const selectedData = data.filter(employee => selectedIds.includes(employee.id));
        navigate("/tasks", { state: { selectedData } });
    };

    return (
        <div className="admin-table">
            <h1 className="admin">Admin dashboard</h1>
            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Employee Name</th>
                        <th>Login Time</th>
                        <th>Logout Time</th>
                        <th>Action</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.date}</td>
                            <td>{employee.name}</td>
                            <td>{employee.loginTime}</td>
                            <td>{employee.logoutTime}</td>
                            <td>
                                <button className="next-button" onClick={handleNextPage}>Next</button>
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="export-button" onClick={handleExport}>Submit</button>
        </div>
    );
};

export default AdminTable;