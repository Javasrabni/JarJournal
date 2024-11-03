import { useNavigate } from "react-router-dom"

export default function CardFeatures({ nameFeatures, heightCatatan, heightJurnal, descFeatures, buttonFeatures, heightMemo, onClickFeatures, cardType2EBook }) {
    const navigate = useNavigate()
    const Buku = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>
    return (
        <>
            {cardType2EBook ? (
                <div className="flex flex-col" >
                    <div className="w-[52px] h-[6px] bg-[#262626]" style={{ borderRadius: "8px 8px 0px 0px", outline: "1px solid yellow"}} /> 
                    

                    <div className="w-full bg-[#08090a] text-white p-[12px] gap-[12px] flex flex-row gap-[8px] justify-between items-center" style={{ borderRadius: "0px 8px 8px 8px" }}>
                        <div>
                            <span className="flex flex-row gap-[8px] items-center">
                                {/* {Buku} */}
                                <p className="font-semibold text-xs">E-Book</p>
                            </span>
                            <p className="text-[10px] font-[400 text-[#999999]">Bacaan gratis</p>
                        </div>
                        <div>
                            <button className="text-[10px] py-[4px] px-[12px] bg-white text-black rounded-xl font-semibold">
                                <span className="flex gap-[4px] items-center justify-center">
                                    <p>Baca</p>
                                    {/* {arrow} */}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-[#08090a] text-white rounded-[8px] p-[12px] gap-[12px]" style={{ height: heightCatatan ? "120px" : heightJurnal ? "112px" : heightMemo ? "fit-content" : "50px" }}>
                    <div>
                        <div>
                            <p className="font-semibold text-xs">{nameFeatures}</p>
                            <p className="text-[10px] font-[400 text-[#999999]">{descFeatures}</p>
                        </div>
                        <button className="text-[10px] py-[4px] px-[12px] bg-white text-black rounded-xl font-semibold mt-[16px]" onClick={() => navigate(onClickFeatures)}>
                            <span className="flex gap-[4px] items-center justify-center">
                                {buttonFeatures}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}