import { createContext, useEffect, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({ children }) {
    // ENDPOINT PATH
    const [MainDomain] = useState('http:localhost:3000')
    const [API_URL_AUTH] = useState('https://0l45qcjl-5001.asse.devtunnels.ms')
    const [API_URL_PUB] = useState('https://0l45qcjl-5001.asse.devtunnels.ms')
    const [API_URL_NOTE] = useState('https://0l45qcjl-5001.asse.devtunnels.ms')
    const [API_URL_CHATBOT] = useState('https://0l45qcjl-5001.asse.devtunnels.ms')

    // USER TOKEN
    const [token, setToken] = useState(null)

    // FETCH USER INFO
    const [username, setUsername] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    // FETCHING GET USER INFO
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/user-info`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setUsername(data.username)
                    setUserEmail(data.email)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (token) {
            fetchUserInfo()
        }
    }, [token])

    // STATUS AUTH FORM
    const [isRegister, setIsRegister] = useState(false);

    // FETCHING GET DATA PUBLIC USER
    const [publicDataUser, setPublicDataUser] = useState([])
    useEffect(() => {
        const getPublicDataUser = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/publicUser`)
                if (response.ok) {
                    const { publicMap } = await response.json()
                    // Menggunakan reduce untuk membentuk array objek penuh
                    // const publicData = publicMap.reduce((acc, user) => {
                    //     acc.push({
                    //         id: user.id,
                    //         username: user.username,
                    //         avatar: user.avatar
                    //     });
                    //     return acc;
                    // }, []);

                    setPublicDataUser(publicMap);
                }
            } catch (err) {
                console.error(err)
            }
        }
        getPublicDataUser()
    }, [])

    return (
        <API_URL_CONTEXT.Provider value={{MainDomain, publicDataUser, setPublicDataUser, API_URL_CHATBOT, API_URL_AUTH, API_URL_PUB, API_URL_NOTE, token, setToken, username, setUsername, userEmail, setUserEmail, isRegister, setIsRegister }}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}