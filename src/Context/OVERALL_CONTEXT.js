import { createContext, useState } from "react";

export const OVERALL_CONTEXT = createContext()

export default function OVERALL_CONTEXT_PROVIDER({children}) {
    const [isLoading, setLoading] = useState(true)
    return (
        <OVERALL_CONTEXT.Provider value={{isLoading, setLoading}}>
            {children}
        </OVERALL_CONTEXT.Provider>
    )
}