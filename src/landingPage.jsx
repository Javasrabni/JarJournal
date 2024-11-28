import { API_URL_CONTEXT } from "./Auth/Context/API_URL"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { useEffect } from "react"
import AuthPage from "./Auth/authPage"

export default function LandingPage() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // NAVIGATE
    const navigate = useNavigate()

    // LOGIN STATUS
    const [onLogin, setOnLogin] = useState(false)

    // STORE TOKEN
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []);

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
                            <button onClick={() => setOnLogin((prev) => !prev)} style={{fontWeight: '600', textDecoration: "underline"}}>Mulai Jarjournal</button>
                        </div>
                        <div>
                            {onLogin && (
                                <AuthPage setToken={setToken} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}