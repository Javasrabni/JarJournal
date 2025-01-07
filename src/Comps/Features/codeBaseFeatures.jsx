import { useLocation, useParams, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Header from "../Navbar-Top/Header"
import Catatan from "./Catatan/Catatan"
import EbookPage from "./eBookSection/ebookPage/ebook"
import Jurnal from "./Jurnal/Jurnal"
import BrainFocusPage from "./brainFocus/displayPage/brainFocusPage"
import { ThemeAppContext } from "./Theme/toggleTheme.jsx/ThemeAppContext"
import KalenderPage from "./kalender/kalenderPage/Kalender"
import OnEditNote from "./Catatan/onEditNote/onEditNote"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"

export default function CodeBaseFeatures() {
    const { id } = useParams()
    const pathLocation = useLocation()
    const navigate = useNavigate()
    const { themeActive } = useContext(ThemeAppContext)

    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    useEffect(()=> {
        if(!token) {
            navigate('/Auth')
        }
    }, [token])

    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-[360px] h-full flex justify-center">
                <div className="w-full h-full flex justify-center flex-col">
                    <Header nameTools={`${id}`}  />

                    <div>
                        {pathLocation.pathname === "/ftr/Catatan" && (<Catatan />)}
                        {pathLocation.pathname === "/ftr/Jurnal" && (<Jurnal />)}
                        {pathLocation.pathname === "/ftr/E-Book" && (<EbookPage />)}
                        {pathLocation.pathname === "/ftr/EditCatatan" && (<OnEditNote />)}
                    </div>
                </div>
            </div>
        </div>
    )
}