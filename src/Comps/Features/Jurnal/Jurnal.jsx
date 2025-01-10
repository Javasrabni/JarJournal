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

    // STATUS SETTING 
    const [onSetting, setOnSetting] = useState(false)
    const [indexOnSetting, setIndexOnSetting] = useState(null)

    async function HandleAddJurnal() {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/day-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ deskripsiDayJurnal: descDayJurnal })
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

    // DELETE JURNAL
    const HandleDeleteJurnal = async () => {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/del-jurnal`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({ IdxJurnal: indexOnSetting })
            })
            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                setOnSetting(false)
            }
        } catch (err) {
            console.error(err)
        }
    }


    const settingPostIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ rotate: '90deg' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
    const deletePost = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: 'tomato' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>

    return (
        <div>
            {/* <p className="text-[12px] font-[600] text-white">Perjalanan jurnal harianmu</p> */}
            <div className="w-full max-w-[42rem] h-full flex-col gap-[32px] items-center justify-between p-[16px]">

                {/* Add new jurnal */}
                <div className="max-w-[22rem] fixed bottom-0 left-[50%] translate-x-[-50%] w-full p-[16px]">
                    <div className=" h-[64px] w-full cursor-pointer bg-[var(--blue-clr)] rounded-[12px] flex items-center justify-center" onClick={() => setOnWriteJurnal(true)}>
                        <span className="text-white">{plusIcon}</span>
                    </div>
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
                                <div className="w-full bg-[var(--black-card)] text-white p-[12px] flex flex-col gap-[6px] justify-between"
                                    style={{
                                        borderRadius: "0px 8px 8px",
                                        outline: "1px solid var(--black-bg)",
                                    }}
                                >
                                    {/* JUDUL DAN DESKRIPSI */}
                                    <div className="w-full " onClick={() => navigate(`/Jurnal/${index}/${item.descJurnal}`)}>
                                        <p className="text-[12px] text-white font-semibold">
                                            Day {item.day}</p>
                                        <p className="text-[12px] text-[var(--black-subtext)]">
                                            {item.descJurnal}
                                        </p>
                                    </div>

                                    {/* DATE N SETTINGS */}
                                    <div className="flex flex-row items-center justify-between" >
                                        <p className="text-[11px] text-white">{item.date}</p>
                                        <span className="cursor-pointer" onClick={() => { setOnSetting(prev => !prev); setIndexOnSetting(index) }}>{settingPostIcon}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FUNGSI ADD JURNAL (POPUP) */}
            {onWriteJurnal && (
                <OnPopupSetting
                    JurnalSect={true}
                    Heading={`Jurnal Harian`}
                    onClickFunc={() => setOnWriteJurnal(false)}
                    Button1={
                        <div className="w-full h-fit flex flex-row gap-[12px] items-center justify-between">
                            <span className="w-fit shrink-0">
                                {dataDayJournal.length < 1 ? <p className="text-[12px] text-white font-[600] pr-[12px]">Day 1</p> : <p className="text-[12px] text-white font-[600] pr-[12px]">Day {dataDayJournal.slice(-1).map(item => item.day + 1)}</p>}
                            </span>
                            <input className="w-full h-full bg-transparent outline-0 border-0 text-white text-[12px]" type="search" placeholder="Deskripsi" onChange={(e) => setDescDayJurnal(e.target.value)} />
                        </div>
                    }
                    Button2={<p className="text-[12px] font-[600] text-white" onClick={HandleAddJurnal}>Tambah</p>}
                />
            )}

            {/* FUNGSI ON CLICK SETTING JURNAL (POPUP) */}
            {onSetting && (
                <OnPopupSetting
                    Heading={`Hapus Jurnal`}
                    onClickFunc={() => setOnSetting(prev => !prev)}
                    Button2={<button role="button" tabIndex={0} onClick={HandleDeleteJurnal}>
                        <span className="flex flex-row items-center gap-[8px]">
                            {deletePost}
                            <span className="text-[12px] text-white">Hapus</span>
                        </span>
                    </button>}
                />
            )}



        </div>
    )
}