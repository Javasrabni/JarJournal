import { createContext, useEffect } from "react";
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL";
import { useContext } from "react";
import { useState } from "react";
export const JurnalContext = createContext()
export default function JurnalContextProvider({ children }) {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const [onWriteJurnal, setOnWriteJurnal] = useState(false) //OnWrite Jurnal state (Popup)
    const [dataDayJournal, setDataDayJournal] = useState([])

    const GetUserJurnal = async () => {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/get-journal`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setDataDayJournal(data.userJournal)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        if (token) {
            GetUserJurnal()
        }
    }, [token, dataDayJournal])

    // Produktifitas user
    const [valueProduktifitasUser, setValueProduktifitasUser] = useState(40)

    // STATE EMOT API
    const [emotOutput, setEmotOutput] = useState([])

    return (
        <JurnalContext.Provider value={{ emotOutput, setEmotOutput, valueProduktifitasUser, setValueProduktifitasUser, dataDayJournal, setDataDayJournal, onWriteJurnal, setOnWriteJurnal }}>
            {children}
        </JurnalContext.Provider>
    )
}