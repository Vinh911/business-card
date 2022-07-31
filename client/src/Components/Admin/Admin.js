import { useState } from 'react';
import './Admin.css';
import Login from '../../Components/Login/Login';

function Admin() {
    const [token, setToken] = useState();
    if (!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="Admin">
            Admin
        </div>
    );
}

export default Admin;
