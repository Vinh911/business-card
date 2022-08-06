import { useState } from 'react';
import './Register.css';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';

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
            .then(response => response.json())
            .then(result => setMessage(result))
            .catch(error => setMessage(error));
    }

    return (
        <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
                <p className="heading">Registrierung</p>
                <p className="sub-heading">Lege deinen neuen Account an</p>
                <div className="input-group">
                    <MdOutlineEmail className="input-icon" />
                    <input type="email" name="email" required placeholder='Email' onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <MdOutlineLock className="input-icon" />
                    <input type="password" name="password" required placeholder="Passwort" onChange={e => setPassword1(e.target.value)} />
                </div>
                <div className="input-group">
                    <MdOutlineLock className="input-icon" />
                    <input type="password" name="password" required placeholder="Passwort bestätigen" onChange={e => setPassword2(e.target.value)} />
                </div>
                <p>{message}</p>
                <div className="submit-group">
                    <input className="register-button" type="submit" value="Registrieren" />
                    <p>Du hast einen Account? <span onClick={() => window.location.href = '/dashboard'}>Login</span></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
