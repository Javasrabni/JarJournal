import { useContext, useEffect, useState } from "react"
import { MusicBoxContext } from "./musicBoxContext"
import CountTime from "./countTime"
import { p } from "framer-motion/client"

export default function MusicBox() {

    const { statusMusicAxisY, setStatusMusicAxisY } = useContext(MusicBoxContext)

    const [musicData, setMusicData] = useState(null)
    const musicPlay = async () => {
        try {
            const response = await fetch('https://668e29d6bf9912d4c92d0971.mockapi.io/api/ListRecp/JarJournal')
            if(!response.ok) {
                throw new Error(`HTTP ERROR, Status: ${response.status}`)
            }

            const data = await response.json()
            setMusicData(data)
        } catch(error) {
            console.error('Error mendapat API', error)
        }
    }

    useEffect(()=> {
        musicPlay()
    }, [])

    const [DivBox, setDivBox] = useState([
        {
            M1: "ap", Box: <div className="w-[52px] h-[52px] bg-[#262626]" style={{ borderRadius: "50px" }}></div>
        },
        {
            M2: "ap1", Box: <div className="w-[52px] h-[52px] bg-[#262626]" style={{ borderRadius: "50px" }}></div>
        },

    ])

    const asoy = DivBox.slice(0, 2)

    const bgScreenTime = '/Assets/background/bg01.jpg'

    const bgStyle = {
        backgroundImage: `url(${bgScreenTime})`,
        backgroundSize: "cover",

    }


    return (
        <>
            {/* Music box */}
            <div className="flex flex-col items-center" style={{}} >
                {/* Button to pull up/down */}
                <div className="flex justify-center items-center w-[52px] h-[14px] bg-black text-white cursor-pointer" style={{ borderRadius: "10px 10px 0px 0px", borderBottom: "1px solid #262626" }} onClick={() => setStatusMusicAxisY((prev) => !prev)}>
                    {statusMusicAxisY ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                    )}
                </div>
                {/* Music */}
                <div className="w-[360px] h-[120px] bg-black p-[16px] text-white">
                    <div>
                        <div className="flex flex-col gap-[6px]">
                            <div className="flex flex-row gap-[6px] items-center" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3" style={{ color: "yellow", filter: "drop-shadow(0px 0px 3px gold)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>


                                <p className="text-[12px] font-[700]">Brain Focus</p>
                            </div>
                            <div className="w-full h-[74px] gap-[16px] flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-[8px]">
                                    {asoy.map((item, index) =>
                                        <div key={index}>
                                            {item.Box}
                                        </div>
                                    )}
                                </div>
                                <div className="cursor-pointer">
                                    {/* {musicData && musicData.length > 1 ? (
                                        <p style={{color: "red"}}>{musicData[0].focusMusic[0].name}</p>
                                    ) : (
                                        <p>loading...</p>
                                    )} */}
                                    <CountTime />
                                </div>
                                <div className="w-[120px] h-[52px] bg-[#262626] rounded-[8px] p-[12px] flex justify-center items-center cursor-pointer" style={{...bgStyle, outline: "1px solid rgb(38, 38, 38)"}}>
                                    <div className="flex flex-row justify-center items-center gap-[8px]">
                                        <p className="text-[10px] font-[600]">Buka layar</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}