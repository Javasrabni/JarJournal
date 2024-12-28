import { ThemeAppContext } from "../../../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext"
import { useContext, useEffect, useState } from "react"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";
import { useParams } from "react-router-dom";
import { useOnEditUserProfileContext } from "../Context/onEditUserProfileCTX";
import { useNavigate } from "react-router-dom";

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

    // IF USER DSNT MATCH WITH USERNAME TOKEN LOGIN
    useEffect(() => {
        if (!token || user !== username) {
            navigate(-1)
        }
    }, [token, username, user])

    const { bioUser, setBioUser, linkUser, setLinkUser } = useOnEditUserProfileContext()
    const [bioUserValue, setBioUserValue] = useState('')
    const [linkUserValue, setLinkUserValue] = useState('')

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
                setBioUser(data.userBio)
                setLinkUser([linkUser, ...data.userLink])

                setBioUserValue('')
                setLinkUserValue('')
                navigate(-1)
            } else {
                alert('belum berhasil')
            }
        } catch (err) {
            console.error(err)
        }
    }

    console.log(linkUser)


    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)] text-white" : "bg-white text-black"} max-w-[42rem] m-auto p-[16px] h-full`}>

            {/* FORM INPUT EDIT PROFILE */}
            <div className="flex flex-col gap-[16px] justify-center">
                <span>
                    <label htmlFor="userBio" >Bio</label>
                    <input type="text"
                        className="text-12 text-black p-[8px]"
                        value={bioUser}
                        onChange={(e) => setBioUserValue(e.target.value)} />
                </span>
                <span>
                    <label htmlFor="userBio" >Links</label>
                    <input type="text"
                        value={linkUserValue}
                        className="text-12 text-black p-[8px]"
                        onChange={(e) => setLinkUserValue(e.target.value)} />
                </span>

                <div>
                    <button onClick={OnEditProfileBE}>Ok</button>
                </div>
            </div>
        </div>
    )
}