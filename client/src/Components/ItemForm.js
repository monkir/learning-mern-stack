import React, { useState } from 'react';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity }),
        });
        setName('');
        setQuantity(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter item name" 
                required 
            />
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                placeholder="Enter item quantity" 
                required 
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default ItemForm;
