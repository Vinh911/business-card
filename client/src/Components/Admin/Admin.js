import { useState } from 'react';
import './Admin.css';
import Login from '../Login/Login';
import useToken from './useToken';

function Admin() {
    const { token, setToken } = useToken();

    if (!token) {
        return (
            <Login setToken={setToken} />
        );
    } else {
        return (
            <div className="Admin">
                Admin
            </div>
        );
    }
}

export default Admin;
