import { createContext } from "react";

export const AuthContext = createContext()

export default function AuthPorvider({children}) {
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}