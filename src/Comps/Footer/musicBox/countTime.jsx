import { useState, useEffect, useRef } from "react"

export default function CountTime({ BFPage }) {
    const [onReset, setOnReset] = useState(false)

    const [time, setTime] = useState(() => {
        const saveTime = localStorage.getItem('saveTime')
        return saveTime ? JSON.parse(saveTime) : 0
    })

    const [timeRunning, setTimeRunning] = useState(false)

    const playRef = useRef()

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
        const confirmWindow = window.confirm('ingin reset?')
        if (!confirmWindow) {
            return;
        } else {
            setTime(0);
            setOnReset(true);
        }
    }

    const play = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "6" : "3"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

    const pause = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className={`size-${BFPage ? "6" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>

    const nextMusic = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
    </svg>


    return (
        <>
            {BFPage ? (
                // BRAIN FOCUS PAGE UI
                <div className="w-full h-full flex flex-col justify-between items-center">
                    <div>
                        <p className="font-[700] text-[54px]">{formatTime(time)}</p >

                    </div>
                    <div className="flex flex-col gap-[8px] items-center justify-center h-[20px]">
                        <div className="flex flex-row gap-[16px] items-center">
                            <span style={{ outline: "2px solid white" }} className="w-[38px] h-[38px] rounded-[50px] flex justify-center items-center">
                                <button onClick={() => {
                                    setTimeRunning((prev) => !prev)
                                    if (timeRunning) clearInterval(playRef.current)
                                    setTimeRunning(!timeRunning)
                                }}>
                                    {timeRunning ? pause : play}</button>
                            </span>
                            <button>
                                <i class="fa-solid fa-forward-step"></i>
                            </button>

                        </div>
                        <button onClick={resetTime} className="text-[10px] mt-[0px]">Reset</button>
                    </div>
                </div>
            ) : (
                // GENERAL UI
                <div className="w-[62px]">
                    <p className="font-[700] text-[14px]">{formatTime(time)}</p>
                    <div className="flex flex-row gap-[8px] items-center h-[20px]">
                        <button onClick={() => {
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

