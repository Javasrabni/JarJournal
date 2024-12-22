import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPage from './registerPage/registerPage';
import LoginPage from './loginPage/loginPage';
import { useContext } from 'react';
// import { ThemeAppContext } from '../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';
import { API_URL_CONTEXT } from './Context/API_URL';

const AuthPage = () => {
    // THEME
    useEffect(() => {
        document.body.style.backgroundColor = 'white'
    }, [])

    // STATUS AUTH FORM
    const { isRegister, setIsRegister } = useContext(API_URL_CONTEXT);
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const navigate = useNavigate()
    // GET TOKEN
    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (getToken) {
            setToken(getToken)
        }
    }, [setToken])

    // if user has login, direct into main page
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [token])

    // THEME
    // const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    return (
        <div className={`max-w-[400px] h-[100svh] flex items-center justify-between p-[16px] m-auto`}>
            {isRegister ? (
                <div className='w-full h-full p-[16px] flex flex-col items-center justify-center'>
                    <RegisterPage />
                </div>
            ) : (
                <div className='w-full h-fit p-[16px] flex flex-col items-center justify-center'>
                    <LoginPage />
                </div>
            )}
        </div>
    );
};

export default AuthPage;