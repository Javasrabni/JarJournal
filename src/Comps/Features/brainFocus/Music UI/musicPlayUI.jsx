import { useContext, useEffect } from "react"
import { BrainFContext } from "../BrainFContext"
export default function MusicPlayUI() {
    const { switchUIBrainFocus, setSwitchUIBrainFocus } = useContext(BrainFContext)

    return (
        <div className="bg-black">
            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe illo quas quo quos, optio ea nostrum aliquid aut debitis nihil? Beatae eius, adipisci ducimus quaerat veritatis architecto dignissimos quis?</p>
            </div>
        </div>
    )
}