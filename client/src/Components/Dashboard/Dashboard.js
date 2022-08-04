import './Dashboard.css';
import Login from '../Login/Login';
import useToken from './useToken';

function Dashboard() {
    const { token, setToken } = useToken();

    if (!token) {
        return (
            <Login setToken={setToken} />
        );
    } else {
        return (
            <div className="dashboard">
                Dashboard
            </div>
        );
    }
}

export default Dashboard;
