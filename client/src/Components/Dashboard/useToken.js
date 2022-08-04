import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token ? token : null;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        setToken(token)
    };

    return {
        setToken: saveToken,
        token
    }
};
