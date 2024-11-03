import { useState, useEffect, useRef } from "react"

export default function CountTime() {
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
        if(!confirmWindow) {
            return;
        } else {
            setTime(0); 
            setOnReset(true);
        }
    }

    const play = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>

    const pause = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>

    return (
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
    )
}

