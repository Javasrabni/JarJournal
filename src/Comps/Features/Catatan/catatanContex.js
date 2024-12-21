import { createContext, useContext, useState, useEffect } from "react";

export const CatatanContext = createContext()

export default function CatatanProvider({ children }) {
    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])

    const [writeingNote, setWriteingNote] = useState(false) // status page writing or not
    const [onEditNote, setOnEditNote] = useState(null);
    const [onEditNoteIndex, setOnEditNoteIndex] = useState(null);

    const [note, setNote] = useState(() => {
        const saveDraft = localStorage.getItem('draftNote')
        return saveDraft ? JSON.parse(saveDraft) : ''
    })

    const [removeDraft, setRemoveDraft] = useState(false)

    useEffect(() => {
        localStorage.setItem('draftNote', JSON.stringify(note))
    }, [note])

    // REMOVE DRAFT NOTE
    useEffect(() => {
        if (removeDraft) {
            localStorage.removeItem('draftNote')
        }
    }, [removeDraft])

    const [lastEdit, setLastEdit] = useState('')
    return (
        <CatatanContext.Provider value={{ removeDraft, setRemoveDraft, note, setNote, onEditNoteIndex, setOnEditNoteIndex, onEditNote, setOnEditNote, valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote, writeingNote, setWriteingNote, lastEdit, setLastEdit }}>
            {children}
        </CatatanContext.Provider >
    )
}