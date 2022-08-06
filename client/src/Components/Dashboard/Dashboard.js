import './Dashboard.css';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import useToken from './useToken';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';

function Dashboard() {
    const { token, setToken } = useToken();
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        var url = "https://bc.bytebro.de/api/getCards.php?id=" + token;

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result)))
            .catch(error => setMessage(error));
    }, [token]);

    useEffect(() => {
        if (data) {
            let url = "https://bc.bytebro.de?id=" + data[index];

            QRCode.toCanvas(document.getElementById('qr-code'), url,
                function (error) {
                    if (error) console.error(error)
                    console.log('successfully created QR-Code!')
                })
        }
    }, [data, index]);

    const handleClick = (change) => {
        if (change === "+") {
            if (index < data.length - 1) {
                setIndex(index + 1);
            }
        } else {
            if (index > 0) {
                setIndex(index - 1);
            }
        }
    }

    if (!token) {
        return (
            <Login setToken={setToken} />
        );
    } else {
        return (
            <>
                <Navbar />
                <div className="dashboard">
                    <div className="dashboard-content">
                        {message ? <p>{message}</p> : null}
                        <canvas id="qr-code" />
                    </div>
                    <div className="dashboard-navigation">
                        <button onClick={() => handleClick("-")}>-</button>
                        <p>{data ? data[index] : null}</p>
                        <button onClick={() => handleClick("+")}>+</button>
                    </div>
                    <div className="dashboard-edit">
                        <button onClick={() => { }}>Bearbeiten</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;
