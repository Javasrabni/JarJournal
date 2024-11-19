import CountTime from "../../../Footer/musicBox/countTime"
import Header from "../../../Navbar-Top/Header"
import { BrainFContext } from "../BrainFContext"
import { useContext, useEffect, useState } from "react"
import MusicPlayUI from "../Music UI/musicPlayUI"
import { motion } from 'framer-motion'
import { MusicBoxContext } from "../../../Footer/musicBox/musicBoxContext"
import PopupLegend from "../../../Popup/Popup-typ1/PopupLegend"
import { AnimateLoadPageContext } from "../../../animate onload page/animateLoadPage"

export default function BrainFocusPage() {

    // Smooth render page
    const { animatePage, setAnimatePage } = useContext(AnimateLoadPageContext)
    useEffect(()=> {
        window.addEventListener('beforeunload', setAnimatePage(true))
        return () => {
            window.removeEventListener('beforeunload', setAnimatePage(false))
        } 
    }, [])

    const bgBrainFocus = {
        // backgroundImage: "url(https://res.cloudinary.com/dwf753l9w/image/upload/v1731781318/bg-BF-NW_rooumq.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    // fast rendering bg brainfocus
    const [onLoadBgBF, setOnLoadBgBF] = useState(false)
    useEffect(() => {
        const bgBF = new Image();
        bgBF.src = 'https://res.cloudinary.com/dwf753l9w/image/upload/f_auto/v1731781318/bg-BF-NW_rooumq.png'
        bgBF.onload = () => setOnLoadBgBF(true)
    }, [])

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

            {/* {onLoadBgBF ? null : (
                <div className="w-full h-full flex fixed bg-black text-white items-center justify-center">
                    <p>load..</p>
                </div>
            )} */}

            <div className="w-[360px] h-[100vh] flex flex-col m-auto bg-black" style={switchUIBrainFocus ? {} : { ...bgBrainFocus, backgroundImage: onLoadBgBF ? "url(https://res.cloudinary.com/dwf753l9w/image/upload/f_auto/v1731781318/bg-BF-NW_rooumq.png)" : 'none' }}>
                <div className="w-full h-full flex justify-center items-center" style={{ opacity: animatePage ? '1' : '0' }}>
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
            </div >
        </>
    )
}