
import React, { useState } from 'react';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';

const RegisterPage = () => {
    const {API_URL_AUTH} = useContext(API_URL_CONTEXT)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setSuccess('Registration successful! You can now log in.');
                setError('');
                setEmail('');
                setPassword('');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred during registration.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
            <button onClick={handleRegister} style={{textDecoration: 'underline'}}>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;
