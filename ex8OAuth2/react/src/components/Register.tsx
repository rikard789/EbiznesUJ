// src/components/Register.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../App.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const response = await fetch('http://localhost:1323/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                alert('Registration successful');
                navigate('/login'); 
                // Redirect or perform additional actions upon successful registration
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Username"
                    className="form-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="form-button" onClick={handleRegister}>
                    Register
                </button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
