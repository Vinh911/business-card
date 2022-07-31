import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from './Components/Profile/Profile';
import Admin from './Components/Admin/Admin';
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
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    </React.StrictMode>
);