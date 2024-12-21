import { useLocation, useParams } from "react-router-dom"
import MusicBox from "../../Footer/musicBox/musicBox"
import UserQuote from "../../Footer/userQuote/userQuote"
import { useContext, useEffect, useState } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"
import { UserQuoteContext } from "../../Footer/userQuote/userQuoteContext"
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"
import PlusBtn from "../../Button/plus btn/plusBtn"
import { CatatanContext } from "./catatanContex"
import WriteNotePage from "./onNewNotePage/writeNotePage"
import { useNavigate } from "react-router-dom"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { UseEditNoteContext } from "./onEditNote/onEditNContext"

import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import './style.css'

export default function Catatan() {
    const navigate = useNavigate()
    const locations = useLocation()

    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--bg-12)' : 'white'
    }, [])

    const { id } = useParams()
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)

    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { userEmail, setUserEmail } = useContext(API_URL_CONTEXT)
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [token])

    // FETCHING GET USER INFO
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/user-info`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setUsername(data.username)
                    setUserEmail(data.email)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (token) {
            fetchUserInfo()
        }
    }, [])

    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)

    console.log(onNewNote)
    const { valueOnNewNote, setValueOnNewNote } = useContext(CatatanContext)

    // STATE TO START WRITEING NOTE
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)
    useEffect(() => {
        setWriteingNote(false)
    }, [setWriteingNote])

    // FETCHING GET USER NOTE
    const FetchDataNote = async () => {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/get-note`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setOnNewNote(data.note || [])
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (token) {
            FetchDataNote()
        }
    }, [token, writeingNote])

    // NEW NOTE
    function HandleNewNote() {
        const delayPage = setTimeout(() => {
            setWriteingNote((prev) => !prev) // if true, it will change the page into writing page  
        }, 500)

        return () => clearTimeout(delayPage)
    }

    const { onEditNote, setOnEditNote } = UseEditNoteContext()
    const { onEditNoteIndex, setOnEditNoteIndex } = UseEditNoteContext()
    function HandleClickNote(item, index) {
        console.log("Editing note:", item); // Debugging line
        setOnEditNote(item.content); // Set the note content to be edited
        setOnEditNoteIndex(index); // Assuming item.id is the unique identifier for the note
        console.log("Note ID set to:", index); // Debugging line
        navigate('/ftr/EditCatatan');
    }

    const [filteredNote, setFilteredNote] = useState([])
    const [valueInputNote, setValueInputNote] = useState('')
    const [visibleFilteredValue, setVisibleFilteredValue] = useState(false)

    function HandleChangeNote(value) {
        const userInputSearch = value.target.value.toLowerCase();
        setValueInputNote(userInputSearch) // ValueInput sementara

        if (userInputSearch === '') {
            setFilteredNote(onNewNote)
            setVisibleFilteredValue(false)
        } else {
            const delayOutput = setTimeout(() => {
                const filterNote = onNewNote.filter(item =>
                    item.content.includes(userInputSearch)
                )
                if (filterNote.length < 1) {
                    setVisibleFilteredValue(true)
                } else {
                    setVisibleFilteredValue(false)
                }

                setFilteredNote(filterNote)
            }, 300)

            return () => clearTimeout(delayOutput)
        }

    }



    // const lastModified = onNewNote.map((item)=> ({
    //     ...item, lastModified: lastEditNote()
    // }))

    return (
        <>
            <div className={`w-[360px] h-full ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'} flex jusitfy-center relative`}>
                {/* Main content */}
                <div className={`${themeActive ? "bg-[var(--bg-12)]" : "bg-white"} flex flex-col gap-[12px] h-full p-[16px] text-white w-full`}>
                    {writeingNote ? (
                        <WriteNotePage />
                    ) : (
                        <>
                            {onNewNote.length >= 1 ? (
                                <div className="flex flex-col gap-[12px] pb-[40px]">

                                    <div className="w-full h-fit flex flex-col justify-center gap-[8px] mb-[16px]">

                                        <input type="text" placeholder="Cari catatan" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} w-full rounded-[8px]  p-[12px] outline-0 border-0 text-[12px]`} onChange={(e) => HandleChangeNote(e)} />
                                        {visibleFilteredValue && (
                                            <div>
                                                <p className="text-[12px] text-[#999999]">"{valueInputNote}" Tidak ada :/</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* TOTAL NOTE USER */}
                                    <div>
                                        <p className="text-[12px] text-[#999999] font-[600]">{onNewNote.length} Catatan</p>
                                    </div>

                                    {/* TAMPILKAN NOTE USER JIKA FILTER = TRUE */}
                                    {filteredNote.length >= 1 ? (
                                        <>
                                            {filteredNote.map((item, index) => (
                                                <div
                                                    key={index} // Use a unique identifier for the key
                                                    className={`${themeActive ? 'bg-[#262626]' : 'bg-stone-100'} w-full h-fit flex flex-col p-[12px] rounded-[6px] justify-between gap-[8px] cursor-pointer`}
                                                    onClick={() => HandleClickNote(item, index)} // Pass the item directly
                                                >
                                                    <div className="flex flex-col gap-[0px]">
                                                        <div
                                                            id="outputCatatan"
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} // Assuming item.content holds the note text
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-[500] text-[#999999]">{item.timeStamp}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {onNewNote.map((item, index) => (
                                                <div
                                                    key={index} // Use a unique identifier for the key
                                                    className={`${themeActive ? 'bg-[#262626]' : 'bg-stone-100'} w-full h-fit flex flex-col p-[12px] rounded-[6px] justify-between gap-[8px] cursor-pointer`}
                                                    onClick={() => HandleClickNote(item, index)} // Pass the item directly
                                                >
                                                    <div className="flex flex-col gap-[0px]">
                                                        <div
                                                            id="outputCatatan"
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} // Assuming item.content holds the note text
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-[500] text-[#999999]">{item.timeStamp}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full h-[90vh] flex items-center justify-center">
                                    <p className={`${themeActive ? "text-[var(--black-subtext)]" : "text-[--black-subtext]"} text-[10px]`}>Tidak ada catatan</p>
                                </div>
                            )}
                        </>
                    )}

                    <div onClick={HandleNewNote}>
                        {!writeingNote && (
                            <PlusBtn
                                temaCatatan={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}