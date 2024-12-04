import { createContext, useEffect, useState } from "react";

export const API_URL_CONTEXT = createContext()

export default function API_URL_PROVIDER({children}) {
    // ENDPOINT PATH
    const pathLink_endPoint_AUTH = 'https://0l45qcjl-5000.asse.devtunnels.ms';
    const pathLink_endPoint_PUB = 'https://0l45qcjl-5000.asse.devtunnels.ms';
    const pathLink_endPoint_NOTE = 'https://0l45qcjl-5000.asse.devtunnels.ms';

    const [API_URL_AUTH] = useState(pathLink_endPoint_AUTH)
    const [API_URL_PUB] = useState(pathLink_endPoint_PUB)
    const [API_URL_NOTE] = useState(pathLink_endPoint_NOTE)

    // USER TOKEN
    const [token, setToken] = useState(null)

    // FETCH USER INFO
    const [username, setUsername] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    // STATUS AUTH FORM
    const [isRegister, setIsRegister] = useState(false);
    

    
   

    return (
        <API_URL_CONTEXT.Provider value={{API_URL_AUTH, API_URL_PUB, API_URL_NOTE, token, setToken,username, setUsername, userEmail, setUserEmail, isRegister, setIsRegister}}>
            {children}
        </API_URL_CONTEXT.Provider>
    )
}