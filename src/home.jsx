import Header from "./Comps/Navbar-Top/Header"
import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import CardFeatures from "./Comps/Features/ButtonCardFtr/CardFeatures"
import UserQuote from "./Comps/Footer/userQuote/userQuote"
import DateTimePlan from "./Comps/Features/Datetime quote/DatetmPlan/dateTimePlan"
import MoodToday from "./Comps/Features/Datetime quote/moodToday/moodToday"
import SisaHariToNewYear from "./Comps/Features/Datetime quote/sisaHari/sisaHari--Tahun/sisaHariToTahun"
import Memo from "./Comps/Features/Memo/Memo"
import MusicBox from "./Comps/Footer/musicBox/musicBox"
import EbookPage from "./Comps/Features/eBookSection/ebookPage/ebook"
import { UserQuoteContext } from "./Comps/Footer/userQuote/userQuoteContext"
import { MusicBoxContext } from "./Comps/Footer/musicBox/musicBoxContext"
import PopupLegend from "./Comps/Popup/Popup-typ1/PopupLegend"
import { AnimateLoadPageContext } from "./Comps/animate onload page/animateLoadPage"
import { OVERALL_CONTEXT } from "./Context/OVERALL_CONTEXT"
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom"
import 'react-loading-skeleton/dist/skeleton.css';
import { ChooseAvatar } from "./introWeb/chooseAvatar/chooseAvatar"

import { motion } from 'framer-motion'

// Theme App
import { ThemeAppContext } from "./Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import AuthPage from "./Auth/authPage"
import { API_URL_CONTEXT } from "./Auth/Context/API_URL"
import Publikasi from "./Comps/Features/Publikasi/pubPage/publikasi"
import NavFooter from "./Comps/Footer/Navigation footer/NavFooter"

