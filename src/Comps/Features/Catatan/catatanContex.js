import { createContext, useContext, useState } from "react";

export const CatatanContext = createContext()

export default function CatatanProvider({children}) {
    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])

    const [writeingNote, setWriteingNote] = useState(false) // status page writing or not
    return (
        <CatatanContext.Provider value={{valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote, writeingNote, setWriteingNote}}>
            {children}
        </CatatanContext.Provider>
    )
}