import { createContext, useEffect, useState } from "react";

export const WriteNoteContext = createContext()

export default function WriteNoteProvider({children}) {
    const [valueEditableDiv, setValueEditableDiv] = useState(()=> {
        const saveValueEditable = localStorage.getItem('saveNoteEditable')
        return saveValueEditable ? JSON.parse(saveValueEditable) : ''
    })

    useEffect(()=> {
        localStorage.setItem('saveNoteEditable', JSON.stringify(valueEditableDiv))
    }, [valueEditableDiv])

    const [boldStatus, setBoldStatus] = useState(false)

    return (
        <WriteNoteContext.Provider value={{valueEditableDiv, setValueEditableDiv, boldStatus, setBoldStatus}}>
            {children}
        </WriteNoteContext.Provider>
    )
}