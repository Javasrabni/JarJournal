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


export default function Home() {
    // Mobile Media Querry
    const MobileView = matchMedia(' (max-width: 600px) ')
    const navigate = useNavigate()

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Music box context
    const {statusMusicAxisY, setStatusMusicAxisY} = useContext(MusicBoxContext)

    return (
        <>
            {/* {MobileView.matches ? ( */}
            <div className="w-[360px] m-[auto] h-[100vh] flex justify-center bg-[#2a2a2a] ">
                <div className="max-mbl:w-[360px] max-mbl:h-full flex flex-col gap-[8px] bg-white justify-between">
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
                                    <div onClick={()=> navigate('/ftr/E-Book')}>
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
                                    <div className="w-full bg-[#08090a] text-white rounded-[8px] p-[12px]">
                                        <SisaHariToNewYear />
                                    </div>
                                    <div className="w-full">
                                        <Memo />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div>
                        <footer className="p-[0px] h-fit" style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(118px)", transition: "transform 0.3s ease" }} >
                            <div>
                                <MusicBox />
                            </div>
                            <div className="w-[360px] h-[44px] p-[16px] bg-black " style={{borderTop: "1px solid #262626"}} onClick={() => setUserClickQuote((prev) => !prev)}>
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
