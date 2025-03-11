import { useContext, useEffect, useRef, useState } from "react"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"
import Publikasi from "../../Comps/Features/Publikasi/pubPage/publikasi"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"
import { ArtikelContext } from "../../Comps/Features/Publikasi/Context/artikelContext"
import { ExploreContext } from "./Context/exploreContext"
import { useNavigate } from "react-router-dom"
import { UserProfileContext } from "../userProfile/Context/userProfileContext"
import { OVERALL_CONTEXT } from "../../Context/OVERALL_CONTEXT"

export default function Explore() {
    const navigate = useNavigate()
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    }, [])
    // FUNC FOR FIND USER ON EXPLORE
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT)

    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { dataPubToFilter, setDataPubToFilter } = useContext(ExploreContext)
    const { filteredPub, setFilteredPub, statusSearchExplore, setStatusSearchExplore } = useContext(ExploreContext)
    const [valueInputExplore, setValueInputExplore] = useState('') // State input value explore
    const [valueInputExploreSementara, setValueInputExploreSementara] = useState('')
    const inputSearchExploreRef = useRef()
    const [valueDsntMatchWithPub, setValueDsntMatchWithPub] = useState(false)

    const { usernameProfileData, setUsernameProfileData } = useContext(UserProfileContext) // GET API USERNAME DATA 
    const [outputSearchUsernameProfileData, setOutputSearchUsernameProfileData] = useState([])

    function HandleSearchExplore() {
        if (!valueInputExploreSementara || !valueInputExplore) return
        // setValueInputExplore(event.target.value.toLowerCase())
        setStatusSearchExplore(true)
        // setValueInputExploreSementara('') // clear input
        if (inputSearchExploreRef.current) inputSearchExploreRef.current.blur() // unfocus input 
        const delayOutput = setTimeout(() => {
            const filteringPub = publikasi.filter(item =>
                item.judulContent.toLowerCase().includes(valueInputExplore) ||
                item.content.toLowerCase().includes(valueInputExplore)
            )
            setFilteredPub(filteringPub)
        }, 300)

        // LOGIKA JIKA VALUE INPUT TIDAK COCOK DENGAN DATA TOPIK
        filteredPub.length <= 0 ? setValueDsntMatchWithPub(true) : setValueDsntMatchWithPub(false)
        return () => {
            clearTimeout(delayOutput);
        }
    }
    function HandleChangeSearch() {
        const filteringPublicUsername = publicDataUser.filter(user =>
            user.username.toLowerCase().includes(valueInputExploreSementara.toLowerCase())
        )
        const delay = setTimeout(() => {
            setOutputSearchUsernameProfileData(filteringPublicUsername)
        }, 300)
        return () => clearTimeout(delay)
    }

    useEffect(() => {
        if (valueInputExplore.length <= 0) {
            setFilteredPub([])
        }
    }, [valueInputExplore])


    // HANDLE ADD POST
    function HandleGoPublish() {
        if (!token) {
            alert('Login untuk menggunakan fitur');
            navigate('/Auth')
        } else {
            let delay = setTimeout(() => {
                navigate('/clips/publish')
            }, 200)
            return () => clearTimeout(delay)
        }
    }

    // tinggi full height client 
    const innerHeightWindowPortClient = window.innerHeight

    // TIPE CLIPS
    const [tipeExplore, setTipeExplore] = useState(true)

    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "var(--black-subtext)" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "var(--black-subtext)" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "black" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

    // STATE ON UPLOAD PUBLIKASI
    const { onUploadPubLoading, setOnUploadPubLoading } = useContext(ArtikelContext)
    const { onProgressUpPub, setonProgressUpPub } = useContext(ArtikelContext)

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


            <div className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} h-[100vh] max-w-[42rem] px-[16px] m-auto py-[16px]`}>
                {onUploadPubLoading && (
                    <div className="fixed top-0 left-[50%] translate-x-[-50%] max-w-[42rem] w-full h-fit bg-[var(--bg-12)] z-[30]">
                        <div className="flex flex-col items-center justify-between p-[32px] w-full gap-[6px]">
                            <div className="flex w-full justify-between">
                                <span className="text-[12px] font-bold text-white">Uploading..</span>
                                <span className="text-[12px] font-bold text-white">{onProgressUpPub}%</span>
                            </div>
                            <div className="w-full bg-[var(--black-bg)] rounded-full h-[6px]">
                                <div className="bg-[var(--blue-clr)] h-[6px] rounded-full transition-all duration-300 ease-in-out" style={{ width: `${onProgressUpPub}%` }}></div>
                            </div>

                        </div>
                    </div>
                )}

                <div className={`h-fit w-full flex flex-col m-auto`}>
                    {/* TOP SECT */}
                    <div className="w-full h-fit flex flex-col justify-center gap-[8px] mb-[16px] mt-[12px]" role='heading'>
                        {/* ON SEARCH */}
                        <div className="w-full flex flex-row gap-[8px] items-center">
                            {statusSearchExplore && (
                                <span className="cursor-pointer" onClick={() => { setStatusSearchExplore(false); setValueInputExploreSementara('') }}>{backIcon}</span>
                            )}

                            <input type="text" value={valueInputExploreSementara} placeholder="Cari pengguna atau topik" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} w-full p-[10px] px-[12px] outline-0 border-0 text-[12px]`}
                                style={{ borderRadius: valueInputExploreSementara.length >= 4 && (outputSearchUsernameProfileData.length >= 1 || outputSearchUsernameProfileData.length < 1) ? '8px 8px 0px 0px' : '8px' }}
                                ref={inputSearchExploreRef}
                                onChange={(e) => { HandleChangeSearch(); setValueInputExplore(e.target.value); setValueInputExploreSementara(e.target.value) }}
                                // FUNC IF USER PRESSING ENTER
                                onKeyDown={(e) => e.key === "Enter" && HandleSearchExplore()}
                                onFocus={() => setValueDsntMatchWithPub(false)}
                                onBlur={() => setValueDsntMatchWithPub(true)}
                            />
                            <button className={`p-[10px] flex items-center justify-center ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'}  rounded-[8px] cursor-pointer`} onClick={HandleSearchExplore}>{searchIcon}</button>
                        </div>
                        <div>
                            {valueDsntMatchWithPub && statusSearchExplore && filteredPub.length <= 0 && (
                                <p className="text-[12px] text-[var(--black-subtext)]">Mungkin hasil dari "{valueInputExplore}" kurang relevan...</p>
                            )}

                            {/* LOGIC FOR SEARCH PUBLIC USER */}
                            {!statusSearchExplore && outputSearchUsernameProfileData && valueInputExploreSementara.length >= 2 && (
                                <>
                                    {outputSearchUsernameProfileData.map(user => (
                                        <div className={`${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} w-[calc(100%-48px)] p-[12px] mt-[-9px] rounded-[0px_0px_8px_8px] cursor-pointer`} onClick={() => navigate(`/user/${user.id}/${user.username}`)} style={{ transition: 'all 0.3s' }}>
                                            <span className="flex flex-row gap-[8px] items-center justify-between">
                                                <span className="flex flex-row gap-[12px] items-center">
                                                    <img src={user.avatar || "https://res.cloudinary.com/dwf753l9w/image/upload/w_30,h_30,q_auto,f_auto/no_profile_user_emaldm.svg"} alt="" className="w-[30px] h-[30px] rounded-[50px]" />
                                                    <p className="text-[12px] text-white">{user.username}</p>
                                                </span>
                                                <span>
                                                    <p className="text-[12px] text-[var(--black-subtext)]">{user.userBio && user.userBio.slice(0, 10)}...</p>
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* TIPE CLIPS */}
                            <div className="flex flex-row items-center text-[12px] pt-[12px] gap-[8px] text-[var(--black-subtext)] cursor-pointer w-fit">
                                <span className={`${tipeExplore && 'text-white '}`} onClick={() => setTipeExplore(true)}>Utas</span>
                                <span className={`${!tipeExplore && 'text-white '}`} onClick={() => setTipeExplore(false)}>Informasi</span>
                            </div>
                        </div>

                        <main className="mt-[4px] pb-[64px]">


                            {statusSearchExplore && valueInputExplore.length > 0 ? (
                                <Publikasi publikasiData={filteredPub} />
                            ) : (
                                <>
                                    {/* ON TIPE EXPLORE */}
                                    {tipeExplore ? (
                                        <Publikasi publikasiData={publikasi} />
                                    ) : (
                                        <div className="w-full h-[50svh] flex items-center justify-center">
                                            <p className="text-[var(--black-subtext)] text-[12px]">Akan tersedia</p>
                                        </div>
                                    )}
                                </>
                            )}

                            {statusSearchExplore && filteredPub.length <= 0 && (
                                <>
                                    {/* ON TIPE EXPLORE */}
                                    {tipeExplore ? (
                                        <Publikasi publikasiData={publikasi} />
                                    ) : (
                                        <div className="w-full h-[50svh] flex items-center justify-center">
                                            <p className="text-[var(--black-subtext)] text-[12px]">Akan tersedia</p>
                                        </div>
                                    )}
                                </>
                            )}

                            <div onClick={HandleGoPublish} className="fixed bottom-[72px] right-[16px]">
                                <div className={`w-[40px] h-[40px] flex flex-col items-center justify-center ${themeActive ? 'bg-white' : 'bg-[var(--bg-12)]'}  rounded-[8px] cursor-pointer`}>
                                    {plusIcon}
                                </div>
                            </div>
                        </main>
                        <NavFooter />
                    </div>
                </div>
            </div >
        </>
    )
}