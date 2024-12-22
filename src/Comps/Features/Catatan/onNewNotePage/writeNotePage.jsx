import { useContext, useEffect, useState } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import { WriteNoteContext } from "./writeNoteContext"
import { useRef } from "react"
import { CatatanContext } from "../catatanContex"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import '../style.css'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function WriteNotePage() {
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--bg-12)' : 'white'
    }, [])

    // status page writing or not
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)
    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)

    const { note, setNote } = useContext(CatatanContext)

    const [onChangeNote, setOnChangeNote] = useState('')

    const { removeDraft, setRemoveDraft } = useContext(CatatanContext)

    const POST_NOTE_USER = async () => {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/save-note`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ catatan: note })
            })
            const data = await response.json()
            if (response.ok) {
                // alert('berhasil tambah')
                setOnNewNote((prev) => [{ content: data.content, timeStamp: data.timeStamp }, ...prev])
                setWriteingNote((prev) => !prev)
                setNote('')

                // REMOVE DRAFT NOTE
                setRemoveDraft((prev) => !prev)
            }
        } catch (err) {
            console.error(err + "Error add note")
        }
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000'] }],
            ['link', 'image'],
        ],
    };

    // Kalkulasi posisi bottom pada format text quill js
    const [bottomFormaterQuill, setBottomFormaterQuill] = useState(0)
    const currentHeight = window.innerHeight
    const heightViewPort = window.screen.height

    useEffect(() => {
        const handleResizeHeight = () => {
            const kalkulasiPosisiBottom = heightViewPort - currentHeight
            setBottomFormaterQuill(kalkulasiPosisiBottom)
        }

        window.addEventListener('resize', handleResizeHeight)

        return () => { window.removeEventListener('resize', handleResizeHeight) }
    })

    console.log(bottomFormaterQuill)


    return (
        <div className={`w-full h-full ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'} ${themeActive ? 'text-white' : 'text-black'} flex flex-col gap-[12px]`}>
            {/* TEKS EDITOR */}
            <div className="flex flex-col h-[100vh] ">
                <ReactQuill
                    className="custom-quill"
                    theme="snow"
                    value={note}
                    onChange={setNote}
                    placeholder="Tulis catatan disini"

                    style={{
                        border: 'none',
                        outline: 'none',
                        height: "100%",
                        zIndex: '9',
                        color: 'white'
                    }}
                    modules={{
                        toolbar: [
                            // [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline'], // Bold dan Underline
                            // ['clean'], // Tombol untuk menghapus format
                            // ['code-block'],
                            // [{ list: 'ordered' }, { list: 'bullet' }]
                        ],
                    }}
                    formats={[
                        // 'header', // Allow headers
                        'bold',   // Allow bold text
                        'italic', // Allow italic text
                        'underline', // Allow underlined text
                        // 'list',   // Allow lists
                        // 'bullet', // Allow bullet lists
                        // 'code-block' // Allow code blocks
                    ]}
                />
            </div>

            {/* ON ADD */}
            {note.length > 1 && (
                <div className="w-fit fixed top-[16px] right-[32px] m-auto flex flex-row-reverse items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{ transform: 'translateX(50%)' }}>

                    {/* TYPE 2 CHECKLIST */}
                    {/* <div className="w-fit fixed bottom-[54px] right-[1%] m-auto flex flex-row-reverse items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{ transform: 'translateX(50%)' }}> */}

                    {/* POST NOTE */}
                    <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-transparent' : 'bg-transparent'} flex items-center justify-center cursor-pointer float-right`} onClick={POST_NOTE_USER}>

                        {/* TYPE 2 CHECKLIST */}
                        {/* <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-right`} onClick={POST_NOTE_USER}> */}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'white' : 'black' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>

                    {/* TURN BACK PAGE */}
                    {/* <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-left`} onClick={() => setWriteingNote((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </div> */}
                </div>
            )}
        </div>
    )
}