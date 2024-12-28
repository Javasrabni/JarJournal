import { createContext, useContext, useState } from "react";
export const OnEditUserProfileContext = createContext()
export function OnEditUserProfileProvider({ children }) {
    // BIO 
    const [bioUser, setBioUser] = useState('Hidup seperti larry')
    const [linkUser, setLinkUser] = useState([])
    return (
        <OnEditUserProfileContext.Provider value={{ bioUser, setBioUser, linkUser, setLinkUser }}>
            {children}
        </OnEditUserProfileContext.Provider>
    )
}

export const useOnEditUserProfileContext = () => {
    return useContext(OnEditUserProfileContext)
} 