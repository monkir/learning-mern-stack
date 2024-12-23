import React, { useEffect, useState } from 'react';

const ItemList = () => {
    const [items, setItems] = useState([]);

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
    );
};

export default ItemList;
