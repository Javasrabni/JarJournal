import { useState, useContext, useEffect } from "react"
import MoodToday from "../Datetime quote/moodToday/moodToday"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { OnPopupSetting } from "../Publikasi/pubPage/publikasi"
import { JurnalContext } from "./Context/jurnalContext"

export default function Jurnal() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    const { onWriteJurnal, setOnWriteJurnal } = useContext(JurnalContext)

    const { dataDayJournal, setDataDayJournal } = useContext(JurnalContext)
    const [descDayJurnal, setDescDayJurnal] = useState('')

    async function HandleAddJurnal() {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/day-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ dayJurnal: (dataDayJournal.length + 1), deskripsiDayJurnal: descDayJurnal })
            })
            if (response.ok) {
                setDescDayJurnal('')
                const { message } = await response.json()
                alert(message)
                setOnWriteJurnal(false)
                // setAddNewDayJournal(data)
            }
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            {/* <p className="text-[12px] font-[600] text-white">Perjalanan jurnal harianmu</p> */}
            <div className="w-full h-full flex-col gap-[32px] items-center justify-between p-[16px]">

                {/* Add new jurnal */}
                <div className="w-full h-[80px] cursor-pointer bg-[var(--black-bg)] rounded-[12px] flex items-center justify-center" onClick={() => setOnWriteJurnal(true)}>
                    <span className="text-white">{plusIcon}</span>
                </div>

                {/* Output Jurnal harian */}
                <div className="flex flex-row gap-[12px] mt-[32px] flex-wrap ">
                    {dataDayJournal && dataDayJournal.map((item, index) =>
                        <div key={index} className="w-[120px] h-[120px] bg-[var(--black-bg)] rounded-[12px] shrink-0 p-[16px]" onClick={()=> console.log(index)}>
                            <p className="text-[12px] text-white font-[600]">Day {index + 1}</p>
                            <p className="text-[12px] text-[var(--black-subtext)]">{item.descJurnal}</p>
                        </div>

                    )}
                </div>

                {onWriteJurnal && (
                    <OnPopupSetting
                        JurnalSect={true}
                        Heading={`Jurnal Harian`}
                        onClickFunc={() => setOnWriteJurnal(false)}
                        Button1={
                            <div className="w-full h-fit flex flex-row gap-[12px] items-center justify-between">
                                <span className="w-fit shrink-0">
                                    <p className="text-[12px] text-white font-[600] pr-[12px]" style={{ borderRight: '1px solid var(--black-subtext) ' }}>Day {dataDayJournal.length + 1}</p>
                                </span>
                                <input className="w-full h-full bg-transparent outline-0 border-0 text-white text-[12px]" type="text" placeholder="Deskripsi" onChange={(e) => setDescDayJurnal(e.target.value)} />
                            </div>
                        }
                        Button2={<p className="text-[12px] font-[600] text-white" onClick={HandleAddJurnal}>Tambah</p>}
                    />
                )}

            </div>

        </div>
    )
}