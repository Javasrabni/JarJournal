import { createContext, useState } from "react";

export const ThemeAppContext = createContext()

export default function ThemeAppProvider({children}) {
    const [themeActive, setThemeActive] = useState(false)
    return (
        <ThemeAppContext.Provider value={{themeActive, setThemeActive}}>
            {children}
        </ThemeAppContext.Provider>
    )
}