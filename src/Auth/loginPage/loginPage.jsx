import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';
import { ThemeAppContext } from '../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';

const LoginPage = ({ setToken }) => {
    const {API_URL_AUTH} = useContext(API_URL_CONTEXT)

    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [usernameORemail, setUsernameORemail] = useState('')
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch(`${API_URL_AUTH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameORemail, password})
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

    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    return (
        <div className={`w-fit h-full flex flex-col gap-[12px] justify-center ${themeActive ? 'bg-[var(--white-bg-100)]' : 'bg-[var(--white-bg-100)]'} p-[16px] rounded-[16px]`}>
            <h1 className='text-[16px] font-[inter] font-[600] text-center'>SignIn</h1>
            <div className='flex flex-col gap-[12px] w-[240px]'>
                <div className='flex flex-col'>
                    {/* <label htmlFor="username" className='text-[10px]'>Username</label> */}
                    <input
                        name='username'
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="email"
                        placeholder="Username or Email"
                        value={usernameORemail}
                        onChange={(e) => setUsernameORemail(e.target.value)}
                    />
                </div>
                {/* <div className='flex flex-col'>
                    <label htmlFor="email" className='text-[10px]'>Email</label>
                    <input
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="email"
                        placeholder="armstrong@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div> */}
                <div className='flex flex-col'>
                    {/* <label htmlFor="password" className='text-[10px]'>Password</label> */}
                    <input
                        className='p-[8px] text-[10px] w-full rounded-[4px] outline-none'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleLogin} style={{ backgroundColor: 'var(--black-card)', color: 'white', fontSize: '12px', padding: '4px 16px', borderRadius: "4px", marginTop: '12px'}}>Masuk</button>

            {error && <p className='text-[12px] text-[tomato] text-center font-[500]'>{error}</p>}
        </div>
    );
};

export default LoginPage