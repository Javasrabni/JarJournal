import { useParams } from "react-router-dom"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { useState, useEffect, useContext } from "react"
import { UserProfileContext } from "./Context/userProfileContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"
import { ChooseAvatarContext } from "../../introWeb/chooseAvatar/Context/choseAvtContext"
import Publikasi from "../../Comps/Features/Publikasi/pubPage/publikasi"
import { ArtikelContext } from "../../Comps/Features/Publikasi/Context/artikelContext"
import { useNavigate } from "react-router-dom"
import { useOnEditUserProfileContext } from "./Context/onEditUserProfileCTX"


export default function UserProfile() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const navigate = useNavigate()
    const { usernameId } = useParams()
    const { MainDomain } = useContext(API_URL_CONTEXT)
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT) // Get public data user
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    // const { getBadge, setGetBadge } = useContext(UserProfileContext)

    const [statusPostRrSave, setStatusPostRrSave] = useState(true)
    const getRawDataUsername = publicDataUser.find(item => item.username === usernameId) //Filtering user porfile

    const [lengthUserPost, setLengthUserPost] = useState(0)
    useEffect(() => {
        const userPost = publikasi.filter((user) => user.userName === usernameId)
        setLengthUserPost(userPost.length)
    }, [usernameId, publikasi])


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

    // State BIO
    const { bioUser, setBioUser, linkUser, setLinkUser } = useOnEditUserProfileContext()
    const ignoreProtocol = ['https://', 'http://', 'www.']

    // HANDLE COPY LINK (SHARE USER)
    async function HandleShareUser() {
        const CopyText = `${MainDomain}/user/${usernameId}`;
        try {
            await navigator.clipboard.writeText(CopyText);
            alert('Tautan pengguna berhasil disalin');
        } catch (err) {
            console.error('Gagal mendapatkan user link', err);
            alert('Gagal mendapatkan user link');
        }
    }

    // ICON
    const postIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: statusPostRrSave ? 'white' : 'var(--black-subtext)' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
    </svg>
    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={!statusPostRrSave ? 'white' : 'var(--black-subtext)'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" style={{ color: !statusPostRrSave ? 'white' : 'var(--black-subtext)' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
    const loveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={!statusPostRrSave ? 'white' : 'var(--black-subtext)'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: !statusPostRrSave ? 'white' : 'var(--black-subtext)' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
    const kalenderIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
    const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
    const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>



    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)] text-white" : "bg-white text-black"} max-w-[42rem] m-auto p-[16px] h-full`}>

            {/*  height profile nama bio link `${sisaHeightGoldenRatio}px`  */}
            {getRawDataUsername && usernameId === getRawDataUsername.username ? (
                <div className={`w-full h-full flex flex-col w-full`}>
                    {/* IDENTITY PROFILE */}
                    <div className="w-full flex flex-col items-start bg-[transparent]" style={{ height: 'fit-content' }}>

                        {/* CTA SECT */}
                        <div style={{ height: lebarGRSisaFullHeightGR, width: '100%' }} className="bg-[transparent] w-full flex flex-row gap-[32px] items-center">

                            {/* PHOTO PROFILE */}
                            <div className="w-[100px] h-[100px] rounded-[50px] shrink-0">
                                {getRawDataUsername && usernameId == getRawDataUsername.username && (
                                    <>
                                        <img src={getRawDataUsername.avatar ? getRawDataUsername.avatar : "https://res.cloudinary.com/dwf753l9w/image/upload/w_100,h_100,q_auto,f_auto/no_profile_user_emaldm.svg"} alt={`${getRawDataUsername.username} Photo Profile`} draggable='false' width={'100%'} className="rounded-[50px] object-cover w-full h-full" onContextMenu={(e) => e.preventDefault()} />
                                    </>
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-[16px] justify-center">
                                {/* USERNAME USER */}
                                <div>
                                    <div className="flex flex-col justify-center gap-[0px]">
                                        <p className="text-white font-[600]" style={{ fontSize: '16px' }}>{getRawDataUsername.username}</p>
                                        <p className={`${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--white-bg-100)]'} mt-[-3px] `} style={{ fontSize: '11px' }}>
                                            <span className="flex flex-row gap-[6px] items-center">
                                                {/* <span className="shrink-0">{kalenderIcon}</span> */}
                                                <span className="mt-[2px]">Bergabung pada {getRawDataUsername.createdAt.slice(0, 10).split('-').reverse().join('-')}</span>
                                            </span>
                                        </p>

                                    </div>
                                </div>

                                {/* CTA PROFILE BTN */}
                                <div>
                                    {token && username === getRawDataUsername.username ? (
                                        <span className="flex flex-row items-center justify-start gap-[6px]">
                                            <button className={`px-[12px] w-full h-[24px] ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} text-[12px] rounded-[6px] font-[600]`} onClick={() => navigate(`/${username}/profile/edit`)}>Atur Profil</button>

                                            <button className={`h-[24px] w-[32px] ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} text-[12px] rounded-[6px] flex items-center justify-center`} onClick={HandleShareUser}>{shareIcon}</button>
                                        </span>
                                    ) : (
                                        <span className="flex flex-row items-center justify-start gap-[6px]">
                                            <button className={`px-[12px] w-full h-[24px] ${themeActive ? 'bg-[#1585FF]' : 'bg-[var(--black-bg)]'} text-[12px] rounded-[6px] font-[600]`}>Follow</button>

                                            <button className={`h-[24px] w-[32px] ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} text-[12px] rounded-[6px] flex items-center justify-center`} onClick={HandleShareUser}>{shareIcon}</button>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* INFO SECT */}
                        <div className="w-full flex flex-col justify-between gap-[16px] text-[12px]">
                            {/* ABOUT USER SECT */}
                            {(getRawDataUsername && getRawDataUsername?.userBio || getRawDataUsername?.userLink) && (
                                <div className="w-full flex flex-col justify-between gap-[16px] text-[12px]">
                                    {/* BIO N LNK */}
                                    <div className="mt-[6px] flex flex-col justify-center gap-[2px]">
                                        {getRawDataUsername && usernameId === getRawDataUsername.username && (
                                            <>
                                                {getRawDataUsername?.userBio && (
                                                    <p className="text-[12px]">{getRawDataUsername.userBio}</p>
                                                )}

                                                {getRawDataUsername?.userLink && (
                                                    <a className="text-[12px] font-[600] w-fit" href={linkUser} target="_blank">
                                                        <span className="flex flex-row gap-[6px] items-center">{linkIcon} {getRawDataUsername.userLink}</span>
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* FOLLOWER N BADGE */}
                            <div className="w-full flex flex-col justify-between gap-[8px] text-[12px]">
                                {/* FOLLOW FOLLOWING CLIPS */}
                                <div className="w-full h-fit flex flex-row items-center justify-start gap-[16px]">
                                    <span className="flex flex-row gap-[6px] items-center">
                                        <p className="font-[600]">{lengthUserPost}</p>
                                        <p>Clips</p>
                                    </span>
                                    <span className="flex flex-row gap-[6px] items-center">
                                        <p className="font-[600]">0</p>
                                        <p>Followers</p>
                                    </span>
                                    <span className="flex flex-row gap-[6px] items-center">
                                        <p className="font-[600]">0</p>
                                        <p>Following</p>
                                    </span>
                                </div>

                                {/* BADGE */}
                                {/* <div className=" max-w-[42rem] h-fit flex flex-col gap-[4px] pb-[12px]" >
                                    <p className="text-[12px]">Achievements</p>
                                    <div className="max-w-scrollbar-hidden flex flex-row h-full h-fit gap-[16px]" style={{ overflowX: 'scroll' }}>
                                        {getRawDataUsername && getRawDataUsername.username === usernameId && (
                                            <>
                                                {getBadge.map((item, idx) =>
                                                    <>
                                                        <div className="flex flex-row items-center justify-center w-fit h-full shrink-0 gap-[8px]">
                                                            <div className="w-[25px] h-[25px] flex items-center justify-center">
                                                                <img src={item.url} alt={item.nameBadge} className="w-full h-full rounded-[50px]" />
                                                            </div>
                                                            <p className="text-[12px] font-[600]">{item.nameBadge}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* POST USER */}
                    <div className="flex flex-col w-full bg-[transparent] pt-[16px] pb-[94px] gap-[12px] mt-[16px]" style={{ height: lengthUserPost < 1 ? `${sisaHeightGoldenRatio}px` : 'fit-content', borderTop: '1px solid var(--black-bg)' }}>

                        {/* ICON CTA  */}
                        <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                            <span className={`w-full h-full flex items-center justify-center py-[8px] rounded-[6px] ${statusPostRrSave ? 'bg-[var(--black-bg)]' : 'none'}`} onClick={() => { setStatusPostRrSave(true) }}>
                                <span>{postIcon}</span>
                            </span>
                            <span className={`w-full h-full flex items-center justify-center py-[8px] rounded-[6px] ${statusPostRrSave ? 'none' : 'bg-[var(--black-bg)]'}`} onClick={() => { setStatusPostRrSave(false) }}>
                                <span>{saveIcon}</span>
                            </span>
                        </div>

                        {/* CLIPS AND LIKE SECT */}
                        <div>
                            {lengthUserPost > 0 ? (
                                <>
                                    {statusPostRrSave ? (
                                        <Publikasi publikasiData={publikasi} profilePage={getRawDataUsername.username} />
                                    ) : (
                                        <Publikasi publikasiData={publikasi} profilePageUserLikes={getRawDataUsername.username} />
                                    )}
                                </>
                            ) : (
                                <>
                                    {statusPostRrSave ? (
                                        <p className="text-[12px] font-[500] text-[var(--black-subtext)]">Belum ada postingan</p>
                                    ) : (
                                        <p className="text-[12px] font-[500] text-[var(--black-subtext)]">{getRawDataUsername.username} belum menyimpan sesuatu :/</p>
                                    )}
                                </>
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