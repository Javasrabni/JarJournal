import {useEffect, createContext, useState } from "react";

export const OVERALL_CONTEXT = createContext()

export default function OVERALL_CONTEXT_PROVIDER({ children }) {
    const [isLoading, setLoading] = useState(true)

    // intro after login
    const [introAfterLogin, setIntroAfterLogin] = useState(() => {
        const statusIntroAfterLogin = localStorage.getItem('introAfterLogin')
        return statusIntroAfterLogin ? JSON.parse(statusIntroAfterLogin) : true
    })

    useEffect(() => {
        localStorage.setItem('introAfterLogin', JSON.stringify(introAfterLogin))
    }, [introAfterLogin])

    return (
        <OVERALL_CONTEXT.Provider value={{ isLoading, setLoading, introAfterLogin, setIntroAfterLogin}}>
            {children}
        </OVERALL_CONTEXT.Provider>
    )
}