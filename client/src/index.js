import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from './Components/Profile/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
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
                <Route exact path="/" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dev" element={<Navbar />} />
            </Routes>
        </Router>
    </React.StrictMode>
);