import { useContext } from "react"
import { ThemeAppContext } from "../../Features/Theme/toggleTheme.jsx/ThemeAppContext"

export default function PlusBtn({temaCatatan}) {
    const {themeActive} = useContext(ThemeAppContext)
    return (
        <div className={`w-[40px] h-[40px] absolute ${temaCatatan && themeActive ? 'bg-white' : 'bg-[var(--black-card)]' } bottom-[32px] right-[32px] rounded-[50px] flex items-center justify-center cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{color: temaCatatan && themeActive ? 'black' : 'white'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

        </div>
    )
}
