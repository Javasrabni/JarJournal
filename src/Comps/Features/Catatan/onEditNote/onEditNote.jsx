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
        document.body.style.backgroundColor = themeActive ? 'black' : 'white'
    })

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

    async function handleSaveEdit() {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/update-note:id`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }, body: JSON.stringify({noteIndex: onEditNoteIndex, editedNote: onEditNote})
            })
            const data = await response.json()
            if(response.ok) {
                setOnNewNote((prevNote)=> prevNote.map((note, i) => (i === onEditNoteIndex ? data.updatedNote : note)))
                navigate('/ftr/Catatan')
            }
        } catch (err) {
            console.error(err)
        }
    }

    

    return (
        <div className={`w-[360px] h-[90lvh] ${themeActive ? 'bg-black' : 'bg-white'} flex jusitfy-center relative`}>
            <div className={`w-full h-full ${themeActive ? 'bg-black' : 'bg-white'} ${themeActive ? 'text-white' : 'text-black'} flex flex-col gap-[12px]`}>
                {/* TEKS EDITOR */}
                <div className="flex flex-col h-[100vh] ">
                    <ReactQuill
                        value={onEditNote}
                        onChange={setOnEditNote}
                        placeholder="Tulis catatan disini"
                        style={{
                            border: 'none',
                            outline: 'none',
                            height: "100%",
                            zIndex: '9',
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
                <div className="w-fit fixed bottom-[0px] right-[50%] m-auto flex flex-row-reverse items-center justify-center gap-[12px] z-[10] pb-[16px]" style={{ transform: 'translateX(50%)' }}>
                    <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-right`} onClick={handleSaveEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>

                    <div className={`w-[40px] h-[40px] rounded-[50px] ${themeActive ? 'bg-white' : 'bg-black'} flex items-center justify-center cursor-pointer float-left`} onClick={() => navigate('/ftr/Catatan')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: themeActive ? 'black' : 'white' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                    </div>
                </div>
            </div >
        </div>
    )
}