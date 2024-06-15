import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './../App.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1323/login', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Login successful!');
            login(username);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Login failed!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
