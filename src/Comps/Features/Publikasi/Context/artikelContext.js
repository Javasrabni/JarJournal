import useConfig from "antd/es/config-provider/hooks/useConfig";
import { createContext, useContext } from "react";
import { useState } from "react";

export const ArtikelContext = createContext()

export default function ArtikelProvider({children}) {
    // STATE
    const [publikasi, setPublikasi] = useState([])
    const [judulPublikasi, setJudulPublikasi] = useState('')
    const [newPublikasi, setNewPublikasi] = useState('')

    return (
        <ArtikelContext.Provider value={{publikasi, setPublikasi, newPublikasi, setNewPublikasi, judulPublikasi, setJudulPublikasi}}>
            {children}
        </ArtikelContext.Provider>
    )
}