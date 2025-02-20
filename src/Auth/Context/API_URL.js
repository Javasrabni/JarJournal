import { createContext, useEffect, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({ children }) {
    // ENDPOINT PATH
    const [MainDomain] = useState('http:localhost:3000')
    const [API_URL_AUTH] = useState('http://localhost:8000')
    const [API_URL_PUB] = useState('http://localhost:8000')
    const [API_URL_NOTE] = useState('http://localhost:8000')
    const [API_URL_CHATBOT] = useState('http://localhost:8000')

    // USER TOKEN
    const [token, setToken] = useState(() => {
        const saveData = localStorage.getItem('token')
        return saveData ? JSON.parse(saveData) : null
    })

    // FETCH USER INFO
    const [username, setUsername] = useState(() => {
        const saveData = localStorage.getItem('userUsername')
        return saveData ? JSON.parse(saveData) : null
    })
    const [userId, setUserId] = useState(() => {
        const saveData = localStorage.getItem('userId')
        return saveData ? JSON.parse(saveData) : null
    })
    const [userEmail, setUserEmail] = useState(() => {
        const saveData = localStorage.getItem('userEmail')
        return saveData ? JSON.parse(saveData) : null
    })

    const [refreshData, setRefreshData] = useState(false)

    useEffect(() => {
        localStorage.setItem('userUsername', JSON.stringify(username))
        localStorage.setItem('userId', JSON.stringify(userId))
        localStorage.setItem('userEmail', JSON.stringify(userEmail))
    }, [username, userId, userEmail])

    // FETCHING GET USER INFO
    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const response = await fetch(`${API_URL_AUTH}/user_info`, {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })
    //             const data = await response.json()
    //             if (response.ok) {
    //                 setUsername(data.username)
    //                 setUserEmail(data.email)
    //             }
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }

    //     if (token) {
    //         fetchUserInfo()
    //     }
    // }, [token])

    // STATUS AUTH FORM
    const [isRegister, setIsRegister] = useState(false);

    // FETCHING GET DATA PUBLIC USER
    const [publicDataUser, setPublicDataUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getPublicDataUser = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/user_info`)
                if (response.ok) {
                    const data = await response.json()
                    setPublicDataUser(data);
                    setIsLoading(false)

                }
            } catch (err) {
                console.error(err)
                setIsLoading(true)
            }
        }
        getPublicDataUser()
    }, [refreshData])


    // STATUS REGISTER
    const [success, setSuccess] = useState('');
    const [statusSuccess, setStatusSuccess] = useState(false);



    return (
        <API_URL_CONTEXT.Provider value={{ refreshData, setRefreshData, isLoading, setIsLoading, statusSuccess, setStatusSuccess, success, setSuccess, MainDomain, publicDataUser, setPublicDataUser, API_URL_CHATBOT, API_URL_AUTH, API_URL_PUB, API_URL_NOTE, token, setToken, username, setUsername, userEmail, setUserEmail, isRegister, setIsRegister, userId, setUserId }}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}