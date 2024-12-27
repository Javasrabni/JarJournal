import { useParams } from "react-router-dom"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { useState, useEffect, useContext } from "react"
import { UserProfileContext } from "./Context/userProfileContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"
import { ChooseAvatarContext } from "../../introWeb/chooseAvatar/Context/choseAvtContext"
import Publikasi from "../../Comps/Features/Publikasi/pubPage/publikasi"
import { ArtikelContext } from "../../Comps/Features/Publikasi/Context/artikelContext"

export default function UserProfile() {
    const { usernameId } = useParams()
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT) // Get public data user
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const [statusPostRrSave, setStatusPostRrSave] = useState(true)

    const getRawDataUsername = publicDataUser.find(item => item.username === usernameId) //Filtering user porfile

    const [lengthUserPost, setLengthUserPost] = useState(0)
    useEffect(() => {
        const userPost = publikasi.filter((user) => user.userName === getRawDataUsername.username)
        setLengthUserPost(userPost.length)
    }, [lengthUserPost, getRawDataUsername?.username])

    const { username, setUsername } = useContext(API_URL_CONTEXT) // username from token
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    }, [])

    // GET AVATAR NAVBAR (FROM INTRO AFTER LOGIN )
    const { getAvatarNavBar, setGetAvatarNavBar } = useContext(ChooseAvatarContext)

    // const getRawDataUsername = publicDataUser.find(item => {
    //     console.log(item.username, usernameId);  // Debug perbandingan username
    //     return item.username === usernameId;
    // });

    // console.log(getRawDataUsername);  // Cek apa yang ditemukan




    // Golden ratio
    const fullClientHeight = window.innerHeight
    const footerHeight = 54 + 16 // (padding = 16)
    const calculateGoldenRatio = (fullClientHeight - footerHeight) / 1.618
    const outputCalculatGoldenRatio = Math.round(calculateGoldenRatio)

    // Sisa height golden ratio
    const sisaHeightGoldenRatio = fullClientHeight - outputCalculatGoldenRatio

    // GR width dari hasil sisa fullheight GR
    const lebarGRSisaFullHeightGR = (sisaHeightGoldenRatio / 1.618) / 1.5


    // ICON
    const postIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
    </svg>

    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>



    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)] text-white" : "bg-white text-black"} max-w-[42rem] m-auto p-[16px] h-full`}>
            {getRawDataUsername && usernameId === getRawDataUsername.username ? (
                <div className={`w-full h-full flex flex-col w-full`}>
                    {/* IDENTITY PROFILE */}
                    <div className="w-full flex flex-col items-start bg-[transparent]" style={{ height: `${sisaHeightGoldenRatio}px` }}>

                        {/* PHOTO PROFILE */}
                        <div style={{ height: lebarGRSisaFullHeightGR, width: '100%' }} className="bg-[transparent] w-full flex flex-row gap-[32px] items-center">
                            <div className="w-[100px] h-[100px] rounded-[50px] shrink-0">
                                {getRawDataUsername && usernameId == getRawDataUsername.username && (
                                    <>
                                        <img src={getRawDataUsername.avatar.urlAvt} alt={`${getRawDataUsername.username} Photo Profile`} width={'100%'} className="rounded-[50px] object-cover" />
                                    </>
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-[16px]">
                                <div className="flex flex-row justify-between gap-[16px] text-[12px]">
                                    <span className="flex flex-col items-center">
                                        <p>Post</p>
                                        <p className="font-[600]">{lengthUserPost}</p>
                                    </span>
                                    <span className="flex flex-col items-center">
                                        <p>Followers</p>
                                        <p className="font-[600]">234</p>
                                    </span>
                                    <span className="flex flex-col items-center">
                                        <p>Following</p>
                                        <p className="font-[600]">544</p>
                                    </span>
                                </div>
                                <div>
                                    {username === getRawDataUsername.username ? (
                                        <button className={`px-[12px] py-[4px] w-full ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} text-[12px] rounded-[4px]`}>Edit Profil</button>
                                    ) : (
                                        <button className={`px-[12px] py-[4px] w-full ${themeActive ? 'bg-[#1585FF]' : 'bg-[var(--black-bg)'} text-[12px] rounded-[4px]`}>Follow</button>
                                    )}
                                </div>
                            </div>

                        </div>


                        <div>
                            {/* USERNAME USER */}
                            <div>
                                <p className="text-white font-[600]" style={{ fontSize: '16px' }}>{getRawDataUsername.username}</p>
                            </div>
                            <div>
                                <p className={`${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--white-bg-100)]'}`} style={{ fontSize: '12px' }}>Tangerang, Indonesia</p>
                            </div>
                        </div>
                    </div>
                    {/* POST USER */}
                    <div className="flex flex-col w-full bg-[transparent] pt-[16px] pb-[94px] gap-[12px]" style={{ height: lengthUserPost < 1 ? `${sisaHeightGoldenRatio}px` : 'fit-content', borderTop: '1px solid var(--black-bg)' }}>
                        <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                            <span className={`w-full h-full flex items-center justify-center py-[8px] rounded-[6px] ${statusPostRrSave ? 'bg-[var(--black-bg)]' : 'none'}`} onClick={() => { setStatusPostRrSave(true) }}>
                                <span>{postIcon}</span>
                            </span>
                            <span className={`w-full h-full flex items-center justify-center py-[8px] rounded-[6px] ${statusPostRrSave ? 'none' : 'bg-[var(--black-bg)]'}`} onClick={() => { setStatusPostRrSave(false) }}>
                                <span>{saveIcon}</span>
                            </span>

                        </div>
                        <div>
                            {lengthUserPost > 0 ? (
                                <>
                                    {statusPostRrSave ? (
                                        <Publikasi publikasiData={publikasi} profilePage={getRawDataUsername.username} />
                                    ) : (
                                        <p>saved</p>
                                    )}
                                </>
                            ) : (
                                <p className="text-[12px] font-[600]">Belum ada postingan</p>
                            )}
                        </div>
                    </div>




                </div>
            ) : (
                <p className="text-white">Username tidak ditemukan</p>
            )}
            <div>
                <NavFooter />
            </div>
        </div>
    )
}