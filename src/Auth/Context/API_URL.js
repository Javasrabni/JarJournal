import { createContext, useEffect, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({ children }) {
    // ENDPOINT PATH
    const pathLink_endPoint_AUTH = 'https://0l45qcjl-5001.asse.devtunnels.ms';
    const pathLink_endPoint_PUB = 'https://0l45qcjl-5001.asse.devtunnels.ms';
    const pathLink_endPoint_NOTE = 'https://0l45qcjl-5001.asse.devtunnels.ms';
    const pathLink_endPoint_CHATBOT = 'https://0l45qcjl-5001.asse.devtunnels.ms';

    const [API_URL_AUTH] = useState(pathLink_endPoint_AUTH)
    const [API_URL_PUB] = useState(pathLink_endPoint_PUB)
    const [API_URL_NOTE] = useState(pathLink_endPoint_NOTE)
    const [API_URL_CHATBOT] = useState(pathLink_endPoint_CHATBOT)

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





    return (
        <API_URL_CONTEXT.Provider value={{ API_URL_CHATBOT, API_URL_AUTH, API_URL_PUB, API_URL_NOTE, token, setToken, username, setUsername, userEmail, setUserEmail, isRegister, setIsRegister }}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}