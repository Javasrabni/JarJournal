import { createContext, useContext, useEffect, useState } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const ChooseAvatarContext = createContext()
export default function ChosseAvatarProvider({ children }) {
    const [getAllAvatar, setGetAllAvatar] = useState([])
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    useEffect(() => {
        const GetAllAvatarAPI = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/avatar`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const { allAvatar } = await response.json()
                    const mappingDataAvt = allAvatar.map(data => ({
                        Id: data.id, urlAvt: data.url
                    }))
                    setGetAllAvatar(mappingDataAvt)
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetAllAvatarAPI()
    }, [])

    return (
        <ChooseAvatarContext.Provider value={{ getAllAvatar, setGetAllAvatar }}>
            {children}
        </ChooseAvatarContext.Provider>
    )
}
