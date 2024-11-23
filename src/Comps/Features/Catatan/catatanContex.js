import { createContext, useContext, useState } from "react";

export const CatatanContext = createContext()

export default function CatatanProvider({children}) {
    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])

    const [writeingNote, setWriteingNote] = useState(false) // status page writing or not

    const [lastEdit, setLastEdit] = useState('')
    return (
        <CatatanContext.Provider value={{valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote, writeingNote, setWriteingNote, lastEdit, setLastEdit}}>
            {children}
        </CatatanContext.Provider>
    )
}