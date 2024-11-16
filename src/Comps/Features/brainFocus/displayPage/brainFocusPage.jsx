import CountTime from "../../../Footer/musicBox/countTime"
import Header from "../../../Navbar-Top/Header"
import { BrainFContext } from "../BrainFContext"
import { useContext } from "react"
import MusicPlayUI from "../Music UI/musicPlayUI"

export default function BrainFocusPage() {
    const bgBrainFocus = {
        backgroundImage: "url(/Assets/background/bg-BF-NW.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
    const { switchUIBrainFocus, setSwitchUIBrainFocus } = useContext(BrainFContext)

    return (
        <div className="w-[360px] h-[100vh] flex flex-col m-auto" style={switchUIBrainFocus ? {} : {...bgBrainFocus}}>
            {/* <div className="w-full">
                    <Header />
                </div> */}
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-white w-full h-full">
                    {switchUIBrainFocus ? (
                        <MusicPlayUI />
                    ) : (
                        <CountTime
                            BFPage={true}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}