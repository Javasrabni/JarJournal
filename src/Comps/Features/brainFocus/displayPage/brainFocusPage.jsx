import CountTime from "../../../Footer/musicBox/countTime"
import Header from "../../../Navbar-Top/Header"
import { BrainFContext } from "../BrainFContext"
import { useContext } from "react"
import MusicPlayUI from "../Music UI/musicPlayUI"
import {motion} from 'framer-motion'
import { MusicBoxContext } from "../../../Footer/musicBox/musicBoxContext"
import PopupLegend from "../../../Popup/Popup-typ1/PopupLegend"

export default function BrainFocusPage() {
    const bgBrainFocus = {
        backgroundImage: "url(/Assets/background/bg-BF-NW.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
    const { switchUIBrainFocus, setSwitchUIBrainFocus } = useContext(BrainFContext)

    // MusicBox
    const { statePopupInfo, setStatePopupInfo } = useContext(MusicBoxContext)
    const { popupReset, setPopupReset } = useContext(MusicBoxContext)

    return (
        <>
            {/* Popup from Reset in MusicBox */}
            {popupReset && (
                <div className="flex items-center justify-center w-full h-full fixed z-[15]">
                    <motion.div
                        className="popup"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            zIndex: "2",
                        }}
                    >
                        <PopupLegend
                            resetInMusicBox={true}
                            Judul={'Reset timer?'}
                            Deskripsi={"Timer akan mulai dari 0 kembali."}
                        />
                    </motion.div>
                    <div className="z-[1] w-full h-full bg-[#00000080] fixed" onClick={() => setPopupReset((prev) => !prev)} />
                </div>
            )}

            <div className="w-[360px] h-[100vh] flex flex-col m-auto" style={switchUIBrainFocus ? {} : { ...bgBrainFocus }}>
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
        </>
    )
}