import React, { useState } from 'react';
import RegisterPage from './registerPage/registerPage';
import LoginPage from './loginPage/loginPage';
import { useContext } from 'react';
import { ThemeAppContext } from '../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';
import { API_URL_CONTEXT } from './Context/API_URL';

const AuthPage = ({ setToken }) => {
    // STATUS AUTH FORM
    const {isRegister, setIsRegister} = useContext(API_URL_CONTEXT);

    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    return (
        <div className={`w-full h-[100vh] flex items-center justify-center ${themeActive ? 'bg-white' : 'bg-white'} p-[32px]`}>
            {isRegister ? (
                <div className='w-full h-fit p-[16px] flex flex-col items-center justify-center'>
                    <RegisterPage setToken={setToken}/>
                    <p style={{ color: 'blue',fontSize: '12px',marginTop: '12px' }}>

                        <button onClick={() => setIsRegister(false)}>Sudah punya akun?{' '}<span className='underline'>Masuk</span> </button>
                    </p>
                </div>
            ) : (
                <div className='w-full h-fit p-[16px] flex flex-col items-center justify-center'>
                    <LoginPage setToken={setToken} />
                    <p style={{ color: 'blue',fontSize: '12px',marginTop: '12px' }}>

                        <button onClick={() => setIsRegister(true)}>Tidak punya akun?{' '} <span className='underline'>Daftar</span></button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuthPage;