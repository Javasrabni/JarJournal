import { createContext, useEffect, useState } from "react";

export const ThemeAppContext = createContext()

export default function ThemeAppProvider({children}) {
    const [themeActive, setThemeActive] = useState(()=> {
        const saveTheme = localStorage.getItem('saveTheme')
        return saveTheme ? JSON.parse(saveTheme) : false
    })

    useEffect(()=> {
        localStorage.setItem('saveTheme', themeActive)
    }, [themeActive])

    return (
        <ThemeAppContext.Provider value={{themeActive, setThemeActive}}>
            {children}
        </ThemeAppContext.Provider>
    )
}