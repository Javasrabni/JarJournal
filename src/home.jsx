import Header from "./Comps/Navbar-Top/Header"
import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import CardFeatures from "./Comps/Features/ButtonCardFtr/CardFeatures"
import DateTimePlan from "./Comps/Features/Datetime quote/DatetmPlan/dateTimePlan"
import MoodToday from "./Comps/Features/Datetime quote/moodToday/moodToday"
import SisaHariToNewYear from "./Comps/Features/Datetime quote/sisaHari/sisaHari--Tahun/sisaHariToTahun"
import Memo from "./Comps/Features/Memo/Memo"
import EbookPage from "./Comps/Features/eBookSection/ebookPage/ebook"
import { AnimateLoadPageContext } from "./Comps/animate onload page/animateLoadPage"
import { OVERALL_CONTEXT } from "./Context/OVERALL_CONTEXT"
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom"
import { ChooseAvatar } from "./introWeb/chooseAvatar/chooseAvatar"
import { motion } from 'framer-motion'
import { CatatanContext } from "./Comps/Features/Catatan/catatanContex"
import DOMPurify from 'dompurify';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef } from "react"
import { JurnalContext } from "./Comps/Features/Jurnal/Context/jurnalContext"
import { ArtikelContext } from "./Comps/Features/Publikasi/Context/artikelContext"
import Publikasi from "./Comps/Features/Publikasi/pubPage/publikasi"
import InstallApp from "./Comps/downloadApp/downloadApp"

// Cartjs
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js'

// Theme App
import { ThemeAppContext } from "./Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { API_URL_CONTEXT } from "./Auth/Context/API_URL"
import NavFooter from "./Comps/Footer/Navigation footer/NavFooter"
import TypingEffect from "./Comps/typing-effect/typing-text"

