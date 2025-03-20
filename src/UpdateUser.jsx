import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Get backend URL from .env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    // Fetch user details when component mounts
    useEffect(() => {
        axios.get(`${API_BASE_URL}/getUser/${id}`)
            .then((result) => {
                console.log("Fetched user:", result.data);
                setName(result.data.name || "");
                setEmail(result.data.email || "");
                setAge(result.data.age || "");
            })
            .catch(err => console.log("Error fetching user:", err));
    }, [id]);  // Added `id` as a dependency

    // Handle update form submission
    const Update = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/updateUser/${id}`, { name, email, age })
            .then(res => {
                console.log("Updated user:", res.data);
                navigate("/");
            })
            .catch(err => console.log("Error updating user:", err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    
                    <div className="mb-2">
                        <label>Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label>Email</label>
                        <input type="text" placeholder="Enter Email" className="form-control"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label>Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
