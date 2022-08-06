import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from './Components/Profile/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import AddCard from './Components/AddCard/AddCard';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<AddCard />} />
            </Routes>
        </Router>
    </React.StrictMode>
);