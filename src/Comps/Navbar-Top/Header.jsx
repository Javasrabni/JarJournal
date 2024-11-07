import { useEffect, useState, useContext} from "react";
import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MemoContext } from "../Features/Memo/MemoContext";
import { PopupFrSettingsContext } from "../Popup_settings/popupSetting/boxPopupFromSetting";
import { ThemeAppContext } from "../Features/Theme/toggleTheme.jsx/ThemeAppContext";

export default function Header({nameTools, sloganTools}) {
    const pathLocation = useLocation()
    const navigate = useNavigate()
    const {id} = useParams()

    const appName = "JarJournal";
    const appSlogan = "Achieve your goals";

    const [judulHeader, setJudulHeader] = useState(appName)
    
    useEffect(() => {
        pathLocation.pathname === "/ftr/Jurnal" && setJudulHeader("Jurnal")
        pathLocation.pathname === "/ftr/Catatan" && setJudulHeader("Catatan")
        pathLocation.pathname === "/ftr/E-Book" && setJudulHeader("E-Book")
        pathLocation.pathname === "/BrainFocus" && setJudulHeader("BrainFocus")
    },[])

    
    // Memo Section
    const { indicatorFromMemo, setIndicatorFromMemo, memoInputValue, setMemoInputValue, setValueMemo, valueMemo, afterEditValueMemo, setAfterEditValueMemo, editValueMemoStatus, setEditValueMemoStatus} = useContext(MemoContext)
    
    // edit option clicked
    const { option1_Status, setOption1_Status, checkOption1Status, setCheckOption1Status } = useContext(PopupFrSettingsContext)

    function HandleClick() {
        if(!memoInputValue) {
            setIndicatorFromMemo(false)
            setMemoInputValue('')
            return
        } else {
            // setIndicatorFromMemo(false)
            setValueMemo((prevValue) => [...prevValue, memoInputValue])
        }

        setOption1_Status(false)
        setIndicatorFromMemo(false)
        setMemoInputValue('')
    }

    function HandleOption1() {
        setOption1_Status(false)
    }
    

    useEffect(()=> {
        if(option1_Status) {
            setIndicatorFromMemo(true)
        }
    }, [option1_Status])

    // Hide Check when value memo is zero 0
    useEffect(()=> {
        if(valueMemo.length < 1) {
            setIndicatorFromMemo(false)
        }
    }, [valueMemo])

    // Theme app
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)


    return (
        <div className={`bg-${themeActive ? "black" : "white"} w-full h-fit p-[16px] flex flex-row justify-between items-center`}>
                
            <div className="text-white flex gap-[8px]" onClick={()=> navigate('/')}>
                <img src="/Assets/Icon/star.svg" alt="JarJournal Icon" style={{filter: "drop-shadow(0px 0px 12px gold)"}} width={'32px'}/>
                <div>
                    <h1 className={`text-[12px] font-semibold text-${themeActive ? "white" : "black"}`}>{judulHeader}</h1>
                    <p className="text-[10px] text-[#999] font-medium">{appSlogan}</p>
                </div>
            </div>

            {/* Auth section */}
            {/* <div className="w-fit h-fit flex justify-center items-center">
                    <div onClick={()=> {HandleOption1(); HandleClick()}}>
                    {indicatorFromMemo && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    )}
                    </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div> */}
        </div>
    )
}