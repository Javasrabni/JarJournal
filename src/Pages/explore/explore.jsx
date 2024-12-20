import { useContext } from "react"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"

export default function Explore() {
    const { themeActive } = useContext(ThemeAppContext)

    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} h-[100vh] w-full px-[16px]`}>

            <div className={`h-[100vh] max-w-[500px] flex flex-col m-auto bg-[tomato]`}>
                <header className="w-full h-fit flex flex-row items-center py-[16px]">
                    <input type="text" placeholder="Cari user atau utas" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} h-[55px] w-full rounded-[8px]  p-[12px] outline-0 border-0`} />
                </header>
                <div className="flex items-end">
                    <NavFooter />
                </div>
            </div>

        </div>
    )
}