export default function Home() {
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT) // Get public data user
    // Smooth render page
    const { animatePageMain, setAnimatePageMain } = useContext(AnimateLoadPageContext)
    useEffect(() => {
        window.addEventListener('beforeunload', setAnimatePageMain(true))
        return () => {
            window.removeEventListener('beforeunload', setAnimatePageMain(false))
        }
    }, [])

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            document.body.style.backgroundColor = themeActive ? 'var(--bg-12)' : 'white'
        }
    }, [location.pathname])

    // Mobile Media Querry
    const MobileView = matchMedia(' (max-width: 600px) ')
    const navigate = useNavigate()

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)


    const downloadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>

    const artikelIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>

    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>


    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // MusicBox
    const { statePopupInfo, setStatePopupInfo } = useContext(MusicBoxContext)
    const { popupReset, setPopupReset } = useContext(MusicBoxContext)

    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    // useEffect(() => {
    //     const savedToken = localStorage.getItem('token');
    //     if (savedToken) {
    //         setToken(savedToken); // Set token untuk menganggap user sudah login
    //     }
    // }, []);

    // HANDLE ADD POST
    // function HandleGoPublish() {
    //     if (!token) {
    //         alert('Login untuk menggunakan fitur');
    //         navigate('/Auth')
    //     } else {
    //         let delay = setTimeout(() => {
    //             navigate('/Artikel/publish')
    //         }, 200)
    //         return () => clearTimeout(delay)
    //     }
    // }

    const { introAfterLogin, setIntroAfterLogin } = useContext(OVERALL_CONTEXT)


    return (
        <>
            <>
                {/* choose avatar (intro after login) */}
                {token && introAfterLogin && (
                    <span>
                        <ChooseAvatar />
                    </span>
                )}


                {/* Popup from Reset in MusicBox */}
                {popupReset && (
                    <div className="flex items-center justify-center w-full h-full fixed z-[15]">
                        <motion.div
                            className="popup"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                zIndex: "2",
                            }}
                        >
                            <PopupLegend
                                resetInMusicBox={true}
                                Judul={'Reset timer?'}
                                Deskripsi={"Timer akan mulai dari 0 kembali."}
                            />
                        </motion.div>
                        <div className="z-[1] w-full h-full bg-[#00000080] fixed" onClick={() => setPopupReset((prev) => !prev)} />
                    </div>
                )}

                {/* Popup from INFO in MusicBox */}
                {statePopupInfo && (
                    <div className="flex items-center justify-center w-full h-full fixed z-[15]">
                        <motion.div
                            className="popup"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                zIndex: "2",
                            }}
                        >
                            <PopupLegend
                                InfoMusicBox={true}
                                Judul={'Brain Focus'}
                                Deskripsi={'Memungkinkan anda untuk fokus pada pekerjaan anda, dengan timer dan musik yang tersedia.'}
                            />
                        </motion.div>
                        <div className="z-[1] w-full h-full bg-[#00000080] fixed" onClick={() => setStatePopupInfo((prev) => !prev)} />
                    </div>
                )}


                {/* {MobileView.matches ? ( */}
                <div className={`max-w-[42rem] m-[auto] h-[100lvh] flex justify-center ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'}`} style={{ paddingBottom: '60px' }}>
                    <div className={`w-full h-full flex flex-col gap-[8px] justify-between`}>
                        <div>
                            <header>
                                <Header token={token} setToken={setToken} />
                            </header>
                            <main className="p-[16px] h-full flex flex-col" style={{ opacity: animatePageMain ? '1' : '0', backgroundColor: themeActive ? 'var(--bg-12)' : 'white' }}>
                                <div className="flex flex-col gap-[12px] w-full h-full">
                                    {/* PANEL RIGHT n LEFT */}
                                    <div className="flex flex-row gap-[12px] justify-between w-full h-fit mb-[32px]">

                                        {/* Left side */}
                                        <div className="w-full grow-0 flex flex-col gap-[12px]">
                                            <div>
                                                <CardFeatures
                                                    onClickFeatures={'/ftr/Catatan'}
                                                    heightCatatan={true}
                                                    descFeatures={'Buat catatan harian kamu disini'}
                                                    buttonFeatures={'Buat'}
                                                    nameFeatures={"Catatan"}
                                                    token={token}
                                                />
                                            </div>
                                            <div>
                                                <CardFeatures
                                                    onClickFeatures={'/ftr/Jurnal'}
                                                    heightJurnal={true}
                                                    descFeatures={'Tulis jurnal harian kamu disini'}
                                                    nameFeatures={"Jurnal"}
                                                    buttonFeatures={'Tulis'}
                                                />
                                            </div>
                                            <div>
                                                <CardFeatures
                                                    cardType2EBook={true}
                                                    onClickFeatures={'/ftr/Library'}
                                                    descFeatures={'Bacaan gratis'}
                                                    nameFeatures={"Library"}
                                                    buttonFeatures={'Baca'}
                                                />
                                            </div>
                                        </div>
                                        {/* Right side */}
                                        <div className="w-full grow-0 flex flex-col gap-[12px]">
                                            <div>
                                                <DateTimePlan />
                                            </div>
                                            <div>
                                                <CardFeatures
                                                    cardType2EBook={true}
                                                    heightKalender={true}
                                                    onClickFeatures={'/KalenderPlanner'}
                                                    descFeatures={'Sisipkan acara'}
                                                    nameFeatures={"Kalender Planner"}
                                                    buttonFeatures={'Tambah'}
                                                />
                                            </div>
                                            <div className={`w-full ${themeActive ? 'bg-[var(--black-card)]' : 'bg-[var(--white-bg-100)]'} text-white rounded-[8px] p-[12px]`} style={{ outline: themeActive ? "1px solid var(--black-bg)" : "1px solid var(--white-bg-200)" }}>
                                                <SisaHariToNewYear />
                                            </div>
                                            <div className="w-full">
                                                <Memo token={token} />
                                            </div>
                                        </div>
                                    </div>


                                    {/* PUBLICATIONS */}
                                    {/* <div className="mb-[60px]" style={{ borderTop: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)' }}> */}
                                    {/* Judul */}
                                    {/* <div className={`mt-[16px] flex flex-row items-center justify-between`}>
                                            <div className="flex flex-col gap-[4px]">
                                                <p className={`${themeActive ? 'text-white' : 'text-black'} font-[600] text-[12px] leading-[1]`}>
                                                    <span className="flex flex-row gap-[6px] items-center">
                                                        {artikelIcon}
                                                        Ruang Publik
                                                    </span>
                                                </p>

                                                <p className={`text-[var(--black-subtext)] text-[11px]`}>Baca pesan atau informasi dari warga JarJournal</p>
                                            </div> */}
                                    {/* <div onClick={HandleGoPublish}>
                                                <div className="w-[28px] h-[28px] flex flex-col items-center justify-center bg-[var(--white-bg-100)] rounded-[8px] cursor-pointer">
                                                    {plusIcon}
                                                </div>
                                            </div> */}
                                    {/* </div> */}

                                    {/* <div className="mt-[32px]" >
                                            <Publikasi token={token} />
                                        </div> */}
                                    {/* </div> */}
                                    <div>
                                        {publicDataUser.forEach(user => <p>{user.username}</p>)}
                                    </div>
                                </div>
                            </main>
                        </div>

                        {/* style={{opacity: animatePageMain ? '1' : '0'}}> */}
                        <div>
                            <footer style={{ position: "fixed", bottom: "54px", left: "0px", maxWidth: "42rem", height: 'fit-content', margin: 'auto', padding: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(163.5px)", transition: "transform 0.3s ease" }}>
                                <div className="w-full">
                                    <MusicBox />
                                </div>
                                <div className={`w-full h-[44px] p-[16px] ${themeActive ? "bg-[var(--bg-12)]" : "bg-stone-100"} `} style={{ borderTop: `1px solid ${themeActive ? 'var(--black-bg)' : 'var(--white-bg-200)'} ` }} onClick={() => setUserClickQuote((prev) => !prev)}>
                                    <UserQuote />
                                </div>
                            </footer>
                            <NavFooter />
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}