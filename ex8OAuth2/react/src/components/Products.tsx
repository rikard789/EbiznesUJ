import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Cart} from "../hooks/useCart";

interface Category {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    name: string;
}

interface Product {
    ID: number;
    name: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    category_id: number;
    category: Category;
    price: number;
}

function Products(cart: Cart) {
    const [products, setProducts] = useState<Product[]>([]);

    const { addItem, items } = cart;
    console.log("items " + items);

    useEffect(() => {
        axios.get<Product[]>('http://localhost:1323/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Lista produktów:</h1>
    <ul className='products'>
    {products.map(product => (
            <li key={product.ID}>
                <h2>{product.name}</h2>
                <p>{product.category.name}</p>
                <p>Cena: {product.price} zł</p>
                <button onClick={() => addItem({id: product.ID, name: product.name, price: product.price})}>Add to cart</button>
            </li>

))}
    </ul>
    </div>
);
}

export default Products;