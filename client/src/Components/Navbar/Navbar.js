import './Navbar.css';
import { useState } from 'react';



export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const displayMenue = () => {
        if (isOpen) {
            return (
                <>
                    <ul className="navbar-list">
                        <li>Einstellungen</li>
                        <li>Datenschutz</li>
                        <li>Logout</li>
                    </ul>
                    <br style={{ clear: "both" }}></br>
                </>
            )
        }
    }

    return (
        <div className="navbar">
            {isOpen ? displayMenue() : null}

            <div className="navbar-items">
                <button onClick={() => setIsOpen(!isOpen)}>Menue</button>
                <button onClick={() => window.location.href = '/add'}>Add</button>
            </div>
        </div >
    );
}