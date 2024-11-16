import { createContext, useEffect, useState } from "react";

export default function MusicBoxProvider({children}) {
    const [statusMusicAxisY, setStatusMusicAxisY] = useState(()=> {
        const saveStateMusicAxisY = localStorage.getItem("saveStateMusicAxisY")
        return saveStateMusicAxisY ? JSON.parse(saveStateMusicAxisY) : true
    })

    useEffect(()=> {
        localStorage.setItem("saveStateMusicAxisY", statusMusicAxisY)
    }, [statusMusicAxisY])

    
    const [statePopupInfo, setStatePopupInfo] = useState(false) // Popup Info MusicBox
    const [popupReset, setPopupReset] = useState(false) // Popup reset musicBox
    const [boolStateResetPopup, setBoolStateResetPopup]= useState(false) // Boolean popup reset


    return (
        <MusicBoxContext.Provider value={{statusMusicAxisY, setStatusMusicAxisY, statePopupInfo, setStatePopupInfo, popupReset, setPopupReset, boolStateResetPopup, setBoolStateResetPopup}}>
            {children}
        </MusicBoxContext.Provider>
    )
}

export const MusicBoxContext = createContext()