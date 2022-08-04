import './Dashboard.css';
import useToken from './useToken';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';

function Dashboard() {
    const { token, setToken } = useToken();

    if (!token) {
        return (
            <Login setToken={setToken} />
        );
    } else {
        return (
            <>
                <Navbar />
                <div className="dashboard">
                    <h1>Dashboard</h1>
                </div>
            </>
        );
    }
}

export default Dashboard;
