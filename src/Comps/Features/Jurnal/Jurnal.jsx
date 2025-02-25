import { useState, useContext, useEffect } from "react"
import MoodToday from "../Datetime quote/moodToday/moodToday"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { OnPopupSetting } from "../Publikasi/pubPage/publikasi"
import { JurnalContext } from "./Context/jurnalContext"
import { useNavigate } from "react-router-dom"
import { desc, div, i, li, pre } from "framer-motion/client"

export default function Jurnal() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const navigate = useNavigate()

    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    const { onWriteJurnal, setOnWriteJurnal } = useContext(JurnalContext)

    const { outputDataUserJurnal, setOutputDataUserJurnal } = useContext(JurnalContext)

    // DATA TO SEND INTO SERVER
    const [dataInputFieldJurnal, setDataInputFieldJurnal] = useState(
        {
            day: outputDataUserJurnal?.length > 0 ? outputDataUserJurnal.length + 1 : 1,
            descJurnal: null,
            fotoJurnal: null,
            moodToday: null,
            moodtype: null,
            date: new Date().toLocaleString('id-Id', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hourCycle: 'h23'
            }),
            evaluasi: null,
            myGoals: [],
            whatIHaveLearned: null,
            motivation: null,
            productivity: 0,
            gratefulFor: null,
            improve: null,
            folderColor: null,
        }
    )

    useEffect(() => {
        console.log(dataInputFieldJurnal)
    }, [dataInputFieldJurnal])

    // CHOOSE MOOD JURNAL
    const [handleClickEmot, setHandleClickEmot] = useState(null)
    // STATUS FIELD JURNAL TO VISIBLE
    const [statusFieldJurnal, setStatusFieldJurnal] = useState(0)
    /* 
        0 = Mood today 
        1 = Evaluasi
        2 = goals
        3 = what i have learned
        4 = motivation
        5 = produktifitas
        6 = grateful
        7 = improve
        8 = folder color (opsional)
    */
    const [progressBarJurnalField, setProgressBarJurnalField] = useState(0)
    // MY GOAL INPUT
    const [myGoalJurnal, setMyGoalJurnal] = useState([])

    // STATUS SETTING 
    const [onSetting, setOnSetting] = useState(false)
    const [indexOnSetting, setIndexOnSetting] = useState(null)

    // ON AUTO FILL INPUT STATE
    const [inputFieldJurnalState, setInputFieldJurnalState] = useState(false)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)

    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)

    console.log(dataInputFieldJurnal.descJurnal)
    async function HandleAddJurnal() {
        try {
            const payloadData = new FormData()
            payloadData.append('userId', userId)
            payloadData.append('day', dataInputFieldJurnal.day)
            payloadData.append('descJurnal', dataInputFieldJurnal.descJurnal)
            payloadData.append('file', dataInputFieldJurnal.fotoJurnal)
            payloadData.append('moodToday', dataInputFieldJurnal.moodToday)
            payloadData.append('moodType', dataInputFieldJurnal.moodtype)
            payloadData.append('date', dataInputFieldJurnal.date)
            payloadData.append('evaluasi', dataInputFieldJurnal.evaluasi)
            payloadData.append('myGoals', dataInputFieldJurnal.myGoals)
            payloadData.append('whatIHaveLearned', dataInputFieldJurnal.whatIHaveLearned)
            payloadData.append('motivation', dataInputFieldJurnal.motivation)
            payloadData.append('productivity', dataInputFieldJurnal.productivity)
            payloadData.append('gratefulFor', dataInputFieldJurnal.gratefulFor)
            payloadData.append('improve', dataInputFieldJurnal.improve)
            payloadData.append('folderColor', dataInputFieldJurnal.folderColor)
            const response = await fetch(`${API_URL_AUTH}/post/user_jurnal  `, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, body: payloadData
            })
            const data = await response.json()
            if (response.ok) {
                // Tambahkan data baru ke state outputDataUserJurnal
                // const newJournal = { ...payLoad }; // Pastikan struktur sesuai
                // setOutputDataUserJurnal(prevJournals => [...prevJournals, newJournal]);
                // alert(message)
                setRefreshData(prev => !prev)
                setOnWriteJurnal(false)
                const delay = setTimeout(() => {
                    navigate(`/Jurnal/${outputDataUserJurnal.id}/${dataInputFieldJurnal.descJurnal ?? "JurnalHarian"}`)
                }, 300)

                setInputFieldJurnalState(false)
                // setAddNewDayJournal(data)
                return () => clearTimeout(delay)
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
                navigate(0)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const { emotOutput } = useContext(JurnalContext) //Get emotixcon API

    const settingPostIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ rotate: '90deg' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
    const deletePost = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: 'tomato' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    const nextArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
    const AddIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    return (
        <div>
            {/* <p className="text-[12px] font-[600] text-white">Perjalanan jurnal harianmu</p> */}
            <div className="w-full max-w-[42rem] h-full flex-col gap-[32px] items-center justify-between p-[16px]">

                {/* Add new jurnal */}
                {!inputFieldJurnalState && (
                    <div className="max-w-[22rem] fixed bottom-[12px] left-[50%] translate-x-[-50%] w-full p-[16px] z-[20]">
                        <div className=" h-[42px] w-full cursor-pointer bg-[var(--blue-clr)] rounded-[12px] flex items-center justify-center" onClick={() => setOnWriteJurnal(true)}>
                            <span className="text-white">{plusIcon}</span>
                        </div>
                    </div>
                )}


                {/* Output Jurnal harian */}
                <div className="flex flex-col mt-[32px] gap-[16px] pb-[80px] ">
                    {/* Indikator Minggu */}
                    {/* <span className="mb-[12px]">
                                <p className="text-[12px] text-white">Minggu ke-{weekIndex + 1}</p>
                            </span> */}
                    <div className="flex flex-row gap-[12px] flex-wrap ">
                        {(Array.isArray(outputDataUserJurnal) ? outputDataUserJurnal : [])
                            .filter(user => user.userId === userId).length > 0 ? (
                            outputDataUserJurnal
                                .filter(user => user.userId === userId)
                                .map(item => (
                                    <div key={item.id} className="flex-col w-[48%]">
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
                                            className="w-full bg-[var(--black-card)] text-white p-[12px] flex flex-col gap-[6px] justify-between"
                                            style={{
                                                borderRadius: "0px 8px 8px",
                                                outline: "1px solid var(--black-bg)",
                                            }}
                                        >
                                            {/* JUDUL DAN DESKRIPSI */}
                                            <div
                                                className="w-full"
                                                onClick={() => navigate(`/Jurnal/${item.id}/${item.descJurnal}`)}
                                            >
                                                <p className="text-[12px] text-white font-[600]">
                                                    Day {item.day}
                                                </p>
                                                <p className="text-[12px] text-[var(--black-subtext)]">
                                                    {item.descJurnal}
                                                </p>
                                            </div>

                                            {/* DATE N SETTINGS */}
                                            <div className="flex flex-row items-center justify-between">
                                                <p className="text-[11px] text-white">{item.date}</p>
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setOnSetting((prev) => !prev);
                                                        setIndexOnSetting(item.id);
                                                    }}
                                                >
                                                    {settingPostIcon}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="w-full min-h-[50svh] h-full flex flex-col items-center justify-center text-white">
                                <span>
                                    <img
                                        src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737171056/Line_1_a7ivrx.svg"
                                        alt="jurnal report icon"
                                        className="w-full h-full"
                                    />
                                </span>
                                <p className="text-[12px]">Ayo kita buat jurnal pertamamu</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* FUNGSI ADD JURNAL (POPUP) */}
            {
                onWriteJurnal && (
                    <OnPopupSetting
                        JurnalSect={true}
                        Heading={`Jurnal Harian`}
                        onClickFunc={() => setOnWriteJurnal(false)}
                        Button1={
                            <div className="w-full h-fit flex flex-row gap-[12px] items-center justify-between">
                                <span className="w-fit shrink-0">
                                    <p className="text-[12px] font-[600] text-white">Day {outputDataUserJurnal ? '1' : outputDataUserJurnal.length + 1}</p>
                                </span>
                                <input className="w-full h-full bg-transparent outline-0 border-0 text-white text-[12px]" type="search" placeholder="Deskripsi" onChange={(e) => setDataInputFieldJurnal((prevState) => ({ ...prevState, descJurnal: e.target.value }))} />
                            </div>
                        }
                        Button2={<p className="text-[12px] font-[600] text-white" onClick={() => { setTimeout(() => { setInputFieldJurnalState(true); setOnWriteJurnal(false); }, 1000) }}>Tambah</p>}
                    />
                )
            }

            {/* FUNGSI ON CLICK SETTING JURNAL (POPUP) */}
            {
                onSetting && (
                    <OnPopupSetting
                        Heading={`Hapus Jurnal`}
                        onClickFunc={() => setOnSetting(prev => !prev)}
                        Button2={<button role="button" onClick={HandleDeleteJurnal}>
                            <span className="flex flex-row items-center gap-[8px]">
                                {deletePost}
                                <span className="text-[12px] text-white">Hapus</span>
                            </span>
                        </button>}
                    />
                )
            }

            {/* POPUP INPUT FIELD JURNAL AFTER USER CLICKING ADD JURNAL */}
            {
                inputFieldJurnalState && (
                    <PopupModal
                        onClickFunc={() => setInputFieldJurnalState(false)}
                        Heading={<p className="text-[12px] font-[600] text-center">Day {outputDataUserJurnal ? '1' : outputDataUserJurnal.map(item => item.day + 1)}</p>}

                        subHeading={<p className="text-[11px] text-[var(--black-subtext)] text-center pb-[8px]" style={{ borderBottom: '1px solid var(--black-border)' }}>{new Date().toLocaleString('id-Id', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hourCycle: 'h23'
                        })}</p>}
                        bodySect={
                            <div className="w-full h-fit">
                                <div className="flex flex-col gap-[12px] w-full">
                                    {statusFieldJurnal === 0 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Bagaimana perasaan kamu hari ini</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center relative" >
                                                {emotOutput.map((item, idx) =>
                                                    <div className={`w-[35px] h-[35px] overflow-hidden ${handleClickEmot === idx ? 'bg-[var(--blue-clr)]' : "bg-[var(--black-bg)]"} p-[0px] rounded-[8px]`}>
                                                        <img src={item.emotUrl} alt={item.type} className={`w-full h-full object-cover `} style={{ transform: 'scale(300%)' }} onClick={() => {
                                                            setDataInputFieldJurnal((prevState) => ({
                                                                ...prevState, moodToday: item.emotUrl, moodtype: item.type
                                                            })); setHandleClickEmot(idx);
                                                        }} />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 1 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Evaluasi yang dilakukan</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center w-full" >
                                                <textarea
                                                    placeholder="Bagaimana dengan evaluasi hari ini?"
                                                    className="p-[12px] w-full flex rounded-[6px] bg-[var(--black-bg)] resize-none outline-none text-white text-[11px]"
                                                    rows={4}
                                                    value={dataInputFieldJurnal.evaluasi}
                                                    onChange={(e) => { setDataInputFieldJurnal((prevState) => ({ ...prevState, evaluasi: e.target.value })) }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 2 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Goal kamu hari ini apa aja?</p>
                                            </span>
                                            <div className="flex flex-col gap-[6px] items-center justify-center w-full" >
                                                {/* INPUT GOAL */}
                                                <div className="w-full h-[90px] bg-[var(--black-bg)] rounded-[6px] p-[12px]">
                                                    <span className="w-full flex gap-[8px]">
                                                        <input type="text" className="text-[11px] text-white bg-[var(--black-bg)] rounded-[4px] w-full outline-none border-none px-[8px]" value={myGoalJurnal} onChange={(e) => setMyGoalJurnal(e.target.value)} placeholder="Tambah goal" />

                                                        <button className="text-white bg-[var(--blue-clr)] px-[2px] py-[2px] rounded-[4px]" onClick={() => { setDataInputFieldJurnal((prevState) => ({ ...prevState, myGoals: [...(prevState.myGoals || []), myGoalJurnal] })); setMyGoalJurnal(''); }}>{AddIcon}</button>
                                                    </span>

                                                    {/* OUTPUT GOAL */}
                                                    <div className="w-full pl-[8px] h-full max-h-[calc(90px-54px)] overflow-auto mt-[12px]">
                                                        <ul>
                                                            {dataInputFieldJurnal.myGoals && dataInputFieldJurnal.myGoals.map((goal, idx) => (
                                                                <li key={idx} className="text-[11px] text-white">{idx + 1}. {goal}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>


                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 3 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Pelajaran yang didapat hari ini</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center w-full" >
                                                <textarea
                                                    placeholder="Apa yang sudah kamu pelajari dan pelajaran yang didapat hari ini?"
                                                    className="p-[12px] w-full flex rounded-[6px] bg-[var(--black-bg)] resize-none outline-none text-white text-[11px]"
                                                    rows={4}
                                                    value={dataInputFieldJurnal.whatIHaveLearned}
                                                    onChange={(e) => { setDataInputFieldJurnal((prevState) => ({ ...prevState, whatIHaveLearned: e.target.value })) }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 4 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Motivasi kamu hari ini</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center w-full" >
                                                <textarea
                                                    placeholder="Apa yang memotivasi kamu dalam menjalani aktifitas hari ini?"
                                                    className="p-[12px] w-full flex rounded-[6px] bg-[var(--black-bg)] resize-none outline-none text-white text-[11px]"
                                                    rows={4}
                                                    value={dataInputFieldJurnal.motivation}
                                                    onChange={(e) => { setDataInputFieldJurnal((prevState) => ({ ...prevState, motivation: e.target.value })) }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 5 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Berapa persen tingkat produktif kamu hari ini</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center w-full" >
                                                <span className="w-full flex flex-col gap-[12px] items-center justify-center mt-[12px]">
                                                    <input type="range" name="" id="" min={0} max={100} value={dataInputFieldJurnal.productivity} onChange={(e) => setDataInputFieldJurnal((prevState) => ({ ...prevState, productivity: parseInt(e.target.value) }))} className="slider w-[80%]" />

                                                    <p className="text-center text-[12px] w-fit text-white"><span className="font-[500]">{dataInputFieldJurnal.productivity}%, </span><span className="font-[400]">{dataInputFieldJurnal.productivity >= 80 ? 'Sangat membara!' : dataInputFieldJurnal.productivity >= 40 ? 'Butuh energi lebih!' : 'Kurang semangat'}</span></p>
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {statusFieldJurnal === 6 && (
                                        <>
                                            <span className="w-full">
                                                <p className="text-[12px] text-white font-[600] text-center">Jurnal harian kamu sudah siap! ✨</p>
                                            </span>
                                            <div className="flex flex-row gap-[6px] items-center justify-center w-full cursor-pointer" >
                                                <span className="w-full flex flex-col gap-[12px] items-center justify-center mt-[0px]" onClick={HandleAddJurnal}>
                                                    <p className="text-center text-[12px] w-fit text-white bg-[var(--blue-clr)] rounded-[6px] px-[12px] py-[6px]">Simpan & Buka Jurnal</p>
                                                </span>
                                            </div>
                                        </>
                                    )}


                                </div>
                            </div>
                        }
                        bottomSect={
                            <div className="flex flex-col items-center justify-center w-full font-[600]">
                                {/* SKIP PREV NEXT */}
                                <div className="w-full flex flex-row items-center justify-center gap-[12px]">
                                    <div>
                                        <p className="text-[12px] text-[var(--black-subtext)] cursor-pointer" onClick={() => { setStatusFieldJurnal((prev) => prev > 0 ? prev - 1 : prev); setProgressBarJurnalField((prev) => prev > 0 ? prev - 1 : prev) }}>Kembali</p>
                                    </div>
                                    {statusFieldJurnal <= 5 && (
                                        <>
                                            <div>
                                                <p className="text-[12px] text-[var(--blue-clr)] cursor-pointer" onClick={() => { setStatusFieldJurnal((prev) => prev + 1); setProgressBarJurnalField((prev) => prev + 1) }}>Berikutnya</p>
                                            </div>
                                            <div>
                                                <p className="text-[12px] text-[var(--black-subtext)] cursor-pointer font-[400]" onClick={() => { setStatusFieldJurnal((prev) => prev + 1); setProgressBarJurnalField((prev) => prev + 1) }}>Lewatkan</p>
                                            </div>
                                        </>
                                    )}
                                </div>


                                {/* PROGRESS FIELD */}
                                {statusFieldJurnal <= 5 && (
                                    <div className="w-full">
                                        <progress
                                            className="bg-transparent w-full h-[4px] appearance-none [&::-webkit-progress-bar]:bg-[var(--black-bg)] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-[var(--blue-clr)] [&::-webkit-progress-value]:rounded-full"
                                            value={progressBarJurnalField}
                                            max={6}
                                        />
                                    </div>
                                )}

                            </div>
                        }


                    />
                )
            }
        </div >
    )
}

export const PopupModal = ({ Heading, subHeading, bodySect, bottomSect, onClickFunc }) => {
    return (
        <div className="fixed top-0 left-[50%] w-full h-full translate-x-[-50%] z-[25] flex items-center justify-center">
            {/* BLACK BACKGROUND */}
            <div className="fixed w-full h-full bg-[#00000080] bottom-0 left-0 z-[19] cursor-auto" />

            {/* CARD DIV (BOX) */}

            {/* h-[42%] */}
            <div className="z-[20] w-[80%] max-w-[600px] h-fit max-h-[460px] bg-[var(--bg-12)] outline outline-1 outline-[var(--black-border)] flex flex-col rounded-[12px] p-[16px] gap-[32px]">

                {/* TOP SECT (JUDUL DAN SUBJUDUL) */}
                <div className="flex flex-col flex text-white w-full">
                    {Heading && (
                        <span>
                            {Heading}
                        </span>
                    )}
                    {subHeading && (
                        <span>
                            {subHeading}
                        </span>
                    )}
                </div>

                {/* BODY */}
                <div className="w-full">
                    {bodySect && (
                        <span className="w-full">
                            {bodySect}
                        </span>
                    )}
                </div>

                {/* BOTTOM SECT */}
                <div className="flex h-full items-end w-full justify-center">
                    {bottomSect && (
                        <span>
                            {bottomSect}
                        </span>
                    )}
                </div>
            </div>

        </div>
    )
}