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

    const soundIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>

    const resetIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`size-${BFPage ? "4" : "3.5"}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
  </svg>
  



    return (
        <>
            {BFPage ? (
                // BRAIN FOCUS PAGE UI
                <div className="w-full h-full flex flex-col justify-between items-center">
                    <div className="w-full flex items-center justify-center">
                        <p className="font-[700] text-[54px]">{formatTime(time)}</p >
                    </div>
                    <div className="w-full flex flex-col gap-[8px] items-center justify-center h-[20px] p-[32px]">
                        <div className="w-full flex flex-row items-center justify-between">
                            {/* <span style={{ outline: "2px solid white" }} className="w-[38px] h-[38px] rounded-[50px] flex justify-center items-center"> */}
                            <div className="flex items-center">
                                <button onClick={resetTime} className="text-[10px] mt-[0px] underline">{resetIcon}</button>
                            </div>

                            <div className="flex flew-row gap-[24px] items-center">
                                <button>
                                    <i class="fa-solid fa-forward-step" style={{ transform: "rotate(180deg)" }}></i>
                                </button>
                                <button onClick={() => {
                                    setTimeRunning((prev) => !prev)
                                    if (timeRunning) clearInterval(playRef.current)
                                    setTimeRunning(!timeRunning)
                                }}>
                                    {timeRunning ? pause : play}</button>
                                {/* </span> */}
                                <button>
                                    <i class="fa-solid fa-forward-step"></i>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button>
                                    {soundIcon}
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

