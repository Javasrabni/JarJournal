import { useEffect, createContext, useState, useContext } from "react";
import { API_URL_CONTEXT } from "../Auth/Context/API_URL";

export const OVERALL_CONTEXT = createContext()

export default function OVERALL_CONTEXT_PROVIDER({ children }) {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const [isLoading, setLoading] = useState(true)
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT)
    const { username, setUsername } = useContext(API_URL_CONTEXT)


    // intro after login
    const [introAfterLogin, setIntroAfterLogin] = useState(() => {
        const statusIntroAfterLogin = localStorage.getItem('introAfterLogin')
        return statusIntroAfterLogin ? JSON.parse(statusIntroAfterLogin) : true
    })

    // Mengecek apakah user sudah memiliki avatar atau belum
    useEffect(() => {
        const findUser = publicDataUser.find(user => user.username == username)
        const hasAvatar = findUser?.avatar?.urlAvt
        if (hasAvatar) {
            setIntroAfterLogin(false)
        } else {
            const delayOutput = setTimeout(() => {
                setIntroAfterLogin(true)
            }, 1000)
            return () => clearTimeout(delayOutput)
        }
    }, [publicDataUser, username, token])

    useEffect(() => {
        localStorage.setItem('introAfterLogin', JSON.stringify(introAfterLogin))
    }, [introAfterLogin, token])

    return (
        <OVERALL_CONTEXT.Provider value={{ isLoading, setLoading, introAfterLogin, setIntroAfterLogin }}>
            {children}
        </OVERALL_CONTEXT.Provider>
    )
}