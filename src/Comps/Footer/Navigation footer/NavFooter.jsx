import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function NavFooter() {
    const navigate = useNavigate()
    const location = useLocation()

    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>

    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>

    const userIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>

    useEffect(() => {
        if (location.pathname === "/dashboard") {
        }
    }, [location.pathname])

    return (
        <div className="w-full h-full flex flex-row items-center justify-around text-white" style={{ borderTop: '1px solid var(--black-border)' }}>
            <div onClick={() => navigate('/dashboard')} className="cursor-pointer">
                <span>{homeIcon}</span>
            </div>
            <div onClick={() => navigate('/Explore')} className="cursor-pointer">
                <span>{searchIcon}</span>
            </div>
            <div onClick={() => navigate('/JJR-ChatBot')} className="cursor-pointer">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div onClick={() => alert('soon')} className="cursor-pointer">
                <i class="fa-solid fa-user"></i>
            </div>
            <div onClick={() => alert('soon')} className="cursor-pointer">
                <span>{userIcon}</span>
            </div>
        </div>
    )
}