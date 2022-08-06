import './Dashboard.css';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import useToken from './useToken';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

function Dashboard() {
    const { token, setToken } = useToken();
    const [data, setData] = useState();
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
            let url = "https://bc.bytebro.de/profile?id=" + data[index]['id'];

            QRCode.toCanvas(document.getElementById('qr-code'), url,
                function (error) {
                    if (error) console.error(error)
                    console.log('successfully created QR-Code!')
                })
        }
    }, [data, index]);

    const handleClick = (change) => {
        if (change === "+") {
            if (index < data[index].length - 1) {
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
                        {data ? "" : "Fügen Sie Ihre erste Karte hinzu"}
                        {message ? <p>{message}</p> : null}
                        <canvas id="qr-code" />
                    </div>
                    <div className="dashboard-navigation">
                        <button onClick={() => handleClick("-")}>
                            <MdKeyboardArrowLeft className="icon" />
                        </button>
                        <p>{data ? data[index]['position'] + ", " + data[index]['company'] : null}</p>
                        <button onClick={() => handleClick("+")}>
                            <MdKeyboardArrowRight className="icon" />
                        </button>
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
