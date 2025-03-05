import { createContext, useEffect } from "react";
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL";
import { useContext } from "react";
import { useState } from "react";
export const JurnalContext = createContext()
export default function JurnalContextProvider({ children }) {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)

    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const [onWriteJurnal, setOnWriteJurnal] = useState(false) //OnWrite Jurnal state (Popup)
    const [outputDataUserJurnal, setOutputDataUserJurnal] = useState([])

    useEffect(() => {
        const GetUserJurnal = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/get/user_jurnal`, {
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setOutputDataUserJurnal(data)
                } else {
                    console.log(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        if (token) {
            GetUserJurnal()
        }
    }, [refreshData])

    // Produktifitas user
    const [valueProduktifitasUser, setValueProduktifitasUser] = useState(40)

    // STATE EMOT API
    const [emotOutput, setEmotOutput] = useState([])

    // GET EMOT LINK 
    useEffect(() => {
        const getEmotMood = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/get/emot_jurnal`, {
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setEmotOutput(data)
                }
            } catch (err) {
                console.error(err)
            }
        };
        getEmotMood();
    }, [refreshData]);

    const [selectedIdxJurnal, setSelectedIdxJurnal] = useState(() => {
        const saveData = localStorage.getItem('I21NNsj&as')
        return saveData ? JSON.parse(saveData) : null
    })

    useEffect(() => {
        localStorage.setItem('I21NNsj&as', JSON.stringify(selectedIdxJurnal))
    }, [selectedIdxJurnal])

    return (
        <JurnalContext.Provider value={{ selectedIdxJurnal, setSelectedIdxJurnal, emotOutput, setEmotOutput, valueProduktifitasUser, setValueProduktifitasUser, outputDataUserJurnal, setOutputDataUserJurnal, onWriteJurnal, setOnWriteJurnal }}>
            {children}
        </JurnalContext.Provider>
    )
}