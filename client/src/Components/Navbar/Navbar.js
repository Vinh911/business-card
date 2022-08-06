import './Navbar.css';
import { useState } from 'react';
import { MdOutlineMenu, MdAddCircleOutline } from 'react-icons/md';


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
                <MdOutlineMenu className="icon" onClick={() => setIsOpen(!isOpen)} />
                <MdAddCircleOutline className="icon" onClick={() => window.location.href = '/add'} />
            </div>
        </div >
    );
}