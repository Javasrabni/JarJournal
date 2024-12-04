import { useContext, useEffect, useState } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import { WriteNoteContext } from "./writeNoteContext"
import { useRef } from "react"
import { CatatanContext } from "../catatanContex"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function WriteNotePage() {
    const { themeActive } = useContext(ThemeAppContext)
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    console.log(token, 'NGENTOT')

    // status page writing or not
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)
    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)

    const [note, setNote] = useState('')
    function HandleChange(value) {
        setNote(value)
    }
    const [onChangeNote, setOnChangeNote] = useState('')

    const POST_NOTE_USER = async () => {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/save-note`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ catatan: note })
            })

            if (response.ok) {
                // alert('berhasil tambah')
                const { catatan } = await response.json()
                setOnNewNote((prev) => [catatan, ...prev])
                setWriteingNote((prev) => !prev)
            }
        } catch (err) {
            console.error(err)
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

    return (
        <div className={`w-full h-full ${themeActive ? 'bg-black' : 'bg-white'} ${themeActive ? 'text-white' : 'text-black'} flex flex-col gap-[12px]`}>
            {/* TEKS EDITOR */}
            <div className="flex flex-col h-[100vh] ">
                <ReactQuill
                    value={note}
                    onChange={HandleChange}
                    placeholder="Tulis catatan disini"
                    
                    style={{
                        border: 'none',
                        outline: 'none',
                        height: "100%",
                        zIndex: '9',
                        color: 'red'
                    }}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline'], // Bold dan Underline
                            ['clean'], // Tombol untuk menghapus format
                            ['code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }]
                        ],
                    }}
                    formats={[
                        'header', // Allow headers
                        'bold',   // Allow bold text
                        'italic', // Allow italic text
                        'underline', // Allow underlined text
                        'list',   // Allow lists
                        'bullet', // Allow bullet lists
                        'code-block' // Allow code blocks
                    ]}
                />
            </div>
            {/* ON ADD */}
            <div className="w-fit fixed bottom-[0px] right-[50%] m-auto flex flex-row-reverse items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{transform: 'translateX(50%)'}}>
                <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-right`} onClick={POST_NOTE_USER}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>

                <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-left`} onClick={()=> setWriteingNote((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                </div>
            </div>
        </div >
    )
}