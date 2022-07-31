import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    //send login request to server
}

function Login({ setToken }) {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
                <label>Passwort: </label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <p>{error}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
