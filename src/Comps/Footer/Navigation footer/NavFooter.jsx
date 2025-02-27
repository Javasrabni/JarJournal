import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
import { UserProfileContext } from "../../../Pages/userProfile/Context/userProfileContext"
import { ChooseAvatarContext } from "../../../introWeb/chooseAvatar/Context/choseAvtContext"
import { OVERALL_CONTEXT } from "../../../Context/OVERALL_CONTEXT"
import Skeleton from "react-loading-skeleton"

export default function NavFooter() {
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const { introAfterLogin, setIntroAfterLogin } = useContext(OVERALL_CONTEXT)




    const navigate = useNavigate()
    const location = useLocation()
    const { username, setUsername } = useContext(API_URL_CONTEXT) // user data Verified With TOken
    const { userEmail, setUserEmail } = useContext(API_URL_CONTEXT)

    // const { usernameProfileData, setUsernameProfileData } = useContext(UserProfileContext) // GET RAW DATA USERNAME

    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT) // Get public data

    // Get avatar navbar
    const [avatarUserInNavbar, setAvatarUserInNavbar] = useState([])
    const findUser = publicDataUser.find(usn => usn.username === username)

    const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    const globeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    const userIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
    const cubeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
    const [onLoading, setOnLoading] = useState(true)


    return (
        <div className="fixed left-0 bottom-0 h-[54px] w-[100%] bg-[var(--bg-12)] z-[16] min-w-[360px] flex flex-row items-center justify-around text-white" style={{ borderTop: '1px solid var(--black-border)' }}>
            <div onClick={() => navigate('/dashboard')} className="cursor-pointer">
                <span>{homeIcon}</span>
            </div>
            <div onClick={() => navigate('/Explore')} className="cursor-pointer">
                <span>{globeIcon}</span>
            </div>
            <div onClick={() => navigate('/JJR-ChatBot')} className="cursor-pointer flex flex-col gap-[4px] items-center">
                <i class="fa-solid fa-robot"></i>
                <p className="text-[8px]">AI ChatBot</p>
                {/* <span>{cubeIcon}</span> */}
            </div>
            {username && token && (
                <div onClick={() => navigate(`/user/${findUser?.username}`)} className="cursor-pointer w-[25px] h-[25px]">
                    {onLoading && (<Skeleton circle={true} count={1} className="w-full h-full rounded-lg" />)}

                    <span>
                        <img src={findUser.avatar ? findUser.avatar : 'https://res.cloudinary.com/dwf753l9w/image/upload/v1737166429/no_profile_user_emaldm.svg'} alt={`${username} avatar`} className={`rounded-[50px] object-cover w-full h-full transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                            loading="lazy" onLoad={() => setOnLoading(false)} />
                    </span>
                </div>
            )}
        </div>
    )
}