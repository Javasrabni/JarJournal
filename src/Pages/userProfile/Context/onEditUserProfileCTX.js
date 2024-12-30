import { createContext, useContext, useState } from "react";
export const OnEditUserProfileContext = createContext()
export function OnEditUserProfileProvider({ children }) {
    // BIO 
    const [bioUser, setBioUser] = useState([])
    const [linkUser, setLinkUser] = useState([])

    const [showAllAvatar, setShowAllAvatar] = useState(false)

    return (
        <OnEditUserProfileContext.Provider value={{ showAllAvatar, setShowAllAvatar, bioUser, setBioUser, linkUser, setLinkUser }}>
            {children}
        </OnEditUserProfileContext.Provider>
    )
}

export const useOnEditUserProfileContext = () => {
    return useContext(OnEditUserProfileContext)
} 