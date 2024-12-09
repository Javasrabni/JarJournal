import { createContext, useContext, useState } from "react";

const OnEditNoteContext = createContext() 
export default function OnEditNoteProvider({children}) {
    const [onEditNote, setOnEditNote] = useState('')
    const [onEditNoteIndex, setOnEditNoteIndex] = useState('')

    return (
        <OnEditNoteContext.Provider value={{onEditNote, setOnEditNote, onEditNoteIndex, setOnEditNoteIndex}}>
            {children}
        </OnEditNoteContext.Provider>
    )
}

export const UseEditNoteContext = ()=> useContext(OnEditNoteContext)