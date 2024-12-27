import { useContext, useEffect, useRef, useState } from "react"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"
import Publikasi from "../../Comps/Features/Publikasi/pubPage/publikasi"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"
import { ArtikelContext } from "../../Comps/Features/Publikasi/Context/artikelContext"
import { ExploreContext } from "./Context/exploreContext"
import { useNavigate } from "react-router-dom"
import { UserProfileContext } from "../userProfile/Context/userProfileContext"

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

    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { dataPubToFilter, setDataPubToFilter } = useContext(ExploreContext)
    const { filteredPub, setFilteredPub, statusSearchExplore, setStatusSearchExplore } = useContext(ExploreContext)
    const [valueInputExplore, setValueInputExplore] = useState('') // State input value explore
    const [valueInputExploreSementara, setValueInputExploreSementara] = useState('')
    const inputSearchExploreRef = useRef()
    const [valueDsntMatchWithPub, setValueDsntMatchWithPub] = useState(false)

    const { usernameProfileData, setUsernameProfileData } = useContext(UserProfileContext) // GET API USERNAME DATA 
    const [outputSearchUsernameProfileData, setOutputSearchUsernameProfileData] = useState([])

    const mergeJudulnContentPub = publikasi.map(item => ({
        // GET OBJ OF PUBLICATION STRUCTURE TO MAPPING OUTPUT
        id: item.id,
        userName: item.userName,
        judulContent: item.judulContent,
        content: item.content,
        imageUrl: item.imageUrl,
        totalLikePub: item.totalLikePub,
        likes: item.likes,
        komentar: item.komentar,
        timeStamp: item.timeStamp,
        imageUrl: item.imageUrl,
    }))



    function HandleSearchExplore() {
        // setValueInputExplore(event.target.value.toLowerCase())
        setStatusSearchExplore(true)
        setValueInputExploreSementara('') // clear input
        if (inputSearchExploreRef.current) inputSearchExploreRef.current.blur() // unfocus input 
        const delayOutput = setTimeout(() => {
            const filteringPub = mergeJudulnContentPub.filter(item =>
                item.judulContent.toLowerCase().includes(valueInputExplore) ||
                item.content.toLowerCase().includes(valueInputExplore)
            )
            setFilteredPub(filteringPub)
        }, 400)

        // LOGIKA JIKA VALUE INPUT TIDAK COCOK DENGAN DATA TOPIK
        filteredPub.length <= 0 ? setValueDsntMatchWithPub(true) : setValueDsntMatchWithPub(false)
        return () => {
            clearTimeout(delayOutput);
        }
    }

    function HandleChangeSearch(event) {
        const filteringPublicUsername = usernameProfileData.filter(user =>
            user.includes(valueInputExploreSementara)
        )
        setOutputSearchUsernameProfileData(filteringPublicUsername)
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
                navigate('/Artikel/publish')
            }, 200)
            return () => clearTimeout(delay)
        }
    }

    // FUNC FOR FIND USER ON EXPLORE
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT)
    const [findedPublicUsers, setFindedPublicUsers] = useState([])

    // console.log(findedPublicUsers)
    useEffect(() => {
        if (outputSearchUsernameProfileData.length < 1) {
            return
        }
        const userFinded = publicDataUser.filter(user => outputSearchUsernameProfileData.includes(user.username))
        setFindedPublicUsers(userFinded)
    }, [outputSearchUsernameProfileData, publicDataUser])

    // tinggi full height client 
    const innerHeightWindowPortClient = window.innerHeight

    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "var(--black-subtext)" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "var(--black-subtext)" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5" style={{ color: themeActive ? "black" : "black" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>


    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} h-[100vh] max-w-[42rem] px-[16px] m-auto py-[16px]`}>

            <div className={`h-[100vh] w-full flex flex-col m-auto`}>
                {/* TOP SECT */}
                <div className="w-full h-fit flex flex-col justify-center gap-[8px] mb-[16px] mt-[12px]" role='heading'>
                    {/* ON SEARCH */}
                    <div className="w-full flex flex-row gap-[8px] items-center">
                        {statusSearchExplore && (
                            <span className="cursor-pointer" onClick={() => setStatusSearchExplore(false)}>{backIcon}</span>
                        )}

                        <input type="text" value={valueInputExploreSementara} placeholder="Cari pengguna atau topik" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} w-full p-[10px] px-[12px] outline-0 border-0 text-[12px]`}
                            style={{ borderRadius: valueInputExploreSementara.length >= 4 && outputSearchUsernameProfileData.length >= 1 ? '8px 8px 0px 0px' : '8px' }}
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
                            <p className="text-[12px] text-[var(--black-subtext)]">Mungkin hasil dari "{valueInputExplore}" kurang relevan nihh..</p>
                        )}

                        {/* LOGIC FOR SEARCH PUBLIC USER */}
                        {outputSearchUsernameProfileData && valueInputExploreSementara.length >= 4 && (
                            <>
                                {findedPublicUsers.map(user => (
                                    <div className={`${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} w-[calc(100%-48px)] p-[12px] mt-[-9px] rounded-[0px_0px_8px_8px] cursor-pointer`} onClick={() => navigate(`/user/${user.username}`)}>
                                        <span className="flex flex-row gap-[8px] items-center">
                                            <img src={user.avatar.urlAvt} alt="" className="w-[30px] h-[30px] rounded-[50px]" />
                                            <p className="text-[12px] text-white">{user.username}</p>
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <main className="mt-[16px] pb-[64px]">
                        {statusSearchExplore && valueInputExplore.length > 0 ? (
                            <Publikasi publikasiData={filteredPub} />
                        ) : (
                            <Publikasi publikasiData={publikasi} />
                        )}

                        {statusSearchExplore && filteredPub.length <= 0 && (
                            <Publikasi publikasiData={publikasi} />
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
    )
}