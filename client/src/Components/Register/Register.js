import { useState } from 'react';
import './Register.css';

function Register() {
    const [message, setMessage] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const handleSubmit = (e) => {
        setMessage(null);
        e.preventDefault();
        if (password1 !== password2) {
            setMessage('Passwörter stimmen nicht überein!');
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password1
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://bc.bytebro.de/api/register.php", requestOptions)
            .then(response => response.text())
            .then(result => setMessage(result))
            .catch(error => setMessage(error));
    }

    return (
        <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
                <label>Password: </label>
                <input type="password" name="password" required onChange={e => setPassword1(e.target.value)} />
                <label>Passwort bestätigen:</label>
                <input type="password" name="password" onChange={e => setPassword2(e.target.value)} />
                <p>{message}</p>
                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
}

export default Register;
