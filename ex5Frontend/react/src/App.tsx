import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import Products from './components/Products';
import Payments from "./components/Payments";
import CartBasket from "./components/Cart";
import useCart from "./hooks/useCart";
import './App.css';


function Home() {
    return <h2>Home</h2>;
}

function App() {
    const cart = useCart();
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/products" element={<Products addItem={cart.addItem} clearCart={cart.clearCart} items={cart.items} itemCount={cart.itemCount} removeItem={cart.removeItem} totalPrice={cart.totalPrice} />}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/pay" element={<Payments/>}/>
                    <Route path="/cart" element={<CartBasket addItem={cart.addItem} clearCart={cart.clearCart} items={cart.items} itemCount={cart.itemCount} removeItem={cart.removeItem} totalPrice={cart.totalPrice}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;