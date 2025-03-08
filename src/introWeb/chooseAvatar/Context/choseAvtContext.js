import { createContext, useContext, useEffect, useState } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const ChooseAvatarContext = createContext()
export default function ChosseAvatarProvider({ children }) {
    const [getAllAvatar, setGetAllAvatar] = useState([])
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)


    useEffect(() => {
        const GetAllAvatarAPI = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/get/user_avatar`, {
                    method: "GET",
                    keepalive: true,
                    headers: {
                        'connection': 'keep-alive',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    const mappingDataAvt = data.map(data => ({
                        id: data.id, urlAvt: data.avatar
                    }))
                    setGetAllAvatar(mappingDataAvt)
                }
            } catch (err) {
                console.error(err)
            }
        }
        GetAllAvatarAPI()
    }, [refreshData])

    return (
        <ChooseAvatarContext.Provider value={{ getAllAvatar, setGetAllAvatar }}>
            {children}
        </ChooseAvatarContext.Provider>
    )
}
