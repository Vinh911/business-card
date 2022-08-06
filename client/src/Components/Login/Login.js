import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';

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
                <p className="heading">Wilkommen zurück</p>
                <p className="sub-heading">Bitte loggen Sie sich ein</p>
                <div className="input-group">
                    <MdOutlineEmail className="input-icon" />
                    <input type="email" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <MdOutlineLock className="input-icon" />
                    <input type="password" name="password" placeholder="Passwort" required onChange={e => setPassword(e.target.value)} />
                </div>
                <p>{message}</p>
                <div className="submit-group">
                    <input className="login-button" type="submit" value="Login" />
                    <p>Du hast keinen Account? <span onClick={() => window.location.href = '/register'}>Registrieren</span></p>
                </div>

            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
