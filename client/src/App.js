import React from 'react';
import ItemList from './Components/ItemList';
import './App.css'
import Navbar from './Components/Navbar';

const App = () => (
    <div>
        <Navbar/>
        {/* <h1>MERN CRUD</h1> */}
        <ItemList />
    </div>
);

export default App;
