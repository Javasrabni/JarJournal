import React, { useState } from 'react';
import RegisterPage from './registerPage/registerPage';
import LoginPage from './loginPage/loginPage';

const AuthPage = ({setToken}) => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            {isRegister ? (
                <>
                    <p style={{color: 'blue', textDecoration: 'underline'}}>
                        
                        <button onClick={() => setIsRegister(false)}>Already have an account?{' '} Login</button>
                    </p>
                    <RegisterPage />
                </>
            ) : (
                <>
                    <LoginPage setToken={setToken}/>
                    <p style={{color: "blue", textDecoration: 'underline'}}>
                        
                        <button onClick={() => setIsRegister(true)}>Don't have an account?{' '} Register</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default AuthPage;