import { createContext, useContext, useState } from "react";

export const CatatanContext = createContext()

export default function CatatanProvider({children}) {
    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])
    return (
        <CatatanContext.Provider value={{valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote}}>
            {children}
        </CatatanContext.Provider>
    )
}