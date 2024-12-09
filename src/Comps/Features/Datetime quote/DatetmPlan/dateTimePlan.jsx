import { useEffect, useState } from "react"
import { useContext } from "react";

import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext";


export default function DateTimePlan() {
    const [dateTime, setDateTime] = useState({})

    useEffect(()=> {
        const date = new Date();
        const tanggal = date.getDate();
        const bulan = date.getMonth();
        const tahun = date.getFullYear();

        const listBulan = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

        const namaBulan = listBulan[bulan]

        setDateTime({tanggal, bulan: namaBulan, tahun})
    }, [])

    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    return (
        <>
            <div className="mt-[0px] flex flex-row justify-between gap-[4px] justify-center items-center">
                <div>
                    <p className={`text-xs font-[600] text-${themeActive ? "white" : "black"}`}>Hari ini</p>
                    <p className={`text-[11px] text-${themeActive ? "white" : "black"}`}>{dateTime.tanggal} {dateTime.bulan} {dateTime.tahun}</p>
                </div>
                <div className="flex " style={{color: themeActive ? "white" : "black"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.99 16.5 3.75 3.75m0 0 3.75-3.75m-3.75 3.75V3.75H4.49" />
                    </svg>
                </div>
            </div>
        </>
    )
}