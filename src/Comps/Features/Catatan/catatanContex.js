import { createContext, useContext, useState } from "react";

export const CatatanContext = createContext()

export default function CatatanProvider({ children }) {
    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])

    const [writeingNote, setWriteingNote] = useState(false) // status page writing or not
    const [onEditNote, setOnEditNote] = useState(null);
    const [onEditNoteIndex, setOnEditNoteIndex] = useState(null);

    const [lastEdit, setLastEdit] = useState('')
    return (
        <CatatanContext.Provider value={{ onEditNoteIndex, setOnEditNoteIndex, onEditNote, setOnEditNote, valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote, writeingNote, setWriteingNote, lastEdit, setLastEdit }}>
            {children}
        </CatatanContext.Provider >
    )
}