import { useNavigate } from "react-router-dom"
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"
import { useContext } from "react"

export default function CardFeatures({ heightKalender, nameFeatures, heightCatatan, heightJurnal, descFeatures, buttonFeatures, heightMemo, onClickFeatures, cardType2EBook, }) {
    const navigate = useNavigate()
    const Buku = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>

    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    return (
        <>
            {cardType2EBook ? (
                <div className="flex flex-col" >

                    {!heightKalender && (
                        <div className="w-[52px] h-[6px]" style={{ borderRadius: "8px 8px 0px 0px", backgroundColor: themeActive ? "var(--black-bg)" : 'var(--white-bg-200)' }} />
                    )}


                    <div className={`w-full ${themeActive ? 'bg-[var(--black-card)]' : 'bg-[var(--white-bg-100)]'} text-white p-[12px] gap-[12px] flex flex-row gap-[8px] justify-between items-center`} style={{ borderRadius: heightKalender ? '8px' : "0px 8px 8px 8px", outline: themeActive ? "1px solid var(--black-bg)" : "1px solid var(--white-bg-200)" }}>
                        <div>
                            <span className="flex f ex-row gap-[8px] items-center">
                                {/* {Buku} */}
                                <p className={`font-semibold text-xs ${themeActive ? 'text-white' : 'text-[var(--black-text)]'} `}>{nameFeatures}</p>
                            </span>
                            <p className="text-[10px] font-[400 text-[#999999]">{descFeatures}</p>
                        </div>
                        <div>
                            {heightKalender ? (
                                <button className={`text-[10px]  ${heightKalender ? 'px-[4px] py-[4px]' : 'px-[12px] py-[4px]'} ${themeActive ? 'bg-white' : 'bg-[var(--white-bg-200)]'} text-black rounded-xl font-semibold`} onClick={() => navigate('/KalenderPlanner')}>
                                    <span className="flex gap-[4px] items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                                        {/* {arrow} */}
                                    </span>
                                </button>
                            ) : (
                                <button className={`text-[10px] py-[4px] px-[12px] ${themeActive ? 'bg-white' : 'bg-[var(--white-bg-200)]'} text-black rounded-xl font-semibold`} onClick={() => navigate('/ftr/E-Book')}>
                                    <span className="flex gap-[4px] items-center justify-center">
                                        <p>Baca</p>
                                        {/* {arrow} */}
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`w-full ${themeActive ? "bg-[#08090A]" : "bg-[var(--white-bg-100)]"} ${themeActive ? 'text-white' : 'text-[var(--black-text)]'} rounded-[8px] p-[12px] gap-[12px]`} style={{ height: heightCatatan ? "120px" : heightJurnal ? "112px" : heightMemo ? "fit-content" : "50px", outline: themeActive ? "1px solid rgb(38, 38, 38)" : "1px solid var(--white-bg-200)" }}>
                    <div>
                        <div>
                            <p className="font-semibold text-xs">{nameFeatures}</p>
                            <p className="text-[10px] font-[400 text-[#999999]">{descFeatures}</p>
                        </div>
                        <button className={`text-[10px] py-[4px] px-[12px] ${themeActive ? 'bg-white' : 'bg-[var(--white-bg-200)]'} text-black rounded-xl font-semibold mt-[16px]`} onClick={() => navigate(onClickFeatures)}>
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