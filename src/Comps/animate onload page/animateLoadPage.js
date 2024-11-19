import { createContext, useEffect, useState } from "react";

export const AnimateLoadPageContext = createContext()

export default function AnimateLoadPageProvider({ children }) {
    const [animatePage, setAnimatePage] = useState(false)
    const [animatePageMain, setAnimatePageMain] = useState(false) // Main page
    
    return (
        <AnimateLoadPageContext.Provider value={{animatePage, setAnimatePage, animatePageMain, setAnimatePageMain}}>
            {children}
        </AnimateLoadPageContext.Provider>
    )
}