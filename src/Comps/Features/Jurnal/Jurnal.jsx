import { useState, useContext, useEffect } from "react"
import MoodToday from "../Datetime quote/moodToday/moodToday"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { OnPopupSetting } from "../Publikasi/pubPage/publikasi"
import { JurnalContext } from "./Context/jurnalContext"
import { useNavigate } from "react-router-dom"

export default function Jurnal() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const navigate = useNavigate()

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
                // alert(message)
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
                <div className="flex flex-col mt-[32px] gap-[16px]">
                    {/* Indikator Minggu */}
                    {/* <span className="mb-[12px]">
                                <p className="text-[12px] text-white">Minggu ke-{weekIndex + 1}</p>
                            </span> */}
                    <div className="flex flex-row gap-[12px] flex-wrap">
                        {dataDayJournal.map((item, index) => (
                            <div
                                key={index}
                                className="flex-col w-[48%]"
                                onClick={() => navigate(`/Jurnal/${index}/${item.descJurnal}`)}
                            >
                                {/* Efek Folder */}
                                <div
                                    className="w-[52px] h-[6px]"
                                    style={{
                                        borderRadius: "8px 8px 0px 0px",
                                        backgroundColor: "var(--black-bg)",
                                    }}
                                ></div>

                                {/* Konten Jurnal */}
                                <div
                                    className="w-full bg-[var(--black-card)] text-white p-[12px] flex flex-row gap-[6px] justify-between items-center"
                                    style={{
                                        borderRadius: "0px 8px 8px",
                                        outline: "1px solid var(--black-bg)",
                                    }}
                                >
                                    <div>
                                        <p className="text-[12px] text-white font-semibold">
                                            Day {item.day}</p>
                                        <p className="text-[12px] text-[var(--black-subtext)]">
                                            {item.descJurnal}
                                        </p>
                                        <span>
                                            <p className="text-[11px] text-white mt-[12px]">{item.date}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>

            </div>

            {onWriteJurnal && (
                <OnPopupSetting
                    JurnalSect={true}
                    Heading={`Jurnal Harian`}
                    onClickFunc={() => setOnWriteJurnal(false)}
                    Button1={
                        <div className="w-full h-fit flex flex-row gap-[12px] items-center justify-between">
                            <span className="w-fit shrink-0">
                                <p className="text-[12px] text-white font-[600] pr-[12px]" style={{ borderRight: '1px solid var(--black-subtext)' }}>Day {dataDayJournal.length + 1}</p>
                            </span>
                            <input className="w-full h-full bg-transparent outline-0 border-0 text-white text-[12px]" type="text" placeholder="Deskripsi" onChange={(e) => setDescDayJurnal(e.target.value)} />
                        </div>
                    }
                    Button2={<p className="text-[12px] font-[600] text-white" onClick={HandleAddJurnal}>Tambah</p>}
                />
            )}

        </div>
    )
}