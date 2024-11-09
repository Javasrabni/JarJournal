export default function PopupLegend({ Judul, Deskripsi, InfoMusicBox }) {
    return (
        <div className="w-[260px] h-fit bg-white rounded-[12px] p-[16px] z-[21px]">
            <div className="flex flex-col gap-[4px]">
                {/* Judul */}
                <p className="text-[12px] font-[600]">
                    {InfoMusicBox ? (
                        <span className="flex items-center gap-[8px]">
                            <img src="/Assets/Icon/star.svg" alt="JarJournal Icon" style={{filter: "drop-shadow(0px 0px 12px gold)"}} width={'14px'}/>
                            {Judul}
                        </span>
                    ) : (
                        {Judul}
                    )}</p>
                <p className="text-[10px] font-[400] text-[#999999]">{Deskripsi}</p>
            </div>
        </div>
    )
}