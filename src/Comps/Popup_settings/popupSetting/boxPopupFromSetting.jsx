import { createContext, useState } from "react"
import { useContext } from "react"

export default function BoxPopupFromSetting({option_1, option_2, icon_1, icon_2}) {

    const { option1_Status, setOption1_Status } = useContext(PopupFrSettingsContext)

    // Option 1 status state
    function option1Status() {
        setOption1_Status(true)
    }

    return (
        <div className="w-fit h-fit bg-white rounded" style={{outline: "1px solid black"}}>
            <div className="flex flex-col gap-[0px] text-black">
                <span className="flex flex-row gap-[4px] px-[6px] py-[4px] align-center h-full justify-between hover:bg-gray-200 rounded" onClick={option1Status}>
                    <p className="text-[10px]">{option_1}</p>
                    <span className="mt-[2px]">
                        {icon_1}
                    </span>
                </span>
                {/* <span className="flex flex-row gap-[4px] px-[6px] py-[4px] align-center h-full justify-between hover:bg-gray-200 rounded">
                    <p className="text-[10px]">{option_2}</p>
                    <span className="mt-[2px]">
                        {icon_2}
                    </span>
                </span> */}
            </div>
        </div>
    )
}

export const PopupFrSettingsContext = createContext()

export function PopupFrSettingsProvider({children}) {
    const [option1_Status, setOption1_Status] = useState(false)
    const [checkOption1Status, setCheckOption1Status] = useState(false)

    return (
        <PopupFrSettingsContext.Provider value={{option1_Status, setOption1_Status, checkOption1Status, setCheckOption1Status}}>
            {children}
        </PopupFrSettingsContext.Provider>
    )
}
