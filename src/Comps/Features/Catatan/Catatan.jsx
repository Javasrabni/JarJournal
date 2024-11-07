import { useParams } from "react-router-dom"
import MusicBox from "../../Footer/musicBox/musicBox"
import UserQuote from "../../Footer/userQuote/userQuote"
import { useContext } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"
import { UserQuoteContext } from "../../Footer/userQuote/userQuoteContext"

export default function Catatan() {
    const { id } = useParams()
    // Music box context
    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)

    // User Quote Context
    const { setUserClickQuote } = useContext(UserQuoteContext)
    return (
        <>
            <div className="w-full h-[100px]">
                <p>catatan page {id}</p>
            </div>
            <footer className="p-[0px] h-fit" style={{ position: "fixed", bottom: "0px", left: "0px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "transparent", zIndex: "14", transform: statusMusicAxisY ? "translateY(0px)" : "translateY(118px)", transition: "transform 0.3s ease" }}>
                <div>
                    <MusicBox />
                </div>
                <div className="w-[360px] h-[44px] p-[16px] bg-black " style={{ borderTop: "1px solid #262626" }} onClick={() => setUserClickQuote((prev) => !prev)}>
                    <UserQuote />
                </div>
            </footer>
        </>
    )
}