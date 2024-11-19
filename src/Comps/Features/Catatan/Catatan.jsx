import { useParams } from "react-router-dom"
import MusicBox from "../../Footer/musicBox/musicBox"
import UserQuote from "../../Footer/userQuote/userQuote"
import { useContext, useEffect, useState } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"
import { UserQuoteContext } from "../../Footer/userQuote/userQuoteContext"
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"
import PlusBtn from "../../Button/plus btn/plusBtn"

export default function Catatan() {
    const { id } = useParams()
    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Note array
    const [onNewNote, setOnNewNote] = useState([])

    useEffect(() => {
        const array = ['asdas', 'asdasd', 'asdasd']
        setOnNewNote(array)
    }, [])

    const [valueOnNewNote, setValueOnNewNote] = useState()

    return (
        <div className="w-[360px] h-[90svh] flex jusitfy-center relative">
            {/* Main content */}
            <div className={`bg-${themeActive ? "black" : "white"} flex flex-col gap-[12px] h-fit p-[16px] text-white w-full`}>
                {onNewNote.map((item, index) =>
                    <div className={`${themeActive ? 'bg-[#262626]' : 'bg-stone-100'} w-full h-fit flex p-[12px] rounded-[6px] justify-between items-center cursor-pointer`}>
                        <div className="flex flex-col gap-[0px]">
                            <p key={index} className={`${themeActive ? "text-white" : "text-[#00000099]"} text-[12px] font-[600] `}>{item}</p>
                            <p key={index} className="text-[10px] font-[500] text-[#999999]">{item}</p>
                        </div>
                        <div>
                            <p className=" text-[10px] font-[500] text-[#999999]">12 november 2024</p>
                        </div>
                    </div>
                )}

                <PlusBtn />

            </div>
        </div>
    )
}