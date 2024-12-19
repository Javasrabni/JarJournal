import { API_URL_CONTEXT } from "./Auth/Context/API_URL"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { useEffect } from "react"
import AuthPage from "./Auth/authPage"

export default function LandingPage() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const navigate = useNavigate()

    // STORE TOKEN
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []);

    // Handle login
    function HandleClickOnLogin() {
        if(!token) {
            navigate('/Auth')
        }
    }

    return (    
        <div>
            <p>Jarjournal</p>
            <div>
                {token && (
                    <div>
                        <button onClick={()=> navigate('/dashboard')}>Dashboard</button>
                    </div>
                )}
                {!token && (
                    <>
                        <div>
                            <button onClick={HandleClickOnLogin} style={{fontWeight: '600', textDecoration: "underline"}}>Mulai Jarjournal</button>
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}