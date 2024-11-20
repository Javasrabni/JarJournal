import { useContext } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"

export default function WriteNotePage() {
    const {themeActive} = useContext(ThemeAppContext)
    return (
        <div className={`w-full h-[100vh] ${themeActive ? 'bg-black' : 'bg-white'} text-black flex flex-col `}>
            <div className="w-full h-fit">
                <input type="text" placeholder="Judul" className={`w-full p-[12px] outline-0 text-[14px] font-[600] ${themeActive ? 'bg-black text-white' : 'bg-white text-[var(--black-text)]'}`} autoFocus/>
            </div>
            <div className="w-full h-full">
                <textarea name="" id="" placeholder="Isi catatan" className={`w-full h-full px-[12px] font-[500] py-[0px 12px] outline-0 text-[14px] ${themeActive ? 'bg-black text-white' : 'bg-white text-[var(--black-text)]'}`} />

            </div>
        </div>
    )
}