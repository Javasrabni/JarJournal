import { useContext, useEffect } from "react"
import { JurnalContext } from "../../Comps/Features/Jurnal/Context/jurnalContext"
import { useParams } from "react-router-dom"
import './style.css'; // STYLE 
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL";
import { useNavigate } from "react-router-dom";

export default function JurnalPage() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const { index, desc } = useParams()
    const navigate = useNavigate()
    // GET DATA JURNAL USER
    const { emotOutput, setEmotOutput, item, setitem, valueProduktifitasUser, setValueProduktifitasUser } = useContext(JurnalContext)
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    // COLOR INDICATOR (PRODUKTIFITAS)
    function colorIndicatorProduktifitas(value) {
        if (value >= 80) {
            return 'bg-[var(--blue-clr)] text-white'
        } else if (value >= 40) {
            return 'bg-[#f7d63a] text-black'
        } else if (value <= 40) {
            return 'bg-[tomato] text-white'
        }
    }



    const sunIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>

    const { outputDataUserJurnal, setOutputDataUserJurnal } = useContext(JurnalContext)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)
    const { selectedIdxJurnal, setSelectedIdxJurnal } = useContext(JurnalContext)



    return (
        <div className="w-full max-w-[42rem] m-auto h-full flex flex-col items-center max-w-[42rem] p-[16px]">
            {(Array.isArray(outputDataUserJurnal) ? outputDataUserJurnal : [])
                .filter(user => user.userId === userId)
                .slice(selectedIdxJurnal - 1, selectedIdxJurnal) // Ambil hanya satu item sesuai index
                .map(item => (
                    <div className="w-full flex flex-col items-center gap-[12px]">
                        {/* TOP SECT*/}
                        <div className="flex flex-col w-full text-white gap-[12px]" >

                            <div className="w-full flex flex-row gap-[16px] items-center pb-[16px]" style={{ borderBottom: '1px solid var(--black-border)' }}>
                                <span className="cursor-pointer" onClick={() => navigate(-1)}>
                                    {backIcon}
                                </span>
                                <span>
                                    <p className="text-[12px] text-white">Kembali</p>
                                </span>

                            </div>

                            <div className="flex flex-row justify-between w-full h-fit gap-[12px]">

                                <div className="flex flex-col gap-[12px] w-full">
                                    <img src={item.fotoJurnal} alt="Image" className="text-black w-full h-[120px] rounded-[12px] bg-white" />
                                </div>


                                <div className="flex flex-row gap-[16px] items-center pb-[12px] w-full" >

                                    <span className="flex flex-col gap-[2px]">
                                        <p className="text-[12px] font-[600]">Buku jurnal hari ke-{item.day}</p>
                                        <p className="text-[12px] text-[var(--black-subtext)]">
                                            {item.descJurnal || "No date available"}
                                        </p>

                                        <p className="text-[12px] text-[var(--black-subtext)] pt-[12px]">{item.date || "No date available"}</p>


                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* BODY SECT */}
                        <div className="max-w-scrollbar-hidden flex flex-col gap-[12px] overflow-x-auto w-full mt-[16px] pb-[0px] relative">
                            {/* THEME MODE TOGGLE (SUN ICON)  */}
                            <div className="absolute p-[6px] bg-white rounded-[6px] cursor-pointer left-0"><span className="text-black">{sunIcon}</span></div>

                            {/* LEFT PAGE */}
                            {/* "EVALUATION" & "WHAT I LEARNED" */}
                            <div className="w-full flex flex-col gap-[12px] shrink-0">

                                <div className="flex flex-col w-full items-center bg-[var(--black-bg)] rounded-[12px] p-[12px]">
                                    <div className="pb-[12px]">
                                        <p className="text-[12px] text-white font-semibold">Perasaanmu pada hari ke-{item.day}</p>
                                    </div>

                                    <div className="w-full flex flex-row items-center gap-[6px] relative z-[1] pl-[12px]">

                                        <div className="flex flex-col w-full items-center">
                                            <div className=" flex flex-row gap w-full items-center justify-center gap-[12px]">
                                                {emotOutput.map(itm =>
                                                    <div className={`w-[35px] h-[35px] overflow-hidden shrink-0 ${item.moodToday == itm.emotUrl ? 'bg-[var(--blue-clr)]' : "bg-[var(--black-bg)]"} p-[0px] rounded-[8px]`}>
                                                        <img src={itm.emotUrl} alt={itm.type} className={`w-full h-full object-cover shrink-0`} style={{ transform: 'scale(300%)' }} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`pt-[4px]`}>
                                                <p className="text-[12px] text-[var(--black-subtext)]">{item.moodType == "null" ? '#' : item.moodType} </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* EVALUATION PART */}
                                <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit mt-[16px]" style={{ border: '1px solid var(--black-border)' }}>
                                    <p className="text-[12px] font-[600] text-white">Evaluasi</p>
                                    <p className="text-[12px] text-[var(--black-subtext)]">{item.evaluasi || "Belum ada motivasi"}</p>
                                </div>
                                {/* WHAT I LEARNED */}
                                <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit" style={{ border: '1px solid var(--black-border)' }}>
                                    <p className="text-[12px] font-[600] text-white">Apa yang saya pelajari hari ini?</p>
                                    <p className="text-[12px] text-[var(--black-subtext)]">{item.whatIHaveLearned || "Belum ada pelajaran"}</p>
                                </div>
                            </div>
                            {/* RIGHT PAGE */}
                            {/* "MY GOAL" & "THE MOTIVATION" */}
                            <div className="w-full flex flex-col gap-[12px] shrink-0 relative">
                                {/* MY GOAL PART */}
                                <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit" style={{ border: '1px solid var(--black-border)' }}>
                                    <p className="text-[12px] font-[600] text-white">Goal saya</p>
                                    {/* <ul>
                                        {item.myGoals.length > 0 ? (
                                            item.myGoals.map((item, idx) => (
                                                <li key={idx} className="text-[12px] text-[var(--black-subtext)]">
                                                    {idx + 1}. {item || "Belum ada Goal"}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-[12px] text-[var(--black-subtext)]">Belum ada Goal</li>
                                        )}
                                    </ul> */}
                                </div>
                                {/* MOTIVATION */}
                                <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit" style={{ border: '1px solid var(--black-border)' }}>
                                    <p className="text-[12px] font-[600] text-white">Motivasi</p>
                                    <p className="text-[12px] text-[var(--black-subtext)]">{item.motivation || "Belum ada motivasi"}</p>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM SECT */}
                        <div className="flex flex-col gap-[12px] overflow-x-auto w-full mt-[16px] pb-[16px] relative">

                            {/* FITUR TINGKAT PRODUKTIFITAS */}
                            <p className="text-[12px] font-[600] text-white">Tingkat Produktif</p>
                            <div className="flex flex-row gap-[12px] items-center">
                                <span className="w-[80%]">
                                    <progress name="" id="" min={0} max={100} value={item.productivity} onChange={(e) => setValueProduktifitasUser(e.target.value)} className="slider" />
                                </span>

                                <span className={`${colorIndicatorProduktifitas(valueProduktifitasUser)} px-[12px] py-[4px] rounded-[6px] w-full`}>
                                    <p className="text-[12px] w-fit"><span className="font-[600]">{item.productivity}%</span> <span className="font-[500]">{item.productivity >= 80 ? 'Sangat membara!' : item.productivity >= 40 ? 'Butuh energi lebih!' : 'Kurang semangat'}</span></p>
                                </span>
                            </div>

                            {/* GRATEFUL-FOR */}
                            <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit" style={{ border: '1px solid var(--black-border)' }}>
                                <p className="text-[12px] font-[600] text-white">Grateful for</p>
                                <p className="text-[12px] text-[var(--black-subtext)]">{item.gratefulFor || "Belum ada data"}</p>
                            </div>

                            {/* THING TO IMPROVE */}
                            <div className="p-[12px] bg-[var(--bg-12)] rounded-[12px] h-fit" style={{ border: '1px solid var(--black-border)' }}>
                                <p className="text-[12px] font-[600] text-white">Hal yang harus ditingkatkan atau perbaiki</p>
                                <p className="text-[12px] text-[var(--black-subtext)]">{item.gratefulFor || "Belum ada data"}</p>
                            </div>

                        </div>
                    </div>
                ))}

        </div >
    )
}
