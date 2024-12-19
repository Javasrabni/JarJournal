import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MemoContext } from "../Features/Memo/MemoContext";
import { PopupFrSettingsContext } from "../Popup_settings/popupSetting/boxPopupFromSetting";
import { ThemeAppContext } from "../Features/Theme/toggleTheme.jsx/ThemeAppContext";
import LoginPage from "../../Auth/loginPage/loginPage";
import DropdownMenu from "./menuComp/dropdownMenu";
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL";
import Skeleton from "react-loading-skeleton";

export default function Header({ nameTools, sloganTools, backPage, hideLogo }) {
    // AUTH
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    // GET TOKEN    
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (getToken) {
            setToken(getToken)
        }
    }, [token])

    const pathLocation = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const appName = "JarJournal";
    const appSlogan = "Achieve your goals";

    const [judulHeader, setJudulHeader] = useState(appName)

    useEffect(() => {
        pathLocation.pathname === "/ftr/Jurnal" && setJudulHeader("Jurnal")
        pathLocation.pathname === "/ftr/Catatan" && setJudulHeader("Catatan")
        pathLocation.pathname === "/ftr/Library" && setJudulHeader("Library")
        pathLocation.pathname === "/BrainFocus" && setJudulHeader("Brain Focus")
    }, [])

    const [catatanPage, setCatatanPage] = useState(false)
    useEffect(() => {
        if (pathLocation.pathname === "/ftr/Catatan") {
            setCatatanPage(true)
        }
    }, [catatanPage])


    // Memo Section
    const { indicatorFromMemo, setIndicatorFromMemo, memoInputValue, setMemoInputValue, setValueMemo, valueMemo, afterEditValueMemo, setAfterEditValueMemo, editValueMemoStatus, setEditValueMemoStatus } = useContext(MemoContext)

    // edit option clicked
    const { option1_Status, setOption1_Status, checkOption1Status, setCheckOption1Status } = useContext(PopupFrSettingsContext)

    function HandleClick() {
        if (!memoInputValue) {
            setIndicatorFromMemo(false)
            setMemoInputValue('')
            return
        } else {
            // setIndicatorFromMemo(false)
            setValueMemo((prevValue) => [...prevValue, memoInputValue])
        }

        setOption1_Status(false)
        setIndicatorFromMemo(false)
        setMemoInputValue('')
    }

    function HandleOption1() {
        setOption1_Status(false)
    }


    useEffect(() => {
        if (option1_Status) {
            setIndicatorFromMemo(true)
        }
    }, [option1_Status])

    // Hide Check when value memo is zero 0
    useEffect(() => {
        if (valueMemo.length < 1) {
            setIndicatorFromMemo(false)
        }
    }, [valueMemo])


    // Theme app
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)


    // ICON
    const logoutIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>

    const settingIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>


    // AUTH SECT
    // Handle logout
    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('token'); // Hapus token
        setToken(null); // Set token menjadi null untuk memaksa user login ulang
    };

    // STATE OPEN POPUP SETTING
    const [openSetting, setOpenSetting] = useState(false)
    function HandleSetting() {
        const delayTrue = setTimeout(() => {
            setOpenSetting((prev) => !prev)
        }, 200)

        return () => clearTimeout(delayTrue)
    }


    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { userEmail, setUserEmail } = useContext(API_URL_CONTEXT)

    // FETCHING GET USER INFO
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/user-info`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setUsername(data.username)
                    setUserEmail(data.email)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (token) {
            fetchUserInfo()
        }
    }, [token])

    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>


    return (
        <div className="flex flex-col gap-[8px]">
            <div className={`${themeActive ? "bg-[var(--bg-12)]" : "bg-white"} w-full h-fit p-[16px] flex flex-row justify-between items-center`}>

                {!hideLogo ? (
                    <div className="text-white flex gap-[8px]" onClick={() => navigate('/dashboard')}>
                        {catatanPage ? (
                            <div className="flex items-center justify-center pr-[12px] cursor-pointer">
                                {backIcon}
                            </div>
                        ) : (
                            <img src="/Assets/Icon/star.svg" alt="JarJournal Icon" style={{ filter: "drop-shadow(0px 0px 12px gold)" }} width={'32px'} />
                        )}
                        <div>
                            <h1 className={`text-[12px] font-semibold text-${themeActive ? "white" : "black"}`}>{judulHeader}</h1>
                            <p className="text-[10px] text-[#999] font-medium">{appSlogan}</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-white flex gap-[8px] w-full pr-[32px]">
                        {backPage}
                    </div>
                )}





                {/* Auth section */}
                <div className="w-fit h-fit flex justify-center items-center gap-[24px]">
                    {/* login */}


                    {/* <div onClick={() => navigate('/Login')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div> */}

                    {/* CHECKLIST */}
                    <div onClick={() => { HandleOption1(); HandleClick() }}>
                        {indicatorFromMemo && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3.5" style={{ color: themeActive ? "white" : "black" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        )}
                    </div>

                    {/* SETTING  */}
                    <div className="w-[28px] h-[28px] flex flex-col items-center justify-center bg-[var(--white-bg-100)] rounded-[8px] cursor-pointer" onClick={HandleSetting}>
                        {/* ICON */}
                        <div style={{ paddingLeft: "0px" }}>
                            {settingIcon}
                        </div>
                        {/* ON POPUP */}
                        <div>
                            {openSetting && (
                                <div className="p-[12px] text-[12px]" style={{ position: "absolute", zIndex: '10', transform: 'translateX(-128px) translateY(18px)', width: `${280 / 2}px`, height: 'fit-content', borderRadius: '8px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', outline: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)' }}>
                                    <div className="flex flex-col w-full h-full gap-[8px]">
                                        {/* name user */}
                                        {username || userEmail ? (
                                            <>
                                                <div style={{ borderBottom: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', paddingBottom: "12px" }}>
                                                    <label className="text-[10px] text-[var(--black-subtext)] " >Username:</label>
                                                    <p className={`text-[12px] ${themeActive ? 'text-white' : 'text-black'}`} style={{ width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{`${username}`}</p>
                                                </div>
                                                <div style={{ borderBottom: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', paddingBottom: "12px" }}>
                                                    <label className="text-[10px] text-[var(--black-subtext)] " >Email:</label>
                                                    <p className={`text-[12px] ${themeActive ? 'text-white' : 'text-black'}`} style={{ width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{`${userEmail}`}</p>
                                                </div>
                                                <div onClick={handleLogout}>
                                                    {token && (
                                                        <button className={`text-[12px] ${themeActive ? 'text-[tomato]' : 'text-[tomato]'}`}>
                                                            <span className="flex flex-row gap-[4px] items-center">
                                                                {logoutIcon}
                                                                Logout
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col gap-[8px]">
                                                <span>
                                                    <label className="text-[10px] text-[var(--black-subtext)] " >Username:</label>
                                                    <Skeleton count={1} height={'16px'} className="animate-pulse" />
                                                </span>
                                                <span>
                                                    <label className="text-[10px] text-[var(--black-subtext)] " >Email:</label>
                                                    <Skeleton count={1} height={'16px'} className="animate-pulse" />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="mt-0" >
                <DropdownMenu />
            </div> */}

        </div>
    )
}