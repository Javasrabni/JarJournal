import { createContext, useState, useEffect, useContext } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const UserProfileContext = createContext()
export default function UserProfileProvider({ children }) {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const [usernameProfileData, setUsernameProfileData] = useState([])
    useEffect(() => {
        const GET_USERNAME_DATA = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/username-info`, {
                    method: "GET",
                })
                if (response.ok) {
                    const { GET_Username } = await response.json()
                    setUsernameProfileData(GET_Username)
                }
            } catch (err) {
                console.error(err)
            }
        }
        GET_USERNAME_DATA()
    }, [usernameProfileData])

    return (
        <UserProfileContext.Provider value={{ usernameProfileData, setUsernameProfileData }}>
            {children}
        </UserProfileContext.Provider>
    )
}