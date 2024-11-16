import { useContext } from "react"
import { ToggleAllContext } from "./toggleContext"

export default function ToggleAll({ musicIcon, statusPlayMusic, playIcon, pauseIcon, statusPausePlayMusic }) {
    const { stateToggle, setStateToggle } = useContext(ToggleAllContext)
    const { stateTogglePlayMusic, setstateTogglePlayMusic } = useContext(ToggleAllContext)

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="w-[46px] h-[24px] bg-[#08090A] rounded-[50px] flex flex-row justify-between items-center px-[6px] cursor-pointer text-white" style={{ outline: "1px solid rgb(38, 38, 38)" }} >
                <div style={{ zIndex: "15", transition: "color 0.3s ease" }} className="flex flex-row items-center justify-between w-full">
                    {statusPlayMusic && (
                        <>
                            <div className={` ${stateTogglePlayMusic && 'text-[#77dd77]'} ${stateTogglePlayMusic ? 'visible' : 'invisible'} text-white`}>
                                {playIcon}
                            </div>
                            <div className={` ${!stateTogglePlayMusic && 'text-[#FF6347]'} ${!stateTogglePlayMusic ? 'visible' : 'invisible'} text-white`}>
                                {pauseIcon}
                            </div>

                            <div className='bg-slate-200 w-[16px] h-[16px] rounded-[14px]' style={{ position: "absolute", zIndex: "14", transform: stateTogglePlayMusic ? "translateX(20px)" : "translateX(-2px)", transition: "transform 0.3s ease" }} />
                        </>
                    )}

                    {statusPausePlayMusic && (
                        <>
                            <div className={`${stateToggle && 'text-[#77dd77]'} ${stateToggle ? 'visible' : 'invisible'}`}>
                                {musicIcon}
                            </div>
                            <div className={`${!stateToggle && 'text-[#ff6347]'} ${!stateToggle ? 'visible' : 'invisible'}`}>
                                {musicIcon}
                            </div>
                            <div className='bg-slate-200 w-[16px] h-[16px] rounded-[14px]' style={{ position: "absolute", zIndex: "14", transform: stateToggle ? "translateX(20px)" : "translateX(-2px)", transition: "transform 0.3s ease" }} />

                        </>
                    )}

                </div>
            </div>
        </div>
    )
}