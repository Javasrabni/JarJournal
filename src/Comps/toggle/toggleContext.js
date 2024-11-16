import { createContext, useState } from "react";

export const ToggleAllContext = createContext()

export default function ToggleAllProvider({children}) {
    const [stateToggle, setStateToggle] = useState(false)
    const [stateTogglePlayMusic, setstateTogglePlayMusic] = useState(false)
    return (
        <ToggleAllContext.Provider value={{stateToggle, setStateToggle, stateTogglePlayMusic, setstateTogglePlayMusic}}>
            {children}
        </ToggleAllContext.Provider>
    )
}