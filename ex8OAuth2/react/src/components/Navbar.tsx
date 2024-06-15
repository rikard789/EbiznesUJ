
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './../App.css';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div>
            <div className="navbar">
                {/* <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/pay">Payment</Link>
                <Link to="/cart">Cart</Link> */}
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/products" className="nav-link">
                        Products
                    </Link>
                    <Link to="/payment" className="nav-link">
                        Payment
                    </Link>
                    <Link to="/cart" className="nav-link">
                        Cart
                    </Link>
                </div>
                    {/* <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/pay">Payment</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul> */}
                {/* <div className="brand">My App</div> */}
                {isAuthenticated ? (
                    <div className="logged-in">
                        <span className="username">You are logged in as: {user}</span>
                        <button className="button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="right-buttons">
                        <Link to="/login" className="button">
                            Login
                        </Link>
                        <Link to="/register" className="button">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;