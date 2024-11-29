import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from 'axios'; // Import axios for making HTTP requests
import './taskpage.css'; // Import the CSS file for styling

const TasksPage = () => {
    const location = useLocation();
    const { selectedData } = location.state;
    const [tasks, setTasks] = useState([]);
    
    // Fetch tasks data from the backend when the component mounts
    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint for fetching tasks data
                const response = await axios.get('http://localhost:5000/employee-logins');
                setTasks(response.data); // Update the tasks state with the fetched data
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Run this effect only once when the component mounts

    const handleInputChange = (id, field, value) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === id ? { ...task, [field]: value } : task
        ));
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(tasks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
        XLSX.writeFile(workbook, "tasks.xlsx");
    };

    return (
        <div className="tasks-page">
            <h1 className="admin">Admin dashboard</h1>
            <table className="tasks-table" border="1">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Morning Task</th>
                        <th>Evening Task</th>
                        <th>Suggestions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>
                                <input 
                                    type="text" 
                                    value={task.morningTask} 
                                    onChange={(e) => handleInputChange(task.id, "morningTask", e.target.value)} 
                                    disabled={!!task.morningTask} 
                                    />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    value={task.afternoonTask} 
                                    onChange={(e) => handleInputChange(task.id, "eveningTask", e.target.value)} 
                                    disabled={!!task.afternoonTask} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    value={task.suggestionBox} 
                                    onChange={(e) => handleInputChange(task.id, "suggestions", e.target.value)} 
                                    disabled={!!task.suggestionBox}  
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="export-button" onClick={handleExport}>Export to Excel</button>
        </div>
    );
};

export default TasksPage;




