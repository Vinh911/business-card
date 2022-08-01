import { useState } from 'react';
import './Register.css';

function Register() {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const handleSubmit = (e) => {
        setError(null);
        e.preventDefault();
        if (password1 !== password2) {
            setError('Passwörter stimmen nicht überein!');
            return;
        }

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password1);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://bc.bytebro.de/api/register.php", requestOptions)
            .then(response => response.text())
            .then(result => setError(result))
            .catch(error => setError(error));
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
                <p>{error}</p>
                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
}

export default Register;