export default function Home() {
    const { publicDataUser, setPublicDataUser, isLoading, setIsLoading } = useContext(API_URL_CONTEXT) // Get public data user
    const { username, setUsername } = useContext(API_URL_CONTEXT)

    // Smooth render page
    const { animatePageMain, setAnimatePageMain } = useContext(AnimateLoadPageContext)
    useEffect(() => {
        window.addEventListener('beforeunload', setAnimatePageMain(true))
        return () => {
            window.removeEventListener('beforeunload', setAnimatePageMain(false))
        }
    }, [])

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            document.body.style.backgroundColor = themeActive ? 'var(--bg-12)' : 'white'
        }
    }, [location.pathname])

    // Mobile Media Querry
    const MobileView = matchMedia(' (max-width: 600px) ')
    const navigate = useNavigate()


    const artikelIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>

    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    const downloadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>

    const mobileIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>




    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)


    // useEffect(() => {
    //     const savedToken = localStorage.getItem('token');
    //     if (savedToken) {
    //         setToken(savedToken); // Set token untuk menganggap user sudah login
    //     }
    // }, []);

    // HANDLE ADD POST
    // function HandleGoPublish() {
    //     if (!token) {
    //         alert('Login untuk menggunakan fitur');
    //         navigate('/Auth')
    //     } else {
    //         let delay = setTimeout(() => {
    //             navigate('/Artikel/publish')
    //         }, 200)
    //         return () => clearTimeout(delay)
    //     }
    // }

    const { introAfterLogin, setIntroAfterLogin, isCheckingIntro, setIsCheckingIntro } = useContext(OVERALL_CONTEXT)


    useEffect(() => {
        if (!token) {
            setIntroAfterLogin(false)
        }

        if (!publicDataUser) {
            setIntroAfterLogin(false)
        }
    }, [publicDataUser, token])

    // STATE ON UPLOAD PUBLIKASI
    const { onUploadPubLoading, setOnUploadPubLoading } = useContext(ArtikelContext)
    const { onProgressUpPub, setonProgressUpPub } = useContext(ArtikelContext)


    const { publikasi, setPublikasi } = useContext(ArtikelContext)


    const { onBeforeLogin, setOnBeforeLogin } = useContext(OVERALL_CONTEXT)

    useEffect(() => {
        if (!onBeforeLogin) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    }, [onBeforeLogin])


    return (
        <>
            {!onBeforeLogin && (
                <>
                    <div className="fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19]" />

                    <div className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 justify-center w-full max-w-[376px] items-center flex shrink-0">

                        <div className="relative p-4 w-full max-h-full ">
                            <div className="bg-[var(--bg-12)] rounded-lg" style={{ outline: '1px solid var(--black-border)' }}>
                                <div className="bg-[var(--bg-12)] flex items-center justify-between py-2 px-4 md:p-5" style={{ borderBottom: "1px solid var(--black-border)" }}>
                                    <h3 className="text-[16px] font-semibold text-white">
                                        Login ke akun
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" onClick={() => setOnBeforeLogin(true)}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 flex flex-col gap-[8px]">
                                    <p className="text-[12px] font-normal text-[var(--black-subtext)]">Ayo terhubung dengan pengguna lain di JarJournal!</p>
                                    <div>
                                        <button className="text-white inline-flex w-full justify-center bg-[var(--blue-clr)] hover:bg-blue-800 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center" onClick={() => { navigate('/Auth'); setOnBeforeLogin(true) }}>
                                            Login / Daftar
                                        </button>
                                    </div>
                                    <div>
                                        <a href="#" className="inline-flex items-center text-[11px] font-normal text-[var(--black-subtext)] hover:underline dark:text-gray-400">
                                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            Mengapa Akun atau Login diperlukan?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <>
                {/* choose avatar (intro after login) */}
                {/* {token && introAfterLogin && publicDataUser && username && (
                    <span classNameName="fixed z-[15]">
                        <ChooseAvatar heading={`Baguss ${username}!`} subHeading={'Sekarang, kita pilih avatar dulu yukk'} />
                    </span>
                )} */}


                {/* {MobileView.matches ? ( */}
                <div className={`max-w-[42rem] m-[auto] h-[100lvh] flex justify-center ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-white'}`} style={{ paddingBottom: '60px' }}>
                    {onUploadPubLoading && (
                        <div className="fixed top-0 left-[50%] translate-x-[-50%] max-w-[42rem] w-full h-fit bg-[var(--bg-12)] z-[30]">
                            <div className="flex flex-col items-center justify-between p-[32px] w-full gap-[6px]">
                                <div className="flex w-full justify-between items-center">
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[12px] font-bold text-white">Uploading..</span>
                                        <span className="text-[11px] font-regular text-[var(--black-subtext)]">Jangan refresh atau tutup halaman</span>
                                    </div>
                                    <span className="text-[12px] font-bold text-white">{onProgressUpPub}%</span>
                                </div>
                                <div className="w-full bg-[var(--black-bg)] rounded-full h-[6px]">
                                    <div className="bg-[var(--blue-clr)] h-[6px] rounded-full transition-all duration-300 ease-in-out" style={{ width: `${onProgressUpPub}%` }}></div>
                                </div>

                            </div>
                        </div>
                    )}
                    <div className={`w-full h-full flex flex-col gap-[8px] justify-between`}>
                        <div>
                            <header>
                                <Header token={token} setToken={setToken} />
                            </header>
                            <main className="p-[16px] h-full flex flex-col" style={{ opacity: animatePageMain ? '1' : '0', backgroundColor: themeActive ? 'var(--bg-12)' : 'white' }}>
                                <div className="flex flex-col gap-[12px] w-full h-full">
                                    {/* PANEL RIGHT n LEFT */}
                                    <div className="flex flex-row gap-[12px] justify-between w-full h-fit mb-[32px]">

                                        {/* Left side */}
                                        <div className="w-1/2 grow-0 shirnk-0 flex flex-col gap-[12px]">
                                            <div>
                                                <CardFeatures
                                                    onClickFeatures={'/ftr/Catatan'}
                                                    heightCatatan={true}
                                                    descFeatures={'Buat catatan harian kamu disini'}
                                                    buttonFeatures={'Buat'}
                                                    nameFeatures={"Catatan"}
                                                    token={token}
                                                />
                                            </div>
                                            <div>
                                                <CardFeatures
                                                    onClickFeatures={'/ftr/Jurnal'}
                                                    heightJurnal={true}
                                                    descFeatures={'Tulis jurnal harian kamu disini'}
                                                    nameFeatures={"Jurnal"}
                                                    buttonFeatures={'Tulis'}
                                                />
                                            </div>
                                            {/* <div>
                                                <CardFeatures
                                                    cardType2EBook={true}
                                                    onClickFeatures={'/ftr/Library'}
                                                    descFeatures={'Bacaan Harian'}
                                                    nameFeatures={"Library"}
                                                    buttonFeatures={'Baca'}
                                                />
                                            </div> */}
                                        </div>
                                        {/* Right side */}
                                        <div className="w-1/2 grow-0 flex flex-col gap-[12px]">
                                            <div>
                                                <DateTimePlan />
                                            </div>
                                            <div>
                                                <CardFeatures
                                                    cardType2EBook={true}
                                                    heightKalender={true}
                                                    onClickFeatures={'/KalenderPlanner'}
                                                    descFeatures={'Sisipkan acara'}
                                                    nameFeatures={"Kalender Planner"}
                                                    buttonFeatures={'Tambah'}
                                                />
                                            </div>
                                            <div className={`w-full ${themeActive ? 'bg-[var(--black-card)]' : 'bg-[var(--white-bg-100)]'} text-white rounded-[8px] p-[12px]`} style={{ outline: themeActive ? "1px solid var(--black-bg)" : "1px solid var(--white-bg-200)" }}>
                                                <SisaHariToNewYear />
                                            </div>
                                            <div className="w-full">
                                                <Memo />
                                            </div>
                                        </div>
                                    </div>

                                    {/* REPORT JURNAL X CATATAN */}
                                    <div className="flex flex-col gap-[12px] w-full h-full pb-[16px]">
                                        <div className="flex flex-row gap-[12px]">
                                            <ReportJurnal />
                                        </div>
                                        <div>
                                            <ReportCatatan />
                                        </div>

                                        {/* ORANG ORANG DI JARJOURNAL */}
                                        <div className="flex flex-col  w-full h-fit  py-[12px]" style={{ borderTop: '1px solid var(--black-border)' }}>
                                            <div className="flex flex-row items-center justify-between">
                                                <div>
                                                    <p className="text-[12px] font-[600] text-white">Terkoneksi dengan pengguna lain</p>
                                                    <p className="text-[11px] text-[var(--black-subtext)]">Orang yang mungkin kamu kenali</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] cursor-pointer text-[var(--blue-clr)]">Lihat semua</p>
                                                </div>
                                            </div>
                                            {!isLoading ? (
                                                <div className="flex flex-row gap-[32px] mt-[32px] w-full h-fit overflow-x-auto pb-[16px]">
                                                    <>
                                                        {publicDataUser.slice(0, 10).map((user, index) =>
                                                            <div className="flex flex-row gap-[16px] items-center shrink-0" key={index} onClick={() => navigate(`/user/${user.id}/${user.username}`)}>
                                                                <span>
                                                                    {user.avatar ? (
                                                                        <img src={user.avatar} alt={user.username} className="w-[32px] h-[32px] rounded-full object-cover" />
                                                                    ) : (
                                                                        <img src={"https://res.cloudinary.com/dwf753l9w/image/upload/w_32,h_32,q_auto,f_auto/no_profile_user_emaldm.svg"} alt={user.username} className="w-[32px] h-[32px] rounded-full" />
                                                                    )}
                                                                </span>
                                                                <div className="flex flex-col gap-[2px] justify-center">
                                                                    <p className="text-[11px] font-[600] text-[11px] text-white">{user.username}</p>
                                                                    <p className="text-[11px] text-[var(--black-subtext)] text-[11px]">Bergabung pada {user.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>

                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-[8px] w-full mt-[12px]">
                                                    <Skeleton count={1} width={'100%'} height={'56px'} className="skeleton-delayed animate-pulse" style={{ borderRadius: '8px', animationDelay: '0.3s' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div classname="flex flex-row gap-[12px] w-full items-center justify-between" >
                                            <InstallApp />
                                        </div>

                                    </div>


                                    {/* PUBLICATIONS */}
                                    {/* <div className="mb-[60px]" style={{ borderTop: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)' }}> */}
                                    {/* Judul */}
                                    {/* <div className={`mt-[16px] flex flex-row items-center justify-between`}>
                                            <div className="flex flex-col gap-[4px]">
                                                <p className={`${themeActive ? 'text-white' : 'text-black'} font-[600] text-[12px] leading-[1]`}>
                                                    <span className="flex flex-row gap-[6px] items-center">
                                                        {artikelIcon}
                                                        Ruang Publik
                                                    </span>
                                                </p>

                                                <p className={`text-[var(--black-subtext)] text-[11px]`}>Baca pesan atau informasi dari warga JarJournal</p>
                                            </div> */}
                                    {/* <div onClick={HandleGoPublish}>
                                                <div className="w-[28px] h-[28px] flex flex-col items-center justify-center bg-[var(--white-bg-100)] rounded-[8px] cursor-pointer">
                                                    {plusIcon}
                                                </div>
                                            </div> */}
                                    {/* </div> */}

                                    {/* <div className="mt-[32px]" >
                                            <Publikasi token={token} />
                                        </div> */}
                                    {/* </div> */}
                                    {/* <div>
                                        {publicDataUser.forEach(user => <p>{user.username}</p>)}
                                    </div> */}
                                </div>
                            </main>
                        </div>

                        {/* style={{opacity: animatePageMain ? '1' : '0'}}> */}
                        <div>
                            <NavFooter />
                        </div>
                    </div>
                </div >
            </>
        </>
    )
}

// FEEDBACK /SUPOORT ELM
export const FeedBackELM = ({ Text01, Text02, inHeader }) => {
    return (
        <div className="flex flex-col gap-[12px] py-[12px] " style={{ borderTop: '1px solid var(--black-border)' }}>
            <div>
                <p className={`${inHeader ? 'text-[12px]' : 'text-[14px]'} text-[var(--blue-clr)]`}><a href="https://saweria.co/JJRCS" target="_blank">{Text01}</a></p>
            </div>
            <div>
                <p className={`${inHeader ? 'text-[12px]' : 'text-[14px]'} text-[var(--blue-clr)]`}><a href="https://saweria.co/JJRCS" target="_blank">{Text02} </a></p>
            </div>
        </div>
    )
}

//  REPORT JURNAL USER
const ReportJurnal = () => {
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
    // GET DATA JURNAL USER
    const { outputDataUserJurnal, setOutputDataUserJurnal } = useContext(JurnalContext)
    const arrowIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
    </svg>
    const chartIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ rotate: '-90deg' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
    </svg>



    // ANALYZE MOOD USER
    const [avarageData, setAvarageData] = useState(null)
    const [avarageDataFreq, setAverageDataFreq] = useState({
        Sedih: 0, Datar: 0, Senang: 0, Bersemangat: 0
    })



    useEffect(() => {
        const getMoodUser = (Array.isArray(outputDataUserJurnal) ? outputDataUserJurnal : []).map(item => item.moodType);

        if (JSON.stringify(getMoodUser.current) !== JSON.stringify(getMoodUser)) {
            const dataAnalisis = {};
            let freq = 0;
            let freqValue = null;

            getMoodUser.forEach(item => {
                dataAnalisis[item] = (dataAnalisis[item] || 0) + 1;
                if (dataAnalisis[item] > freq) {
                    freq = dataAnalisis[item];
                    freqValue = item;
                }
            });

            setAvarageData(freqValue);
            setAverageDataFreq((prevData) => ({
                ...prevData,
                ...dataAnalisis, // Update dengan hasil dataAnalisis
            }));
        }
    }, [outputDataUserJurnal]);

    const moodData = {
        labels: ["Sedih", "Datar", "Senang", "Bersemangat"],
        datasets: [
            {
                label: "Jumlah",
                data: [avarageDataFreq.Sedih, avarageDataFreq.Datar, avarageDataFreq.Senang, avarageDataFreq.Bersemangat],
                borderColor: "#1585FF",
                backgroundColor: "#1585FF",
                borderWidth: 2,
                pointBackgroundColor: "#1585FF",
                pointBorderColor: "#fff",
                pointRadius: 5,
                pointHoverRadius: 8,
                pointStyle: "circle", // Bentuk titik
                tension: 0, // Kelengkungan garis
                fill: true, // Isi area bawah garis
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white", // Warna teks legenda
                    font: {
                        size: 12,
                        weight: 600,
                        family: 'Poppins'
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#fff",
                titleFont: {
                    size: 12,
                    family: "Poppins",
                    weight: 600
                },
                bodyFont: {
                    size: 11,
                    family: "Poppins",
                },
                titleColor: "#000",
                bodyColor: "#262626",
            },
        },
        scales: {
            x: {
                grid: {
                    color: "#262626",
                    lineWidth: 1,
                    drawOnChartArea: true,
                },
                title: {
                    display: true,
                    text: "Perasaan / mood",
                    color: "white",
                    font: {
                        size: 12,
                        family: 'Poppins',
                    },
                },
                ticks: {
                    color: "#999999",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#262626",
                },
                title: {
                    display: true,
                    text: "Jumlah",
                    color: "white",
                    font: {
                        size: 12,
                        family: 'Poppins'
                    },
                },
                ticks: {
                    color: "#999999",
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
            },
        },
    };

    // CHAT TYPING EFFECT
    const sentences = [
        "Bagaimana pendapatmu tentang orang yang terjebak pada masa lalu?",
        "Apakah kamu dapat membantu menyelesaikan tugas sekolah saya?",
        "Bagaimana melatih kemampuan berbicara secara efektif?",
        "Apa yang perlu diperhatikan sebelum berbisnis?",
        "Berapa lama waktu yang dibutuhkan untuk menjadi seorang programmer?"
    ];

    const arrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3" style={{ color: 'var(--black-subtext)' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>

    const navigate = useNavigate()

    return (
        <div className="w-full h-full">
            {/* FITUR CHAT BOT */}
            <div className="w-full h-fit flex flex-col gap-[4px] text-white" onClick={() => navigate('/JJR-ChatBot')}>
                <p className="text-[12px] font-[600] text-center">Tanya AI</p>
                <div className="w-full h-fit mb-[16px] length-1 pt-[16px] px-[16px] pb-[8px] bg-[var(--bg-12)] text-white rounded-lg flex flex-row items-center justify-between gap-[8px]" style={{ border: '1px solid var(--black-border)' }}>
                    <div className="flex flex-row gap-[8px] items-center w-full">
                        <TypingEffect texts={sentences} typingSpeed={50} deletingSpeed={55} delay={1500} />
                        <span className="">{arrow}</span>
                    </div>
                    <div className="text-[var(--blue-clr)] text-[11px] w-fit items-center flex">
                        <button>Mulai</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[4px] py-[12px]" style={{ borderTop: '1px solid var(--black-border)' }}>


                <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px] font-[600] text-white">Ringkasan jurnal harian</p>
                    <span><p className="text-[11px] text-[var(--black-subtext)]">*Dalam proses analisis akan lebih ideal jika setidaknya terdapat 7 data.</p></span>

                </div>
                <div>
                    {outputDataUserJurnal.length <= 0 ? (
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            {/* <div className="w-full h-full items-center flex justify-center">
                                <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737171056/Line_1_a7ivrx.svg" alt="report chart jurnal" className="w-[35%] h-[35%] object-cover" />
                            </div> */}
                            {/* Rata rata mood user */}
                            <div style={{ height: '100%', width: '100%' }} className="pt-[32px] pb-[32px]">
                                {/* <p className="text-[12px] text-white mb-[4px]">Data dalam grafik diagram garis</p> */}
                                <Line data={moodData} options={chartOptions} height={220} />
                            </div>
                            <p className="text-[11px] text-[var(--black-subtext)]">Akan tersedia saat kamu sudah punya jurnal. <span className="text-[var(--blue-clr)] cursor-pointer" onClick={() => navigate('/ftr/Jurnal')}>Mulai jurnal</span></p>

                        </ div>
                    ) : (
                        <div className="flex flex-col justify-between h-full w-full mt-[12px]">
                            <div className="flex flex-row items-center gap-[16px] w-full">
                                {/* DATA JURNAL PERTAMA */}
                                <div>
                                    {outputDataUserJurnal.length > 0 && outputDataUserJurnal.slice(0, 1).map((item, index) =>
                                        <div key={index} className="w-fit h-fit bg-[var(--black-bg)] rounded-[8px] shrink-0 p-[12px] gap-[2px] flex flex-col">
                                            <p className="text-[12px] text-white font-[600]">Jurnal hari ke-{item.day}</p>
                                            <p className="text-[11px] text-[var(--black-subtext)]">{item.descJurnal == 'null' ? `Jurnal harianku yang ke-${item.day}` : item.descJurnal}</p>
                                        </div>
                                    )}
                                </div>

                                <div><span className="text-white">{arrowIcon}</span></div>

                                {/* DATA JURNAL TERAKHIR */}
                                <div>
                                    {outputDataUserJurnal && outputDataUserJurnal[outputDataUserJurnal.length - 1] && (
                                        <div className="w-fit h-fit bg-[var(--blue-clr)] rounded-[8px] shrink-0 p-[12px] gap-[2px] flex flex-col">
                                            <p className="text-[12px] text-white font-[600]">Jurnal hari ke-{outputDataUserJurnal[outputDataUserJurnal.length - 1].day}</p>
                                            <p className="text-[11px] text-[var(--white-bg-200)]">{outputDataUserJurnal[outputDataUserJurnal.length - 1] ? `Jurnal harianku yang ke-${outputDataUserJurnal[outputDataUserJurnal.length - 1]?.day}` : outputDataUserJurnal[outputDataUserJurnal.length - 1]?.descJurnal}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Rata rata mood user */}
                            <div style={{ height: '100%', width: '100%' }} className="pt-[32px] pb-[32px]">
                                <p className="text-[12px] text-white mb-[4px]">Data dalam grafik diagram garis</p>
                                <Line data={moodData} options={chartOptions} height={220} />
                            </div>

                            <div className="mt-[12px]">
                                <p className="text-white text-[12px]">
                                    <span className="flex flex-row gap-[6px] items-center">
                                        <span>{chartIcon}</span>
                                        {outputDataUserJurnal.length <= 3 ?
                                            (
                                                <p>Perasaan kamu cenderung <span className="font-[600]">"-"</span></p>
                                            ) : (
                                                <p>Perasaan kamu cenderung <span className="font-[600]">"{avarageData == "null" ? '-' : avarageData}"</span></p>
                                            )}
                                    </span>
                                </p>
                            </div>

                            {/* REPORT TOTAL JURNAL */}
                            <div className="mt-[8px]">
                                <p className="text-[12px] text-[var(--black-subtext)]">Kamu sudah menulis <span className="text-white font-[600]">{outputDataUserJurnal.length} jurnal harian</span>  sejauh ini.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div >
    )
}

// REPORT CATATAN USER
const ReportCatatan = () => {
    const navigate = useNavigate()
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)
    return (
        <div className="w-full  h-fit min-h-[120px]">
            <div className="flex flex-col gap-[4px] py-[12px] " style={{ borderTop: '1px solid var(--black-border)' }}>
                <div>
                    <p className="text-[12px] font-[600] text-white">Catatan terakhir kamu</p>
                </div>
                <div>
                    {onNewNote.length > 0 ? (
                        <>
                            {onNewNote.slice(0, 2).map(item =>
                                <div className="bg-[var(--black-bg)] p-[12px] rounded-[6px]  mt-[12px] flex flex-col gap-[8px]" onClick={() => navigate('/ftr/Catatan')}>
                                    <div
                                        className="text-white  text-[12px]"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.catatan) }} // Assuming item.content holds the note text
                                    />

                                    <p className="text-[11px] font-[500] text-[#999999]">Terakhir diedit: {item.updatedAt.slice(0, 10)}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            <div className="w-full h-full items-center flex justify-center opacity-[70%]">
                                <img src="https://res.cloudinary.com/dwf753l9w/image/upload/v1737171008/Table_1_urpvlk.svg" alt="report chart catatan" className="w-[35%] h-[35%] object-cover" />
                            </div>
                            <p className="text-[11px] text-[var(--black-subtext)]">Akan tersedia saat kamu sudah punya Catatan.</p>

                        </ div>
                    )}
                </div>
            </div>
        </div >
    )
}