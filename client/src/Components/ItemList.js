import React, { useEffect, useState } from 'react';
import ItemTable from './ItemTable';
import axios from 'axios'
const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/items', { name, quantity });
            setName('');
            setQuantity(0);
            fetchItems();
        } catch { }
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
        } catch { }
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <div>

                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item's name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Exmple: Orange, Apple..." required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item's quantity</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

            </div>

            <div>

                <ItemTable items={items} deleteItem={deleteItem} />

            </div>
        </div >
    );
};

export default ItemList;
