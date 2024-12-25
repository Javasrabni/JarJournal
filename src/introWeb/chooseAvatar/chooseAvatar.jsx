import { useContext, useEffect, useRef, useState } from "react"
import { OVERALL_CONTEXT } from "../../Context/OVERALL_CONTEXT"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL";
import { ChooseAvatarContext } from "./Context/choseAvtContext";

export function ChooseAvatar() {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    const { introAfterLogin, setIntroAfterLogin } = useContext(OVERALL_CONTEXT) // Status Intro after login
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { getAllAvatar, setGetAllAvatar, getAvatarNavBar, setGetAvatarNavBar } = useContext(ChooseAvatarContext)
    const avtScroll = useRef()

    // Golden Ratio
    const fullWidthClient = window.innerWidth;
    const fullHeightClient = window.innerHeight;

    const outputGRWidth = Math.round(fullHeightClient / 1.618);
    const outputGRHeight = Math.round((outputGRWidth * 1.618) / 2);

    useEffect(() => {
        if (avtScroll.current) {
            const refContainer = avtScroll.current
            refContainer.scrollLeft = (refContainer.scrollWidth - refContainer.clientWidth) / 2;
        }
    }, [getAllAvatar])

    // Handle change upload file
    const [onFileUpload, setOnFileUpload] = useState([])
    function HandleFileUpload(evnt) {
        const fileUpload = evnt.target.files[0]
        setOnFileUpload(fileUpload)
    }

    // Submit data into server
    const [selectedAllAvatar, setSelectedAllAvatar] = useState([])
    function HandleChooseAvatar(avt, idx) {
        setSelectedAllAvatar({ allAvatar: avt.urlAvt, idxAvatar: avt.Id })
    }

    // UPDATE DATA (+ AVATAR INFO DATA)
    async function HandleSubmitAvatar() {
        try {
            const response = await fetch(`${API_URL_AUTH}/auth/post-avatar`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ userFileUpload: onFileUpload, selectedAvt: selectedAllAvatar.allAvatar, idxSelectedAvatar: selectedAllAvatar.idxAvatar })
            })
            if (response.ok) {
                const data = await response.json()
                setGetAvatarNavBar(data.urlAvt)
                alert(data.message)
                // setIntroAfterLogin(false)

            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-full h-full bg-[#00000050] flex items-center justify-center fixed left-0 top-0 z-[15]">
            <div
                className={`bg-[var(--bg-12)] outline outline-1 outline-[var(--black-border)] flex items-center justify-center p-4 rounded-[12px]`}
                style={{
                    width: `${outputGRWidth}px`,
                    height: `${outputGRHeight}px`,
                    maxWidth: "90vw", // Responsif untuk tampilan mobile
                    maxHeight: "90vh", // Membatasi tinggi pada layar kecil
                }}
            >
                <div className="text-center p-[16px]">
                    <p className="text-[14px] text-white">Baguss <b>{username}!</b></p>
                    <div
                        ref={avtScroll}
                        className={`flex flex-row gap-[16px] h-fit overflow-x-scroll p-[16px] mx-[16px] mb-[8px]`}
                        style={{ width: `${outputGRWidth}px`, maxWidth: "90vw", }}
                    >
                        {getAllAvatar.map((avt, idx) => (
                            <div className="w-[100px] h-[100px] flex-shrink-0" key={idx}>
                                <img
                                    src={avt.urlAvt}
                                    alt="all avatar"
                                    className="w-full h-full object-cover rounded-[50px]"
                                    onClick={() => HandleChooseAvatar(avt, idx)}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[12px] text-[var(--black-subtext)]">Sekarang, kita pilih avatar dulu yukk</p>
                    <span>
                        <input type="file"
                            className="text-[12px]"
                            onChange={(evnt) => HandleFileUpload(evnt)}
                        />

                    </span>
                    <button
                        onClick={HandleSubmitAvatar}
                        className="text-[12px] mt-4 px-[12px] py-[4px] bg-[#1585FF] text-white rounded"
                    >
                        Okee
                    </button>
                </div>
            </div>
        </div >
    );
}