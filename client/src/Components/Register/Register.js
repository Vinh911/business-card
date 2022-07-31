import { useState } from 'react';
import './Register.css';

function Register() {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            setError('Passwörter stimmen nicht überein!');
        }
        console.log(email, password1);
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
                <label>Password: </label>
                <input type="password" name="password" onChange={e => setPassword1(e.target.value)} />
                <label>Passwort bestätigen:</label>
                <input type="password" name="password" onChange={e => setPassword2(e.target.value)} />
                <p>{error}</p>
                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
}

export default Register;
