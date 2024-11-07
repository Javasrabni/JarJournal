import { useEffect, useState } from "react"
import { useContext } from "react"
import { ThemeAppContext } from "./ThemeAppContext"

export default function ToggleDarkMode() {
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // Icon 
    const darkMode = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
    const lightMOde = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>

    // Function State Theme App
    function HandleClickTheme() {
        setThemeActive((prev) => !prev)
    }

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="w-[46px] h-[24px] bg-[#08090A] rounded-[50px] flex flex-row justify-between items-center px-[6px] cursor-pointer text-white" style={{outline: "1px solid rgb(38, 38, 38)"}} onClick={HandleClickTheme} >
                <div style={{zIndex: "15", transition: "color 0.3s ease"}} className="flex flex-row items-center justify-between w-full">
                    <div className={`text-${themeActive ? 'white' : 'black'}`}>
                        {lightMOde}
                    </div>
                    <div className={`text-${themeActive ? 'black' : 'white'}`}>
                        {darkMode}
                    </div>
                </div>

                <div className="bg-slate-200 w-[16px] h-[16px] rounded-[14px]" style={{ position: "absolute", zIndex: "14", transform: themeActive ? "translateX(20px)" : "translateX(-2px)", transition: "transform 0.3s ease"}} />

            </div>
        </div>
    )
}