import { createContext, useEffect, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({ children }) {
    // ENDPOINT PATH
    const [MainDomain] = useState('https://jarjournal.cloud')
    const [API_URL_AUTH] = useState('https://15l60w0p-8002.asse.devtunnels.ms/')
    const [API_URL_PUB] = useState('https://15l60w0p-8002.asse.devtunnels.ms/')
    const [API_URL_NOTE] = useState('https://15l60w0p-8002.asse.devtunnels.ms/')
    const [API_URL_CHATBOT] = useState('https://15l60w0p-8002.asse.devtunnels.ms/')
    // const [API_URL_AUTH] = useState('http://localhost:8000')
    // const [API_URL_PUB] = useState('http://localhost:8000')
    // const [API_URL_NOTE] = useState('http://localhost:8000')
    // const [API_URL_CHATBOT] = useState('http://localhost:8000')

    // USER TOKEN
    const [token, setToken] = useState(() => localStorage.getItem('token'))

    // FETCH USER INFO
    const [username, setUsername] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    const [refreshData, setRefreshData] = useState(false)
    const [refreshDataMemo, setRefreshDataMemo] = useState(false)

    // STATUS AUTH FORM
    const [isRegister, setIsRegister] = useState(false);

    // FETCHING GET DATA PUBLIC USER
    const [publicDataUser, setPublicDataUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/user_info`, {
                    method: "GET",
                    keepalive: true,
                    headers: {
                        'Connection': 'keep-alive',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setUsername(data.username)
                    setUserId(data.id)
                    setUserEmail(data.email)
                    setIsLoading(false)
                }
            } catch (err) {
                console.error(err)
                setIsLoading(true)
            }
        }
        getDataUser()
    }, [refreshData])


    useEffect(() => {
        const getPublicDataUser = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${API_URL_AUTH}/get/public_userData`, {
                    keepalive: true,
                    headers: {
                        'Connection': 'keep-alive'
                    },
                    method: "GET",
                })
                const data = await response.json()

                if (response.ok) {
                    setPublicDataUser(data);
                }
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getPublicDataUser()
    }, [refreshData])


    // STATUS REGISTER
    const [success, setSuccess] = useState('');
    const [statusSuccess, setStatusSuccess] = useState(false);



    return (
        <API_URL_CONTEXT.Provider value={{refreshDataMemo, setRefreshDataMemo, refreshData, setRefreshData, isLoading, setIsLoading, statusSuccess, setStatusSuccess, success, setSuccess, MainDomain, publicDataUser, setPublicDataUser, API_URL_CHATBOT, API_URL_AUTH, API_URL_PUB, API_URL_NOTE, token, setToken, username, setUsername, userEmail, setUserEmail, isRegister, setIsRegister, userId, setUserId }}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}
