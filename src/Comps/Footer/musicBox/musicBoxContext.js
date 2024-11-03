import { createContext, useEffect, useState } from "react";

export default function MusicBoxProvider({children}) {
    const [statusMusicAxisY, setStatusMusicAxisY] = useState(()=> {
        const saveStateMusicAxisY = localStorage.getItem("saveStateMusicAxisY")
        return saveStateMusicAxisY ? JSON.parse(saveStateMusicAxisY) : true
    })

    useEffect(()=> {
        localStorage.setItem("saveStateMusicAxisY", statusMusicAxisY)
    }, [statusMusicAxisY])

    return (
        <MusicBoxContext.Provider value={{statusMusicAxisY, setStatusMusicAxisY}}>
            {children}
        </MusicBoxContext.Provider>
    )
}

export const MusicBoxContext = createContext()