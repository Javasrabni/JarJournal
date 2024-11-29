
import React, { useState } from 'react';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';
import { ThemeAppContext } from '../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    // STATUS AUTH FORM
    const { isRegister, setIsRegister } = useContext(API_URL_CONTEXT);


    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // NAVIGATE
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {

        if (username.length < 10) {
            alert('username minimal 10 karakter ')
            return
        }

        if(username.length > 12) {
            alert('username max 12 karakter')
            return
        }

        if (!email.includes('@gmail.com')) {
            alert('masukkan email yang valid')
            return
        }

        try {
            const response = await fetch(`${API_URL_AUTH}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            });

            if (response.ok) {
                setSuccess('Pendaftaran berhasil!, Silahkan LogIn');
                setError('');
                setEmail('');
                setPassword('');
                setUsername('')
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
        <div className={`w-fit h-full flex flex-col gap-[12px] justify-center ${themeActive ? 'bg-[var(--white-bg-100)]' : 'bg-[var(--white-bg-100)]'} p-[16px] rounded-[16px]`}>
            <h1 className='text-[16px] font-[600] font-[inter] text-center'>SignUp</h1>
            <div className='flex flex-col gap-[12px] w-[240px]'>
                <div className='flex flex-col'>
                    <label htmlFor="username" className='text-[10px]'>Username</label>
                    <input
                        name='Email'
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="email"
                        placeholder="Armstrong"
                        value={username}
                        onChange={(e) => setUsername(e.target.value).toLowerCase()}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-[10px]'>Email</label>
                    <input
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="email"
                        placeholder="armstrong@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-[10px]'>Password</label>
                    <input
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleRegister} style={{ backgroundColor: 'var(--black-card)', color: 'white', fontSize: '12px', padding: '4px 16px', borderRadius: "4px", marginTop: '12px' }}>Daftar</button>

            {error && <p style={{ color: 'tomato', fontSize: '12px', textAlign: 'center', fontWeight: "500" }}>{error}</p>}
            {success && <p style={{ color: 'green', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;
