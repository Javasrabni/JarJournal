import { createContext, useState, useEffect, useContext } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const UserProfileContext = createContext()
export default function UserProfileProvider({ children }) {
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const [usernameProfileData, setUsernameProfileData] = useState([])
    useEffect(() => {
        const GET_USERNAME_DATA = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/username-info`)
                if (response.ok) {
                    const { GET_Username } = await response.json()
                    setUsernameProfileData(GET_Username)
                }
            } catch (err) {
                console.error(err)
            }
        }
        GET_USERNAME_DATA()
    }, [])

    const [getBadge, setGetBadge] = useState([])
    useEffect(() => {
        const getBadge = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/badge`, {
                    method: "GET"
                })
                if (response.ok) {
                    const data = await response.json()
                    setGetBadge(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getBadge();
    }, [])

    return (
        <UserProfileContext.Provider value={{ getBadge, setGetBadge, usernameProfileData, setUsernameProfileData }}>
            {children}
        </UserProfileContext.Provider>
    )
}