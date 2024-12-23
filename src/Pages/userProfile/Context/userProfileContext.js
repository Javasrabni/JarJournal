import { createContext, useState, useEffect, useContext } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const UserProfileContext = createContext()
export default function UserProfileProvider({ children }) {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const [usernameProfileData, setUsernameProfileData] = useState([])
    useEffect(() => {
        const GET_USERNAME_DATA = async () => {
            const response = await fetch(`${API_URL_AUTH}/auth/username-info`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const { GET_Username } = await response.json()
                setUsernameProfileData(GET_Username)
            }
        }
        GET_USERNAME_DATA()
    }, [])

    return (
        <UserProfileContext.Provider value={{ usernameProfileData, setUsernameProfileData }}>
            {children}
        </UserProfileContext.Provider>
    )
}