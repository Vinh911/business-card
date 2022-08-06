import './Profile.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import logo from './dove.png';
import { MdOutlineEmail, MdPhone, MdHouse, MdDevices } from 'react-icons/md';

function Profile() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState();
    const [message, setMessage] = useState();


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        setData();
        let id = searchParams.get('id');
        var url = "https://bc.bytebro.de/api/displayCard.php?id=" + id;

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result)))
            .catch(error => setMessage(error));
    }, [searchParams]);

    if (!data) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="profile">
                <div className='top'>
                    <div className='data'>
                        <p>{data['name']}</p>
                        <p>{data['position']}</p>
                        <p>{data['company']}</p>
                    </div>
                </div>
                <div className='middle'>
                    <div className='data'>
                        <img src={logo} style={{ height: "150px" }} alt="company logo" />
                        {message ? <p>{message}</p> : null}
                    </div>
                </div>
                <div className='bottom'>
                    <div className='data'>
                        <p><MdPhone className="icon" />{data['phone']}</p>
                        <p><MdOutlineEmail className="icon" /> {data['email']}</p>
                        <p><MdDevices className="icon" />{data['website']}</p>
                        <p><MdHouse className="icon" />{data['address']}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
