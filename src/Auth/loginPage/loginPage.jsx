import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';
import { ThemeAppContext } from '../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';

const LoginPage = () => {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    // STATUS AUTH FORM
    const { isRegister, setIsRegister } = useContext(API_URL_CONTEXT);

    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [usernameORemail, setUsernameORemail] = useState('')
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch(`${API_URL_AUTH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameORemail, password })
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
        <div className={`w-full h-full flex flex-col gap-[12px] justify-center items-center rounded-[16px]`}>
            <h1 className='text-[16px] font-[600] text-center select-none'>SignIn</h1>
            <div className='flex flex-col gap-[12px] w-full'>
                <div className='flex flex-col w-full'>
                    {/* <label htmlFor="username" className='text-[10px]'>Username</label> */}
                    <input
                        name='username'
                        className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
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
                        onChang e={(e) => setEmail(e.target.value)}
                    />
                </div> */}
                <div className='flex flex-col'>
                    {/* <label htmlFor="password" className='text-[10px]'>Password</label> */}
                    <input
                        className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* CHECKBOX REMEMBER */}
                <div className='flex flex-row gap-[8px] items-center select-none'>
                    <input type='checkbox' id='rememberMe' />
                    <label htmlFor='rememberMe' className='text-[11px] text-[var(--black-subtext)]'>Remember me</label>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <button onClick={handleLogin} style={{ backgroundColor: 'var(--black-card)', color: 'white', width: '100%', height: '35px', fontSize: '12px', padding: '0 16px', borderRadius: "50px", marginTop: '12px' }}>Masuk</button>

                {/* USER NOT HAVE ACCOUNT */}
                <p style={{ color: 'blue', fontSize: '12px', marginTop: '12px' }}>
                    <button onClick={() => setIsRegister(true)} className='text-[12px] text-black select-none'>Belum punya akun?{' '} <span className='underline'>Daftar disini</span></button>
                </p>
            </div>

            {error && <p className='text-[12px] text-[tomato] text-center font-[500]'>{error}</p>}
        </div>
    );
};

export default LoginPage