import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Get backend URL from .env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function Users() {
    const [users, setUsers] = useState([]);

    // Fetch all users
    useEffect(() => {
        axios.get(`${API_BASE_URL}/`)
            .then(result => {
                console.log("API Response:", result.data);  // Debugging API response
                if (Array.isArray(result.data)) {
                    setUsers(result.data);
                } else {
                    console.error("API response is not an array:", result.data);
                    setUsers([]);  // Set empty array to prevent `.map()` error
                }
            })
            .catch(err => console.log("Error fetching users:", err));
    }, []);

    // Handle delete user
    const handleDelete = (id) => {
        axios.delete(`${API_BASE_URL}/deleteUser/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id)); // Update state instead of reloading
            })
            .catch(err => console.log("Error deleting user:", err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success mb-3">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>  
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-success me-2">Update</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
