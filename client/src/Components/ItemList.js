import React, { useEffect, useState } from 'react';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity }),
        });
        setName('');
        setQuantity(0);
        fetchItems();
    };

    const fetchItems = async () => {
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        setItems(data);
    };

    const deleteItem = async (id) => {
        await fetch(`http://localhost:5000/api/items/${id}`, { method: 'DELETE' });
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <>
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

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td><button onClick={() => deleteItem(item._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ItemList;
