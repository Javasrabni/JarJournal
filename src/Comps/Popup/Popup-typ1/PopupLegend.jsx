import { useContext } from "react"
import { MusicBoxContext } from "../../Footer/musicBox/musicBoxContext"

export default function PopupLegend({ Judul, Deskripsi, InfoMusicBox }) {
    const { popupReset, setPopupReset, boolStateResetPopup, setBoolStateResetPopup } = useContext(MusicBoxContext)

    return (
        <div className="w-[260px] h-fit bg-white rounded-[12px] p-[16px] z-[21px]">
            <div className="flex flex-col gap-[4px]">
                {popupReset && (
                    <div className="flex flex-row items-center justify-between gap-[8px]">
                        <div className="flex flex-col gap-[0px] ">
                            <p className="text-[12px] font-[600]">{Judul}</p>
                            <p className="text-[10px] font-[400] text-[#999999]">{Deskripsi}</p>
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <button className="text-[10px] py-[4px] px-[12px] bg-[tomato] text-white rounded-xl font-semibold" onClick={()=> setBoolStateResetPopup((prev)=> !prev)}>Ya</button>
                            <button className="text-[10px] py-[4px] px-[12px] bg-black text-white rounded-xl font-semibold" onClick={()=> setPopupReset((prev)=> !prev)}>Tidak</button>
                        </div>
                    </div>
                )}

                {/* Judul */}
                <div className="text-[12px] font-[600]" style={{ display: popupReset && "none" }}>
                    {InfoMusicBox ? (
                        <span className="flex items-center gap-[8px]">
                            <img src="/Assets/Icon/star.svg" alt="JarJournal Icon" style={{ filter: "drop-shadow(0px 0px 12px gold)" }} width={'14px'} />
                            <p>{Judul}</p>
                        </span>
                    ) : (
                        <p>{Judul}</p>
                    )}
                </div>
                <p className="text-[10px] font-[400] text-[#999999]" style={{ display: popupReset && "none" }}>{Deskripsi}</p>
            </div>
        </div>
    )
}