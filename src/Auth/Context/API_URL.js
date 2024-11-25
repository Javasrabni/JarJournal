import { createContext, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({children}) {
    const pathLink_endPoint = 'https://0l45qcjl-5000.asse.devtunnels.ms';
    const [API_URL] = useState(pathLink_endPoint)

    const [nameUser, setNameUser] = useState(null)
    return (
        <API_URL_CONTEXT.Provider value={{API_URL, nameUser, setNameUser}}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}