import { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import './styleBF.css'
import { BrainFContext } from "../../Features/brainFocus/BrainFContext"
import ToggleAll from "../../toggle/toggleAll"
import { ToggleAllContext } from "../../toggle/toggleContext"
import PopupLegend from "../../Popup/Popup-typ1/PopupLegend"
import { motion } from 'framer-motion'
import { MusicBoxContext } from "./musicBoxContext"



export default function CountTime({ BFPage }) {
    const { stateToggle, setStateToggle, stateTogglePlayMusic, setstateTogglePlayMusic } = useContext(ToggleAllContext)
    const [onReset, setOnReset] = useState(false)

    const [time, setTime] = useState(() => {
        const saveTime = localStorage.getItem('saveTime')
        return saveTime ? JSON.parse(saveTime) : 0
    })

    const [timeRunning, setTimeRunning] = useState(false)

    const playRef = useRef()

    const { popupReset, setPopupReset, boolStateResetPopup, setBoolStateResetPopup } = useContext(MusicBoxContext)

    function formatTime(time) {
        let hour = Math.floor(time / 60 / 60 % 24)
        let minutes = Math.floor(time / 60 % 60)
        let seconds = Math.floor(time % 60)

        hour = hour < 10 ? '0' + hour : hour
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        return `${hour}.${minutes}.${seconds}`
    }


    useEffect(() => {
        if (timeRunning) {
            playRef.current = setInterval(() => {
                setTime((prevtime) => {
                    let newTime = prevtime + 1
                    localStorage.setItem('saveTime', JSON.stringify(newTime));
                    return newTime;
                })
            }, 1000)
        }




        return () => clearInterval(playRef.current)

    }, [timeRunning])



    // Confirm reset
    function resetTime() {
        setPopupReset((prev) => !prev)
    }
    // Reset timer akan terjadi bila bool popupReest => true dan boolstateReset popup => true, true berasal dari btn 'Ya' pada popup reset
    useEffect(() => {
        // boolStateResetPopup (state from validate popup reset) 
        let delayReset;
        if (popupReset && boolStateResetPopup) {
            delayReset = setTimeout(() => {
                setTime(0);
                setOnReset(true);
                localStorage.removeItem('saveTime');
                setPopupReset((prev) => !prev)
            }, 200)
        }
        return () => clearTimeout(delayReset)
    }, [boolStateResetPopup])

    const play = <svg xmlns="http://www.w3.org/2000/svg" fill={stateTogglePlayMusic ? "#77dd77" : BFPage ? 'white' : 'white'} viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${ToggleAll ? "3" : BFPage ? "4" : "3"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

    const pause = <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className={`size-${ToggleAll ? "3" : BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>

    const nextMusic = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
    </svg>

    const soundIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>

    const resetIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
    </svg>

    const musicIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${ToggleAll ? "3" : BFPage ? '4' : "3"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
    </svg>

    const switchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? '4' : "3"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>

    const timeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? '4' : "3"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>


    const playMusicRef = useRef();
    const [stateMusic, setStateMusic] = useState(false)
    const [musicData, setMusicData] = useState([])
    const [musicIndex, setMusicIndex] = useState(null)
    const [musicName, setMusicName] = useState('')

    const musicFetch = async () => {
        try {
            const response = await fetch('https://668e29d6bf9912d4c92d0971.mockapi.io/api/ListRecp/JarJournal')
            const dataRes = await response.json()
            if (!response.ok) {
                console.log(`Http Error ${response.status}`)
            } else {
                setMusicData(dataRes)
                setMusicIndex(Math.floor(Math.random() * dataRes.length))
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Play random music
    const randomMusicIndex = () => {
        if (musicData.length > 0) {
            const IndexFloor = Math.floor(Math.random() * musicData.length)
            setMusicIndex(IndexFloor)
            setStateMusic((prev) => !prev)
        }
    }

    // toggle play n pause music
    const toggleMusic = () => {
        if (playMusicRef.current) {
            if (stateMusic) {
                playMusicRef.current.play()
            } else {
                playMusicRef.current.pause()
            }
            setStateMusic((prev) => !prev)
        }
        // Toggle
        setStateToggle((prev) => !prev)

    }

    const [statePlayBtnMusic, setStatePlayBtnMusic] = useState(false)

    useEffect(() => {
        if (musicIndex !== null && musicData[musicIndex] && playMusicRef.current) {
            playMusicRef.current.src = musicData[musicIndex].musicPlay
            console.log(playMusicRef.current)
            if (stateMusic) {
                playMusicRef.current.play()
            } else {
                playMusicRef.current.pause()
            }
        }
    }, [stateMusic])

    // Music name
    useEffect(() => {
        if (musicData.length > 0 && playMusicRef.current) {
            const musicSrc = playMusicRef.current.src
            const musicName = musicData.find((name) => name.musicPlay === musicSrc)
            if (musicName) {
                setMusicName(musicName.name)
            }
        }
    }, [musicData, musicName])

    useEffect(() => {
        musicFetch()
    }, [])

    const { switchUIBrainFocus, setSwitchUIBrainFocus } = useContext(BrainFContext)


    return (
        <>


            {BFPage ? (
                // BRAIN FOCUS PAGE UI
                <div className="w-full h-full flex flex-col items-center">
                    {/* Timer */}
                    <div className="w-full flex flex-col items-center mt-[50%]" >
                        <p className="font-[700] text-[52px]">{formatTime(time)}</p >
                        {/* Music name */}
                        <span className="flex flex-row gap-[12px] items-center">
                            <span className="radar"></span>
                            <p className="text-[12px] font-[600]">{musicName}</p>
                        </span>
                    </div>

                    {/* Music Control */}
                    <div className="w-full flex flex-col gap-[8px] items-center justify-center h-[20px] p-[32px] " style={{ position: "fixed", bottom: "0px", width: "360px", backdropFilter: "blur(3px)", backgroundColor: "#00000050", borderTop: "rgb(38, 38, 38) solid 1px" }}>
                        <div className="w-full flex flex-row items-center justify-around">
                            {/* <span style={{ outline: "2px solid white" }} className="w-[38px] h-[38px] rounded-[50px] flex justify-center items-center"> */}
                            <div className="flex items-center">
                                <button onClick={resetTime} className="text-[10px] mt-[0px]">
                                    {timeIcon}
                                </button>
                            </div>


                            <div className="flex flew-row gap-[16px] items-center">
                                {/* forward */}
                                {/* <button>
                                    <i class="fa-solid fa-forward-step" style={{ transform: "rotate(180deg)" }}></i>
                                </button> */}
                                {/* Play music */}
                                <audio ref={playMusicRef} onEnded={randomMusicIndex} />


                                {/* Pause music */}
                                <button onClick={toggleMusic}>
                                    <ToggleAll
                                        statusPausePlayMusic={true}
                                        musicIcon={musicIcon}
                                    />
                                </button>

                                {/* Play music & timer */}
                                <button onClick={() => {
                                    setStatePlayBtnMusic((prev) => !prev)
                                    setTimeRunning((prev) => !prev)
                                    if (timeRunning) clearInterval(playRef.current)
                                    setTimeRunning(!timeRunning)
                                    // Toggle
                                    setstateTogglePlayMusic((prev) => !prev)
                                }} className="w-[35px] h-[35px] p-[6px] bg-[transparent] text-white rounded-[50px] ">
                                    <ToggleAll
                                        statusPlayMusic={true}
                                        playIcon={play}
                                        pauseIcon={pause}
                                    />
                                </button>


                            </div>
                            {/* next */}
                            <button onClick={() => { randomMusicIndex(); setStatePlayBtnMusic((prev) => !prev) }} className="w-fit px-[16px] h-[24px] bg-[#08090A] rounded-[50px] flex flex-row justify-between items-center px-[6px] cursor-pointer text-white" style={{ outline: "1px solid rgb(38, 38, 38)" }}>
                                <i class="fa-solid fa-forward-step" style={{ fontSize: "10px" }}></i>
                            </button>

                            <div className="flex items-center">
                                <button onClick={() => setSwitchUIBrainFocus((prev) => !prev)}>
                                    {switchIcon}
                                </button>
                            </div>


                        </div>

                    </div>
                </div>
            ) : (
                // GENERAL UI
                <div className="w-[62px]">
                    <p className="font-[700] text-[14px]">{formatTime(time)}</p>
                    <div className="flex flex-row gap-[8px] items-center h-[20px]">
                        <audio ref={playMusicRef} onEnded={randomMusicIndex} />


                        {/* Play music */}
                        <button onClick={() => {
                            // randomMusicIndex()
                            setTimeRunning((prev) => !prev)
                            if (timeRunning) clearInterval(playRef.current)
                            setTimeRunning(!timeRunning)
                        }}>{timeRunning ? pause : play}</button>
                        <button onClick={resetTime} className="text-[10px] mt-[0px]">Reset</button>
                    </div>
                </div>

            )}
        </>
    )
}