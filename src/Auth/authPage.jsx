import React, { useState } from 'react';
import RegisterPage from './registerPage/registerPage';
import LoginPage from './loginPage/loginPage';

const AuthPage = ({setToken}) => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {isRegister ? (
                <>
                    <p>
                        Already have an account?{' '}
                        <button onClick={() => setIsRegister(false)}>Login</button>
                    </p>
                    <RegisterPage />
                </>
            ) : (
                <>
                    <LoginPage setToken={setToken}/>
                    <p>
                        Don't have an account?{' '}
                        <button onClick={() => setIsRegister(true)}>Register</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default AuthPage;