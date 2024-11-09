import Header from "./Comps/Navbar-Top/Header"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"

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

import { motion } from 'framer-motion'

// Theme App
import { ThemeAppContext } from "./Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"

export default function Home() {
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


    return (
        <>
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
                            Deskripsi={'Memungkinkan anda untuk fokus pada pekerjaan anda, dengan Timer dan musik yang tersedia.'}
                        />
                    </motion.div>
                    <div className="z-[1] w-full h-full bg-[#00000080] fixed" onClick={() => setStatePopupInfo((prev) => !prev)} />
                </div>
            )}

            {/* {MobileView.matches ? ( */}
            <div className="w-[360px] m-[auto] h-[100vh] flex justify-center bg-[#2a2a2a] ">
                <div className={`w-[360px] h-full flex flex-col gap-[8px] bg-${themeActive ? "black" : "white"} justify-between`}>
                    <div>
                        <header>
                            <Header />
                        </header>
                        <main className="p-[16px] h-full">
                            <div className="flex flex-row gap-[12px] justify-between">
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
                                            onClickFeatures={'/ftr/Jurnal'}
                                        />
                                    </div>
                                </div>
                                {/* Right side */}
                                <div className="w-full grow-0 flex flex-col gap-[12px]">
                                    <div>
                                        <DateTimePlan />
                                    </div>
                                    <div className="w-full bg-[#08090a] text-white rounded-[8px] p-[12px]" style={{ outline: themeActive ? "1px solid rgb(38, 38, 38)" : "none" }}>
                                        <SisaHariToNewYear />
                                    </div>
                                    <div className="w-full">
                                        <Memo />
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
                    <div>
                        <footer className="p-[0px] h-fit" style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(118px)", transition: "transform 0.3s ease" }}>
                            <div>
                                <MusicBox />
                            </div>
                            <div className="w-[360px] h-[44px] p-[16px] bg-black " style={{ borderTop: "1px solid #262626" }} onClick={() => setUserClickQuote((prev) => !prev)}>
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

// Lokasi path fitur aplikasi
export const featuresPath = [
    { id: "1", nameFeatures: "Catatan" },
    { id: "2", nameFeatures: "Jurnal" },
    { id: "3", nameFeatures: "rabbani" }
]
