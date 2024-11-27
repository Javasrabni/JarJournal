import { createContext } from "react";
import { useState } from "react";

export const ArtikelContext = createContext()

export default function ArtikelProvider({children}) {
    // STATE
    const [publikasi, setPublikasi] = useState([])
    const [newPublikasi, setNewPublikasi] = useState('')
    const [judulPublikasi, setJudulPublikasi] = useState('')

    return (
        <ArtikelContext.Provider value={{publikasi, setPublikasi, newPublikasi, setNewPublikasi, judulPublikasi, setJudulPublikasi}}>
            {children}
        </ArtikelContext.Provider>
    )
}