import React, {useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import Products from './components/Products';
import Payments from "./components/Payments";
import CartBasket from "./components/Cart";
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import useCart from "./hooks/useCart";
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function Home() {
    return (
        <div className="container">
            <h2>Home</h2>
            {/* <p>Content of your home page goes here...</p> */}
            {/* {isLoggedIn && <p>Additional content for logged-in users...</p>} */}
            {/* {!isLoggedIn && <button onClick={handleLogin}>Simulate Login</button>} */}
        </div>
    );
}

function App() {
    const cart = useCart();
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <nav>
                        <Navbar/>
                    </nav>
                    <Routes>
                        <Route path="/products" element={<Products addItem={cart.addItem} clearCart={cart.clearCart} items={cart.items} itemCount={cart.itemCount} removeItem={cart.removeItem} totalPrice={cart.totalPrice} />}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/pay" element={<Payments/>}/>
                        <Route path="/cart" element={<CartBasket addItem={cart.addItem} clearCart={cart.clearCart} items={cart.items} itemCount={cart.itemCount} removeItem={cart.removeItem} totalPrice={cart.totalPrice}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;