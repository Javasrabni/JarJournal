import { createContext, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({children}) {
    // ENDPOINT PATH
    const pathLink_endPoint_AUTH = 'https://0l45qcjl-5001.asse.devtunnels.ms';
    const pathLink_endPoint_PUB = 'https://0l45qcjl-5002.asse.devtunnels.ms';

    const [API_URL_AUTH] = useState(pathLink_endPoint_AUTH)
    const [API_URL_PUB] = useState(pathLink_endPoint_PUB)

    // USER TOKEN
    const [token, setToken] = useState(null)


    const [nameUser, setNameUser] = useState(null)
    return (
        <API_URL_CONTEXT.Provider value={{API_URL_AUTH, API_URL_PUB, token, setToken, nameUser, setNameUser}}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}