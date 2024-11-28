import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';

const LoginPage = ({ setToken }) => {
    const {API_URL_AUTH} = useContext(API_URL_CONTEXT)

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch(`${API_URL_AUTH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token)
            setToken(data.token); // Simpan token ke dalam state aplikasi
            navigate('/dashboard')
        } else {
            const errorData = await response.json();
            setError(errorData.message);
        }
        
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} style={{textDecoration: "underline"}}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage