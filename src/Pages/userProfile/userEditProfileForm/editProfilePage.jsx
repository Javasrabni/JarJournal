import { ThemeAppContext } from "../../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { useContext, useEffect, useState } from "react"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";
import { useParams } from "react-router-dom";
import { useOnEditUserProfileContext } from "../Context/onEditUserProfileCTX";
import { useNavigate } from "react-router-dom";
import { FeedBackELM } from "../../../home";
import { ChooseAvatar } from "../../../introWeb/chooseAvatar/chooseAvatar";
import { OnEditUserProfileContext } from "../Context/onEditUserProfileCTX";

export default function EditProfilePage() {
    // AUTH SECT
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    const navigate = useNavigate()
    const { user } = useParams()
    const { publicDataUser, setPublicDataUser } = useContext(API_URL_CONTEXT) // Get public data user
    const { username, setUsername } = useContext(API_URL_CONTEXT) // username from token
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { showAllAvatar, setShowAllAvatar } = useContext(OnEditUserProfileContext)

    // IF USER DSNT MATCH WITH USERNAME TOKEN LOGIN
    useEffect(() => {
        if (!token || user !== username) {
            navigate(-1)
        }
    }, [token, username, user])

    const { bioUser, setBioUser, linkUser, setLinkUser } = useOnEditUserProfileContext()
    const [bioUserValue, setBioUserValue] = useState('')
    const [linkUserValue, setLinkUserValue] = useState('')

    // GET VALUE BIO N LINK
    useEffect(() => {
        const getBionLinkUser = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    console.log('ASDASDASd')
                    setBioUser(data.getBioUser)
                    setLinkUser(data.getLinkUser)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getBionLinkUser()
    }, [])

    console.log(bioUser)

    // VALUE SEMENTARA
    useEffect(() => {
        setBioUserValue(bioUser)
        setLinkUserValue(linkUser)
    }, [bioUser, linkUser])

    const OnEditProfileBE = async () => {
        // Validasi form Link
        // const protocol = ['https://', 'http://', 'www.']
        // if (!protocol.some(protocol => linkUserValue.startsWith(protocol))) {
        //     alert('masukan url yang valid!')
        //     return
        // }

        try {
            const response = await fetch(`${API_URL_AUTH}/auth/profile-edit`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ bioUserEdit: bioUserValue, linkUserEdit: linkUserValue })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)

                setBioUser(data.userBio)
                setLinkUser(data.userLink)

                navigate(`/user/${username}`, { replace: true })
                window.location.reload()
            } else {
                alert('belum berhasil')
            }
        } catch (err) {
            console.error(err)
        }
    }

    function HandleEditAvatar() {
        setShowAllAvatar(true)
        return () => setShowAllAvatar(false)
    }

    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
    const cameraIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>


    return (
        <>
            {/* heading */}
            <div className="flex w-full h-[65px] justify-between items-center px-[16px] text-white" role="heading">
                <div className="flex flex-row gap-[12px] items-center text-[14px] font-[600]">
                    <span onClick={() => navigate(-1)} className="pr-[6px] cursor-pointer">{backIcon}</span>
                    <p className="select-none">Edit profil</p>
                </div>
                <button onClick={OnEditProfileBE} className="text-[12px] text-[var(--blue-clr)]">Simpan</button>
            </div>

            <div className={`${themeActive ? "bg-[var(--bg-12)] text-white" : "bg-white text-black"} max-w-[42rem] m-auto p-[16px] h-full`}>

                {/* FORM INPUT EDIT PROFILE */}
                <div className="flex flex-col gap-[16px] justify-center w-full h-full">
                    {/* FOTO PROFIL */}
                    <div>
                        {showAllAvatar && (
                            <div className="fixed z-[16]">
                                <ChooseAvatar heading={'Ganti avatar'} subHeading={''} closeChooseAvatar={() => setShowAllAvatar(false)} onChangeAvatar={true} />
                            </div>
                        )}

                        {publicDataUser.map((item, idx) =>
                            <>
                                {username == item.username && (
                                    <div className="flex flex-col gap-[12px] items-center justify-center">
                                        <div className="w-fit m-auto h-fit flex items-center justify-center cursor-pointer z-[12]" onClick={HandleEditAvatar}>
                                            <div className="absolute w-[100px] h-[100px] bg-[#00000090] rounded-[50px]" />
                                            <span className="absolute">{cameraIcon}</span>
                                            <img src={item.avatar.urlAvt} alt={item.username + "user profile"} className='w-[100px] h-[100px] rounded-[50px]' draggable='false' />
                                        </div>
                                        <p className="text-[14px] text-[var(--black-subtext)] select-none">Foto profil</p>
                                    </div >
                                )}
                            </>
                        )}
                    </div>

                    {/* BIO N LINK */}
                    <span className="flex flex-col gap-[4px]">
                        <label htmlFor="userBio" className="pl-[6px] text-[14px] text-[var(--black-subtext)]">Bio</label>
                        <input type="text"
                            className="text-[12px] text-white px-[12px] py-[12px] outline-0 border-0 bg-[var(--black-bg)] rounded-[6px]"
                            value={bioUserValue}
                            placeholder="Deskripsikan diri"
                            onChange={(e) => setBioUserValue(e.target.value)} />
                    </span>
                    <span className="flex flex-col gap-[4px]">
                        <label htmlFor="userBio" className="pl-[6px] text-[14px] text-[var(--black-subtext)]">Link</label>
                        <input type="text"
                            value={linkUserValue}
                            placeholder="Perluas koneksi"
                            className="text-[12px] text-white px-[12px] py-[12px] outline-0 border-0 bg-[var(--black-bg)] rounded-[6px]"
                            onChange={(e) => setLinkUserValue(e.target.value)} />
                    </span>

                    {/* FEEDBACK SECT */}
                    <div>
                        <FeedBackELM />
                    </div>


                </div>
            </div >
        </>
    )
}

