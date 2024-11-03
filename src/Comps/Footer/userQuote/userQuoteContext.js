import { createContext, useContext, useEffect, useState } from "react";
 
export const UserQuoteContext = createContext()

export default function UserQuoteProvider({children}) {
    // Get value / saved saved quote from localstorage
    const [userQuote, setUserQuote] = useState(()=> {
        const savedUserQuote = localStorage.getItem('saveUserQuote')
        return savedUserQuote ? JSON.parse(savedUserQuote) : "Your quote here"
    })
    // State indikator untuk switch antara quote dan input
    const [userClickQuote, setUserClickQuote] = useState(false)

    function HandleChangeQuote(e) {
        setUserQuote(e.target.value)
    }

    // Save userQuote to localstoraege
    useEffect(() => {
        localStorage.setItem('saveUserQuote', JSON.stringify(userQuote))
    }, [userQuote])

    return (
        <UserQuoteContext.Provider value={{userQuote, HandleChangeQuote, userClickQuote, setUserClickQuote}}>
            {children}
        </UserQuoteContext.Provider>
    )
}