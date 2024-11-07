import { useContext } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"

export default function EbookPage(onClickFeatures) {

    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    
    return (
        <div>
            <p>ini ebook</p>
        </div>
    )
}