import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL_CONTEXT } from '../Context/API_URL';
import { useContext } from 'react';
import { ThemeAppContext } from '../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext';
import { OVERALL_CONTEXT } from '../../Context/OVERALL_CONTEXT';

const LoginPage = () => {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    // STATUS AUTH FORM
    const { isRegister, setIsRegister } = useContext(API_URL_CONTEXT);


    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)
    const { userEmail, setUserEmail } = useContext(API_URL_CONTEXT)



    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [usernameORemail, setUsernameORemail] = useState('')
    const [error, setError] = useState('');
    const { success, setSuccess, statusSuccess } = useContext(API_URL_CONTEXT)

    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)


    const [onceRegisteButton, setOnceRegisteButton] = useState(false)

    const loadingSpinner = <div role="status">
        <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
    </div>

    const handleLogin = async () => {
        setOnceRegisteButton(true)
        try {
            const response = await fetch(`${API_URL_AUTH}/userLogin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameORemail, password })
            });

            const data = await response.json()

            if (response.ok) {
                setRefreshData(prev => !prev)
                setUsername(data.username)
                setUserId(data.id)
                setUserEmail(data.email)
                setToken(data.token); // Simpan token ke dalam state aplikasi
                localStorage.setItem('token', data.token)
                console.log(typeof data.token, "FORMAT TOKEN")
                // navigate('/dashboard')
            } else {
                setError(data.ErrMsg);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setOnceRegisteButton(false)
        }
    };


    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    const { introAfterLogin, setIntroAfterLogin, isCheckingIntro, setIsCheckingIntro } = useContext(OVERALL_CONTEXT)
    useEffect(() => {
        if (!token) {
            setIntroAfterLogin(false)
        }
    }, [token])

    const [hideNShowPassword, setHideNShowPassword] = useState(false)
    const eyeShow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const eyeHide = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>


    return (
        <>
            {statusSuccess && (
                <div className='flex items-center justify-center absolute top-[32px] left-[50%] max-w-[42rem] py-[12px] px-[16px] bg-[var(--blue-clr)] rounded-lg text-white' style={{ transform: 'translateX(-50%) ' }}>
                    {success && <p style={{ fontSize: '12px', fontWeight: '500' }}>{success}</p>}
                </div>
            )}

            <div className={`w-full h-full flex flex-col gap-[12px] justify-center items-center rounded-[16px]`}>
                <h1 className='text-[16px] font-[600] text-center select-none'>SignIn</h1>
                <div className='flex flex-col gap-[12px] w-full'>
                    <div className='flex flex-col w-full'>
                        {/* <label htmlFor="username" className='text-[10px]'>Username</label> */}
                        <input
                            name='username'
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type="email"
                            placeholder="Username"
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
                    <div className='flex gap-[8px] items-center w-full relative'>
                        {/* <label htmlFor="password" className='text-[10px]'>Password</label> */}
                        <input
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type={hideNShowPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={() => setHideNShowPassword(prev => !prev)} className='absolute right-[16px]'>
                            {hideNShowPassword ? eyeShow : eyeHide}
                        </button>
                    </div>
                    {/* CHECKBOX REMEMBER */}
                    <div className='flex flex-row gap-[8px] items-center select-none'>
                        <input type='checkbox' id='rememberMe' />
                        <label htmlFor='rememberMe' className='text-[11px] text-[var(--black-subtext)]'>Remember me</label>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                    <button onClick={handleLogin} style={{ backgroundColor: 'var(--black-card)', color: 'white', width: '100%', height: '35px', fontSize: '12px', padding: '0 16px', borderRadius: "50px", marginTop: '12px', opacity: onceRegisteButton ? '60%' : '100%' }}>{onceRegisteButton ? <span className='flex items-center justify-center gap-[8px]'>{loadingSpinner} Loading..</span> : "Masuk"}</button>

                    {/* USER NOT HAVE ACCOUNT */}
                    <p style={{ color: 'blue', fontSize: '12px', marginTop: '12px' }}>
                        <button onClick={() => setIsRegister(true)} className='text-[12px] text-black select-none'>Belum punya akun?{' '} <span className='text-[var(--blue-clr)] font-[600]'>Daftar</span></button>
                    </p>
                </div>

                {error && <p className='text-[12px] text-[tomato] text-center font-[500]'>{error}</p>}
            </div>
        </>
    );
};

export default LoginPage

