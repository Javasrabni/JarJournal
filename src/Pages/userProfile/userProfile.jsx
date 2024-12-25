import { useParams } from "react-router-dom"
import { ThemeAppContext } from "../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { useState, useEffect, useContext } from "react"
import { UserProfileContext } from "./Context/userProfileContext"
import NavFooter from "../../Comps/Footer/Navigation footer/NavFooter"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL"
import { ChooseAvatarContext } from "../../introWeb/chooseAvatar/Context/choseAvtContext"

export default function UserProfile() {
    const { username, setUsername } = useContext(API_URL_CONTEXT) // username from token
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    }, [])

    const { usernameId } = useParams()
    const { usernameProfileData, setUsernameProfileData } = useContext(UserProfileContext) // GET RAW DATA USERNAME 
    const getRawDataUsername = usernameProfileData.filter(item => item === usernameId)

    // GET AVATAR NAVBAR (FROM INTRO AFTER LOGIN )
    const { getAvatarNavBar, setGetAvatarNavBar } = useContext(ChooseAvatarContext)


    // Golden ratio
    const fullClientHeight = window.innerHeight
    const footerHeight = 54 + 16 // (padding = 16)
    const calculateGoldenRatio = (fullClientHeight - footerHeight) / 1.618
    const outputCalculatGoldenRatio = Math.round(calculateGoldenRatio)

    // Sisa height golden ratio
    const sisaHeightGoldenRatio = fullClientHeight - outputCalculatGoldenRatio

    // GR width dari hasil sisa fullheight GR
    const lebarGRSisaFullHeightGR = (sisaHeightGoldenRatio / 1.618) / 1.5
    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)] text-white" : "bg-white text-black"} max-w-[42rem] m-auto p-[16px]`}>
            {usernameId == getRawDataUsername ? (
                <div className={`w-full h-[100vh] flex flex-col w-full`}>
                    {/* IDENTITY PROFILE */}
                    <div className="w-full flex flex-col items-start bg-[transparent]" style={{ height: `${sisaHeightGoldenRatio}px` }}>

                        {/* PHOTO PROFILE */}
                        <div style={{ height: lebarGRSisaFullHeightGR, width: '100%' }} className="bg-[transparent] w-full flex flex-row gap-[32px] items-center">
                            <div className="w-[100px] h-[100px] rounded-[50px] shrink-0">
                                {username == getRawDataUsername && (
                                    <img src={getAvatarNavBar} alt={`${getRawDataUsername} Photo Profile`} width={'100%'} className="rounded-[50px] object-cover" />
                                )}
                            </div>
                            <div className="w-full flex flex-col gap-[16px]">
                                <div className="flex flex-row justify-between gap-[16px] text-[12px]">
                                    <span className="flex flex-col items-center">
                                        <p>Post</p>
                                        <p className="font-[600]">5</p>
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
                                    <button className={`px-[12px] py-[4px] w-full ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} text-[12px] rounded-[4px]`}>Edit Profil</button>
                                </div>
                            </div>

                        </div>


                        <div>
                            {/* USERNAME USER */}
                            <div>
                                <p className="text-white font-[600]" style={{ fontSize: '16px' }}>{getRawDataUsername}</p>
                            </div>
                            <div>
                                <p className={`${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--white-bg-100)]'}`} style={{ fontSize: '12px' }}>Tangerang, Indonesia</p>
                            </div>
                        </div>
                    </div>

                    {/* POST USER */}
                    <div className="flex flex-col w-full bg-[transparent] py-[16px]" style={{ height: `${outputCalculatGoldenRatio}px`, borderTop: '1px solid var(--black-bg)' }}>
                        <p className="text-[12px]">{getRawDataUsername} Post's</p>
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