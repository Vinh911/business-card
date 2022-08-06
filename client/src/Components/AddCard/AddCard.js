import { useState } from 'react';
import './AddCard.css';

function AddCard() {
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        if (!e.target.name.value || !e.target.email.value) {
            setMessage('Bitte mindestens Namen und Email angeben!');
            return;
        }

        let user = window.sessionStorage.getItem('token');

        let data = JSON.stringify({
            "user": user,
            "name": e.target.name.value,
            "position": e.target.position.value,
            "company": e.target.company.value,
            "phone": e.target.phone.value,
            "email": e.target.email.value,
            "website": e.target.website.value,
            "address": e.target.address.value
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        console.log(data);
        fetch("https://bc.bytebro.de/api/addCard.php", requestOptions)
            .then(response => response.text())
            .then(result => setMessage(result))
            .catch(error => setMessage(error));
    }

    return (
        <div className="add-card">
            <h3>Neue Karte hinzufügen</h3>
            <form className="add-card-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="position" placeholder="Position" />
                <input type="text" name="company" placeholder="Firma" />
                <input type="text" name="phone" placeholder="Telefon" />
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="website" placeholder="Webseite" />
                <input type="text" name="address" placeholder="Adresse, PLZ, Stadt" />
                {message}
                <input className="add" type="submit" value="Karte hinzufügen" />
                <button className="back" type="button" onClick={() => window.location.href = '/'}>Zurück</button>
            </form>
        </div>
    );
}

export default AddCard;
