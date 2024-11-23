import { useParams } from "react-router-dom"
import MusicBox from "../../Footer/musicBox/musicBox"
import UserQuote from "../../Footer/userQuote/userQuote"
import { useContext, useEffect, useState } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"
import { UserQuoteContext } from "../../Footer/userQuote/userQuoteContext"
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"
import PlusBtn from "../../Button/plus btn/plusBtn"
import { CatatanContext } from "./catatanContex"
import WriteNotePage from "./onNewNotePage/writeNotePage"

export default function Catatan() {
    const { id } = useParams()
    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)
    const { valueOnNewNote, setValueOnNewNote } = useContext(CatatanContext)
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)



    function HandleNewNote() {
        const delayPage = setTimeout(() => {
            setWriteingNote((prev) => !prev) // if true, it will change the page into writing page  
        }, 500)

        return () => clearTimeout(delayPage)
    }


    const { lastEdit, setLastEdit } = useContext(CatatanContext)

    function lastEditNote(param) {
        const lastEditNote = new Date(document.lastModified)
        const formatLastEditNote = lastEditNote.toLocaleString('id-ID', {
            year: '2-digit',
            day: "2-digit",
            hour: 'numeric',
            month: "2-digit"
        })
    }

    const lastModified = onNewNote.map((item)=> ({
        ...item, lastModified: lastEditNote()
    }))

    return (
        <>
            { }

            <div className="w-[360px] h-[90svh] flex jusitfy-center relative">
                {/* Main content */}
                <div className={`${themeActive ? "bg-black" : "bg-white"} flex flex-col gap-[12px] h-full p-[16px] text-white w-full`}>
                    {writeingNote ? (
                        <WriteNotePage />
                    ) : (
                        <>


                            {onNewNote.length < 1 ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className={`${themeActive ? "text-[var(--black-subtext)]" : "text-[--black-subtext]"} text-[10px]`}>Tidak ada catatan</p>
                                </div>
                            ) : (
                                <>
                                    {onNewNote.map((item, index) =>
                                        <div className={`${themeActive ? 'bg-[#262626]' : 'bg-stone-100'} w-full h-fit flex p-[12px] rounded-[6px] justify-between items-center cursor-pointer`}>
                                            <div className="flex flex-col gap-[0px]">
                                                <p key={index} className={`${themeActive ? "text-white" : "text-[#00000099]"} text-[12px] font-[600] `}>{item}</p>
                                                <p key={index} className="text-[10px] font-[500] text-[#999999]">{item}</p>
                                            </div>
                                            <div>
                                                <p className=" text-[10px] font-[500] text-[#999999]">12 Nov 202</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </>

                    )}

                    <div onClick={HandleNewNote}>
                        <PlusBtn
                            temaCatatan={true}

                        />

                    </div>

                </div>
            </div>
        </>
    )
}