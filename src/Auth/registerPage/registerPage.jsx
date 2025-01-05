
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
    const { success, setSuccess, statusSuccess, setStatusSuccess } = useContext(API_URL_CONTEXT)

    const handleRegister = async () => {

        if (!email.includes('@gmail.com')) {
            alert('masukkan email yang valid')
            return
        }

        if (!username || !email || !password) {
            alert("Masukkan nama / email / pass terlebih dahulu")
            return
        }
        if (password.length < 8) {
            alert("Password harus memiliki setidaknya 8 karakter");
            return;
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
                setStatusSuccess(true)

                // AUTO DIRECT INTO LOGIN
                setIsRegister(false)
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

    const viewPortHeightWindow = window.innerHeight;
    const goldenRatioHeight = viewPortHeightWindow / 1.618;
    const residualHeightOfGR = viewPortHeightWindow - goldenRatioHeight;

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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type="email"
                            placeholder="Alamat email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            className='p-[14px] text-[12px] w-full rounded-[8px] outline-none bg-[var(--white-bg-100)]'
                            type="password"
                            placeholder="Password JarJournal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                    <button onClick={handleRegister} style={{ backgroundColor: 'var(--black-card)', color: 'white', width: '100%', height: '35px', fontSize: '12px', padding: '0 16px', borderRadius: "50px", marginTop: '12px' }}>Buat akun</button>
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