
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

    const [onceRegisteButton, setOnceRegisteButton] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { success, setSuccess, statusSuccess, setStatusSuccess } = useContext(API_URL_CONTEXT)

    const [validateUsername, setvalidateUsername] = useState(null)
    const [validatePassword, setvalidatePassword] = useState(null)
    const [validateEmail, setvalidateEmail] = useState(null)

    const handleRegister = async () => {
        setOnceRegisteButton(true)
        try {
            const response = await fetch(`${API_URL_AUTH}/userRegister`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });

            const data = await response.json()

            if (response.ok) {
                setSuccess(data.msg);
                setError('');
                setEmail('');
                setPassword('');
                setUsername('')
                setStatusSuccess(true)

                setvalidateUsername(null)
                setvalidatePassword(null)
                setvalidateEmail(null)

                // AUTO DIRECT INTO LOGIN
                setIsRegister(false)
            } else {
                setvalidateUsername(data.usernameERR)
                setvalidatePassword(data.passwordERR)
                setvalidateEmail(data.emailERR)
                setError(data.ErrMsg);
                setSuccess('');
            }
        } catch (err) {
            setError("Terjadi kesalahan");
            setSuccess('');
        } finally {
            setOnceRegisteButton(false)
        }
    };

    const viewPortHeightWindow = window.innerHeight;
    const goldenRatioHeight = viewPortHeightWindow / 1.618;
    const residualHeightOfGR = viewPortHeightWindow - goldenRatioHeight;

    const loadingSpinner = <div role="status">
        <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
    </div>

    const [hideNShowPassword, setHideNShowPassword] = useState(false)
    const eyeShow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const eyeHide = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>


    return (
        <div className={`w-full h-full flex flex-col gap-[8px] justify-around items-center rounded-[16px]`}>

            {/* <div style={{ height: residualHeightOfGR - (goldenRatioHeight / 2) }} className=' w-full flex flex-row gap-[16px] items-center justify-center'>
                <img src="/Assets/Icon/star.svg" alt="JarJournal Icon" style={{ filter: "drop-shadow(0px 0px 12px gold)" }} width={'32px'} />
                <p className='text-[24px] font-[600]'>JarJournal</p>
            </div> */}

            <div className={`h-[${goldenRatioHeight}] mb-[64px]`}>
                <h1 className='text-[16px] font-[600] text-center select-none pb-[16px]'>SignUp, Daftar gratis!</h1>
                <div className='flex flex-col gap-[12px] w-full'>
                    <div className='flex flex-col w-full '>
                        <input
                            name='username'
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type="text"
                            placeholder="Nama pengguna"
                            value={username}
                            maxLength={20}
                            onChange={(e) => { setUsername(e.target.value); setvalidateUsername(null) }}
                        />
                        <p style={{ color: 'tomato', fontSize: '12px', fontWeight: "500" }}>{validateUsername}</p>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type="email"
                            placeholder="Alamat email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setvalidateEmail(null) }}
                        />
                        <p style={{ color: 'tomato', fontSize: '12px', fontWeight: "500" }}>{validateEmail}</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center relative'>
                            <input
                                className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                                type={hideNShowPassword ? 'text' : 'password'}
                                placeholder="Password JarJournal"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setvalidatePassword(null) }}
                            />
                            <button onClick={() => setHideNShowPassword(prev => !prev)} className='absolute right-[16px]'>
                                {hideNShowPassword ? eyeShow : eyeHide}
                            </button>
                        </div>
                        <p style={{ color: 'tomato', fontSize: '12px', fontWeight: "500" }}>{validatePassword}</p>
                    </div>
                    <div className='flex flex-col gap-[12px] mt-[12px]'>
                        <p className='text-[11px] text-[var(--black-subtext)]'>JarJournal menciptakan ruang yang aman dan nyaman, serta menjaga sepenuhnya privasi para pengguna.</p>

                        {/* CHECKBOX ACCEPT THE TERMS AND PRIVACY POLICY */}
                        <div className='flex flex-row gap-[8px] items-center'>
                            <input type='checkbox' />
                            <p className='text-[11px] text-[var(--black-subtext)] select-none'>I accept the <a href="#" className='underline'>terms</a> & <a href="" className='underline'>privacy policy.</a></p>
                        </div>

                    </div>
                </div>
                <div className='flex flex-row items-center  justify-center w-full'>
                    <button onClick={handleRegister} style={{ backgroundColor: 'var(--black-card)', color: 'white', width: '100%', height: '35px', fontSize: '12px', padding: '0 16px', borderRadius: "50px", marginTop: '12px', opacity: onceRegisteButton ? '60%' : '100%' }} disabled={onceRegisteButton}>{onceRegisteButton ? <span className='flex items-center justify-center gap-[8px]'>{loadingSpinner} Membuatkan akun untukmu..</span> : "Buat akun"}</button>
                </div>

                <p style={{ color: 'blue', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
                    <button onClick={() => setIsRegister(false)} className='text-[12px] text-black select-none'>Sudah punya akun?{' '}<span className='font-[600] text-[var(--blue-clr)]'>Masuk</span> </button>
                </p>

                {error && <p style={{ color: 'tomato', fontSize: '12px', textAlign: 'center', fontWeight: "500" }}>{error}</p>}
                {success && <p style={{ color: 'green', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>{success}</p>}
            </div>


        </div>
    );
};

export default RegisterPage;

