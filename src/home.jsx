import Header from "./Comps/Navbar-Top/Header"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"

import Catatan from "./Comps/Features/Catatan/Catatan"
import Jurnal from "./Comps/Features/Jurnal/Jurnal"
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
import LoginPage from "./Auth/loginPage/loginPage"

import { motion } from 'framer-motion'

// Theme App
import { ThemeAppContext } from "./Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import AuthPage from "./Auth/authPage"
import RegisterPage from "./Auth/registerPage/registerPage"

export default function Home() {
    // Smooth render page
    const { animatePageMain, setAnimatePageMain } = useContext(AnimateLoadPageContext)
    useEffect(() => {
        window.addEventListener('beforeunload', setAnimatePageMain(true))
        return () => {
            window.removeEventListener('beforeunload', setAnimatePageMain(false))
        }
    }, [])


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

    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // MusicBox
    const { statePopupInfo, setStatePopupInfo } = useContext(MusicBoxContext)
    const { popupReset, setPopupReset } = useContext(MusicBoxContext)



    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Hapus token
        setToken(null); // Set token menjadi null untuk memaksa user login ulang
    };

    return (
        <>

            {!token ? (
                    <LoginPage setToken={setToken} />
            ) : (
                <>
                    {token ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <AuthPage />
                    )}
                    < p > Welcome! Your token: {token}</p>
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
                    <div className={`w-[360px] m-[auto] h-[100lvh] flex justify-center ${themeActive ? 'bg-black' : 'bg-white'}`} style={{ paddingBottom: '60px' }}>
                        <div className={`w-[360px] h-full flex flex-col gap-[8px] bg-${themeActive ? "black" : "white"} justify-between`}>
                            <div>
                                <header>
                                    <Header token={token} />
                                </header>
                                <main className="p-[16px] h-full" style={{ opacity: animatePageMain ? '1' : '0', backgroundColor: themeActive ? 'black' : 'white' }}>
                                    <div className="flex flex-row gap-[12px] justify-between w-full h-full">
                                        {/* Left side */}
                                        <div className="w-full grow-0 flex flex-col gap-[12px]">
                                            <div>
                                                <CardFeatures
                                                    onClickFeatures={'/ftr/Catatan'}
                                                    heightCatatan={true}
                                                    descFeatures={'Buat catatan harian kamu disini'}
                                                    buttonFeatures={'Buat'}
                                                    nameFeatures={"Catatan"}
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
                                            <div>
                                                {/* <div className="w-fit p-[6px] h-[24px] bg-[#f7f7f7] rounded-[4px] flex items-center justify-center">
                                            <span className="flex flex-row gap-[8px] items-center">
                                                {downloadIcon}
                                                <p className="text-[10px]">Download App</p>
                                            </span>
                                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>

                            {/* style={{opacity: animatePageMain ? '1' : '0'}}> */}
                            <div>
                                <footer className="p-[0px] h-fit" style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(118px)", transition: "transform 0.3s ease" }}>
                                    <div>
                                        <MusicBox />
                                    </div>
                                    <div className={`w-[360px] h-[44px] p-[16px] ${themeActive ? "bg-black" : "bg-stone-100"} `} style={{ borderTop: `1px solid ${themeActive ? 'var(--black-bg)' : 'var(--white-bg-200)'} ` }} onClick={() => setUserClickQuote((prev) => !prev)}>
                                        <UserQuote />
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    {/* ) : (
                <div>
                    <p>Desktop will avaliable</p>
                </div>
            )} */}


                </>

            )
            }

        </>
    )
}

// Lokasi path fitur aplikasi
export const featuresPath = [
    { id: "1", nameFeatures: "Catatan" },
    { id: "2", nameFeatures: "Jurnal" },
    { id: "3", nameFeatures: "rabbani" }
]
