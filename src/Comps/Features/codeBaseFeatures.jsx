import { useLocation, useParams, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Header from "../Navbar-Top/Header"
import Catatan from "./Catatan/Catatan"
import EbookPage from "./eBookSection/ebookPage/ebook"
import Jurnal from "./Jurnal/Jurnal"

export default function CodeBaseFeatures() {
    const { id } = useParams()
    const pathLocation = useLocation()
    const navigate = useNavigate()

    return (
        <>
            <Header nameTools={`${id}`} sloganTools={'as'}/>
            <div>
                {pathLocation.pathname === "/ftr/Catatan" && (<Catatan />)}
                {pathLocation.pathname === "/ftr/Jurnal" && (<Jurnal />)}
                {pathLocation.pathname === "/ftr/E-Book" && (<EbookPage />)}
            </div>
        
        </>

    )
}