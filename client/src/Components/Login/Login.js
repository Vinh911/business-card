import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';


export default function Login({ setToken }) {
    const [message, setMessage] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://bc.bytebro.de/api/login.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['msg'] !== undefined && result['token'] !== undefined) {
                    setToken(result['token']);
                    setMessage(result['msg']);
                } else {
                    setMessage(result);
                }
            })
            .catch(error => setMessage(error));
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" required onChange={e => setEmail(e.target.value)} />
                <label>Passwort: </label>
                <input type="password" name="password" required onChange={e => setPassword(e.target.value)} />
                <p>{message}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
