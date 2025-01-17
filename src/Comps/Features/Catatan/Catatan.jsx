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
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [token])



    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)


    const { valueOnNewNote, setValueOnNewNote } = useContext(CatatanContext)

    // STATE TO START WRITEING NOTE
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)
    useEffect(() => {
        setWriteingNote(false)
    }, [setWriteingNote])



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



    function HandleChangeNote(value, id) {
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

    // Handle note checkbox delete
    const [checkedNote, setCheckedNote] = useState([])
    const [onDelNote, setOnDelNote] = useState(false)

    function HandleCheckedNote(noteIdx) {
        if (checkedNote.includes(noteIdx)) {
            setCheckedNote(checkedNote.filter(item => item !== noteIdx))
        } else {
            setCheckedNote(prev => [...prev, noteIdx])
        }
    }

    async function HandleDelteCheckedNote() {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/delete-note`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ noteIndex: checkedNote })
            })

            if (response.ok) {
                const data = await response.json()
                setOnNewNote(data.note)
                setCheckedNote([])
                setOnDelNote(false)
            }
        } catch (err) {
            console.error(err)
        }
    }


    const delIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: onDelNote ? 'tomato' : 'var(--black-subtext)' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>

    const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-3.5" style={{ color: 'var(--black-subtext)' }}>
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
    </svg>




    return (
        <>
            <div className={`min-w-[360px] h-full ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'} flex jusitfy-center relative`}>
                {/* Main content */}
                <div className={`${themeActive ? "bg-[var(--bg-12)]" : "bg-white"} flex flex-col gap-[12px] h-full p-[16px] text-white w-full`}>
                    {writeingNote ? (
                        <WriteNotePage />
                    ) : (
                        <>
                            {onNewNote.length > 0 ? (
                                <div className="flex flex-col gap-[12px] pb-[40px]">

                                    <div className="w-full h-fit flex flex-col justify-center gap-[8px] mb-[16px]">
                                        {/* SEARCH NOTE */}
                                        <input type="text" placeholder="Cari catatan" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} w-full rounded-[8px]  p-[12px] outline-0 border-0 text-[12px]`} onChange={(e) => HandleChangeNote(e)} />
                                        {visibleFilteredValue && (
                                            <div>
                                                <p className="text-[12px] text-[#999999]">"{valueInputNote}" Tidak ada :/</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* TOTAL NOTE USER */}
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-[12px] text-[#999999] font-[600]">{onNewNote.length} Catatan</p>
                                        {onDelNote ? (
                                            // DEL NOTE
                                            <div className="flex flex-row gap-[12px] items-center cursor-pointer">
                                                <p className="text-white text-[12px]" onClick={() => setOnDelNote(false)}>Cancle</p>
                                                <span onClick={() => HandleDelteCheckedNote(checkedNote)}>{delIcon}</span>
                                            </div>
                                        ) : (
                                            <span className="cursor-pointer" onClick={() => setOnDelNote(prev => !prev)}> {delIcon}</span>
                                        )}
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
                                                <>
                                                    {onDelNote ? (
                                                        <div
                                                            key={index} // Use a unique identifier for the key
                                                            className={`${themeActive ? 'bg-[#262626]' : 'bg-stone-100'} w-full h-fit flex flex-row p-[12px] rounded-[6px] gap-[12px] cursor-pointer`}

                                                        >
                                                            <div className="flex items-center justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="rounded w-[14px] h-[14px] p-[6px]"
                                                                    // checked={checkedNote.includes(item.id)}
                                                                    onChange={() => HandleCheckedNote(index)}
                                                                />
                                                            </div>
                                                            <div>

                                                                <div className="flex flex-col gap-[0px]">
                                                                    <div
                                                                        id="outputCatatan"
                                                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} // Assuming item.content holds the note text
                                                                        onClick={() => HandleClickNote(item, index)} // Pass the item directly
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-[500] text-[#999999]">{item.timeStamp}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
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
                                                    )}
                                                </>
                                            ))}
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full min-h-[50svh] h-full flex flex-col items-center justify-center text-white">
                                    <span>
                                        <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737171008/Table_1_urpvlk.svg" alt="jurnal report icon" className="w-full h-full " />
                                    </span>
                                    <p className="text-[12px]">Ayo kita buat catatan pertamamu</p>
                                </div>
                            )}
                        </>
                    )}

                    <div onClick={HandleNewNote} >
                        {!writeingNote && (
                            <>
                                <span className={`fixed bottom-[32px] left-[50%] w-[calc(100%-32px)] p-[12px] bg-[var(--blue-clr)] flex items-center rounded-[12px] flex items-center justify-center translate-x-[-50%]`}>
                                    <p className="text-[12px] font-[600] text-white">Tambah</p>
                                </span>

                            </>
                            // <PlusBtn
                            //     temaCatatan={true}
                            // />
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}