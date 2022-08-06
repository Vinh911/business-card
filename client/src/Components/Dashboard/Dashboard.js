import './Dashboard.css';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import useToken from './useToken';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';

function Dashboard() {
    const { token, setToken } = useToken();
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const id = window.sessionStorage.getItem('token');

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        var url = "https://bc.bytebro.de/api/getCards.php?id=" + id;

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result)))
            .catch(error => setMessage(error));
    }, []);

    useEffect(() => {
        if (data) {
            let url = "https://bc.bytebro.de?id=" + data[0];

            QRCode.toCanvas(document.getElementById('qr-code'), url,
                function (error) {
                    if (error) console.error(error)
                    console.log('successfully created QR-Code!')
                })
        }
    }, [data]);

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
                    <div className="card">
                        <p>{data ? data[0] : null}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;
