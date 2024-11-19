import { useParams } from "react-router-dom"
import MusicBox from "../../Footer/musicBox/musicBox"
import UserQuote from "../../Footer/userQuote/userQuote"
import { useContext, useState } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"
import { UserQuoteContext } from "../../Footer/userQuote/userQuoteContext"
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"

export default function Catatan() {
    const { id } = useParams()
    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Note array
    const [onNewNote, setOnNewNote] = useState([])
    const [valueOnNewNote, setValueOnNewNote] = useState()
    
    return (
        <div className="w-[360px] h-[100vh] margin-auto">
            {/* Main content */}
            <div className={`bg-${themeActive ? "black" : "white"} flex flex-row gap-[12px] justify-between h-full p-[16px]`}>
                <div className="w-full flex flex-col gap-[12px] grow-0">

                    {/* Card to add new note */}
                    <div className={`w-[158px] h-[120px] ${themeActive ? 'bg-[#08090A]' : 'bg-stone-100'} rounded-[8px] p-[12px] flex flex-col gap-[8px] items-center justify-center text-${themeActive ? "[#999999]" : "[#999999]"} cursor-pointer outline outline-1 ${themeActive ? 'outline-[#1e1f1f]' : 'outline-slate-200'}`}>
                        <div className="flex flex-col jusitfy-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className={`text-[10px] `}>Catatan baru</p>
                        </div>
                    </div>

                    <p></p>
                </div>
                <div>
                    <p></p>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="p-[0px] h-fit" style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(118px)", transition: "transform 0.3s ease" }}>
                <div>
                    <MusicBox />
                </div>
                <div className="w-[360px] h-[44px] p-[16px] bg-black " style={{ borderTop: "1px solid #262626" }} onClick={() => setUserClickQuote((prev) => !prev)}>
                    <UserQuote />
                </div>
            </footer> */}
        </div>
    )
}