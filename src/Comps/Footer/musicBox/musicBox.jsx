import { useContext, useEffect, useState } from "react"
import { MusicBoxContext } from "./musicBoxContext"
import CountTime from "./countTime"
import { p } from "framer-motion/client"
import { useNavigate } from "react-router-dom"
import ToggleDarkMode from "../../Features/Theme/toggleTheme.jsx/toggleModeTheme"
import { ThemeAppContext } from "../../Features/Theme/toggleTheme.jsx/ThemeAppContext"
import PopupLegend from "../../Popup/Popup-typ1/PopupLegend"
import { transform } from "framer-motion"

export default function MusicBox() {
    const navigate = useNavigate()

    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)

    const [musicData, setMusicData] = useState(null)
    const musicPlay = async () => {
        try {
            const response = await fetch('https://668e29d6bf9912d4c92d0971.mockapi.io/api/ListRecp/JarJournal')
            if (!response.ok) {
                throw new Error(`HTTP ERROR, Status: ${response.status}`)
            }

            const data = await response.json()
            setMusicData(data)
        } catch (error) {
            console.error('Error mendapat API', error)
        }
    }

    useEffect(() => {
        musicPlay()
    }, [])

    const musicIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
    </svg>

    const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>

    const bgMusicBox01 = {
        backgroundImage: 'url(/Assets/background/bg03.jpg)',
        backgroundSize: 'cover',
        outline: "rgb(38, 38, 38) solid 1px"
    }
    const bgMusicBox02 = {
        backgroundImage: 'url(/Assets/background/bg04.jpg)',
        backgroundSize: 'cover',
        outline: "rgb(38, 38, 38) solid 1px"
    }

    const [musicBoxDiv, setMusicBoxDiv] = useState([
        {
            M1: "Music Box 01",
            Box: <div className="w-[52px] h-[52px] bg-[#262626] flex items-center justify-center" style={{ ...bgMusicBox01, borderRadius: "50px" }}>
                {/* {musicIcon} */}
                <p className="text-[10px] font-[600]">Calm</p>
            </div>
        },
        {
            M1: "Music box 02",
            Box: <div className="w-[52px] h-[52px] bg-[#262626] flex items-center justify-center" style={{ ...bgMusicBox02  , borderRadius: "50px" }}>
                {/* {musicIcon} */}
                <p className="text-[10px] font-[600]">Energic</p>
            </div>
        },

    ])

    const displayedMusicBox = musicBoxDiv.slice(0, 2);

    const bgScreenTime = '/Assets/background/bg01.jpg'

    const bgStyle = {
        backgroundImage: `url(${bgScreenTime})`,
        backgroundSize: "cover",

    }

    // Theme app
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    
    // Popup Music Box
    const {statePopupInfo, setStatePopupInfo} = useContext(MusicBoxContext)



    return (
        <>
            

            {/* Music box */}
            <div className="flex w-full h-fit justify-end" style={{paddingRight: "12px"}}>
                <ToggleDarkMode />
            </div>
            <div className="flex flex-col items-center" >
                {/* Button to pull up/down */}
                <div className={`flex justify-center items-center w-[52px] h-[14px] bg-black text-white cursor-pointer`} style={{ borderRadius: "10px 10px 0px 0px", borderBottom: themeActive ? "none" : "1px solid #262626", borderTop: themeActive ? "1px solid rgb(38, 38, 38)" : "none"}} onClick={() => setStatusMusicAxisY((prev) => !prev)}>
                    {statusMusicAxisY ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    )}
                </div>
                {/* Music */}
                <div className={`w-[360px] h-[120px] bg-black p-[16px] text-white`} style={{borderTop: themeActive ? "1px solid rgb(38, 38, 38)" : "none"}}>
                    <div>
                        <div className="flex flex-col gap-[6px]">
                            <div className="flex flex-row justify-between items-center" >
                                <div className="flex flex-row gap-[6px] items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3" style={{ color: "yellow", filter: "drop-shadow(0px 0px 3px gold)" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                    </svg>
                                    <p className="text-[12px] font-[700]">Brain Focus</p>
                                </div>

                                <div className="flex flex-row items-center gap-[4px] cursor-pointer" onClick={()=> setStatePopupInfo((prev) => !prev)}>
                                    {infoIcon}
                                    <p className="text-[10px] font-[600]">Info</p>
                                </div>
                            </div>
                            <div className="w-full h-[74px] gap-[0px] flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-[8px]">
                                    {displayedMusicBox.map((item, index) =>
                                        <div key={index}>
                                            {item.Box}
                                        </div>
                                    )}
                                </div>
                                <div className="cursor-pointer">
                                    {/* {musicData && musicData.length > 1 ? (
                                        <p style={{color: "red"}}>{musicData[0].focusMusic[0].name}</p>
                                    ) : (
                                        <p>loading...</p>
                                    )} */}
                                    <CountTime />
                                </div>
                                <div className="w-[120px] h-[52px] bg-[#262626] rounded-[8px] p-[12px] flex justify-center items-center cursor-pointer" style={{ ...bgStyle, outline: "1px solid rgb(38, 38, 38)" }} onClick={()=> navigate('/BrainFocus')}>
                                    <div className="flex flex-row justify-center items-center gap-[8px]">
                                        <p className="text-[10px] font-[600]">Buka layar</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}