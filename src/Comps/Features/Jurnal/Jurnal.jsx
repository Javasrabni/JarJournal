import { useState, useContext, useEffect } from "react"
import MoodToday from "../Datetime quote/moodToday/moodToday"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { OnPopupSetting } from "../Publikasi/pubPage/publikasi"

export default function Jurnal() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    const [onWriteJurnal, setOnWriteJurnal] = useState(false)

    const [dataDayJournal, setDataDayJournal] = useState([])

    async function HandleAddJurnal() {
        try {
            const response = await fetch(`${API_URL_CONTEXT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                // setAddNewDayJournal(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {/* <p className="text-[12px] font-[600] text-white">Perjalanan jurnal harianmu</p> */}
            <div className="w-full h-full flex items-center justify-between p-[16px]">

                {/* Add new jurnal */}
                <div className="w-full h-[80px] cursor-pointer bg-[var(--black-bg)] rounded-[12px] flex items-center justify-center" onClick={() => setOnWriteJurnal(true)}>
                    <span className="text-white">{plusIcon}</span>
                </div>

                {onWriteJurnal && (
                    <OnPopupSetting
                        JurnalSect={true}
                        Heading={`Jurnal Harian`}
                        onClickFunc={() => setOnWriteJurnal(false)}
                        Button1={
                            <div className="w-full h-fit flex flex-row gap-[12px] items-center justify-between">
                                <span className="w-fit shrink-0">
                                    <p className="text-[12px] text-white font-[600] pr-[12px]" style={{borderRight: '1px solid var(--black-subtext) '}}>Day {dataDayJournal.length + 1}</p>
                                </span>
                                <input className="w-full h-full bg-transparent outline-0 border-0 text-white text-[12px]" type="text" placeholder="Deskripsi" />
                            </div>
                        }
                        Button2={<p className="text-[12px] font-[600] text-white">Tambah</p>}
                    />
                )}



                {/* Day jurnal */}
                <div>
                    {dataDayJournal.map((item, index) =>
                        <div className="w-[full] h-[80px] bg-[var(--black-card)]">
                            <p className="text-[12px] text-white font-[600]">Day {index + 1}</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}