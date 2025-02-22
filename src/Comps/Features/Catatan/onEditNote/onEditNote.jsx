import { useContext, useEffect, useState } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import { CatatanContext } from "../catatanContex"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { UseEditNoteContext } from "./onEditNContext"
import { useNavigate } from "react-router-dom"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function OnEditNote({ dataNote, indexNote }) {
    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--bg-12)' : 'white'
    }, [])

    const navigate = useNavigate()
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])


    // status page writing or not
    const { writeingNote, setWriteingNote } = useContext(CatatanContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)

    // EDIT VALUE NOTE STATE
    const { onEditNote, setOnEditNote } = UseEditNoteContext()
    const { onEditNoteIndex, setOnEditNoteIndex } = UseEditNoteContext()

    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)


    async function handleSaveEdit() {
        try {
            const response = await fetch(`${API_URL_NOTE}/patch/catatan_user`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ noteIndex: onEditNoteIndex, editedNote: onEditNote })
            })
            const data = await response.json()
            console.log(data + "INI RETURN JSON EDIT PUT")
            if (response.ok) {
                setRefreshData(prev => !prev)
                // setOnNewNote((prevNote) => prevNote.map((note, index) => index === onEditNoteIndex ? { content: updatedNote, timeStamp: updatedTimestamp } : note))
                navigate('/ftr/Catatan')
            }
        } catch (err) {
            console.error(err)
        }
    }



    return (
        <div className={`w-full h-full ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'} ${themeActive ? 'text-white' : 'text-black'} flex flex-col gap-[12px] p-[16px]`}>
            {/* TEKS EDITOR */}
            <div className="flex flex-col h-[100vh] ">
                <ReactQuill
                    className="custom-quill"
                    theme="snow"
                    value={onEditNote}
                    onChange={setOnEditNote}
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
            {onEditNote.length > 1 && (
                <div className="w-fit fixed top-[16px] right-[32px] m-auto flex flex-row-reverse items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{ transform: 'translateX(50%)' }}>

                    {/* TYPE 2 CHECKLIST */}
                    {/* <div className="w-fit fixed bottom-[54px] right-[12%] m-auto flex flex-row items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{ transform: 'translateX(50%)' }}> */}

                    {/* SAVE EDITED NOTE BTN */}
                    <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-transparent' : 'bg-transparent'} flex items-center justify-center cursor-pointer float-right`} onClick={handleSaveEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'white' : 'black' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>

                    {/* BACK BTN */}
                    {/* <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-left`} onClick={() => navigate('/ftr/Catatan')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                    </div> */}
                </div>
            )}
        </div>
    )
}