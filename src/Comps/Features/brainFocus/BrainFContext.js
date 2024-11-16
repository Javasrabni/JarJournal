import { createContext, useState } from "react";

export const BrainFContext = createContext()

export default function BrainFProvider({children}) {
    const [switchUIBrainFocus, setSwitchUIBrainFocus] = useState(false)
    return (
        <BrainFContext.Provider value={{switchUIBrainFocus, setSwitchUIBrainFocus}}>
            {children}
        </BrainFContext.Provider>
    )
}