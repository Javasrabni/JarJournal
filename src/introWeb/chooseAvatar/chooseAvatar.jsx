import { useContext, useEffect, useRef, useState } from "react"
import { OVERALL_CONTEXT } from "../../Context/OVERALL_CONTEXT"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL";
import { ChooseAvatarContext } from "./Context/choseAvtContext";
import { useNavigate } from "react-router-dom";
import { OnEditUserProfileContext } from "../../Pages/userProfile/Context/onEditUserProfileCTX";

export function ChooseAvatar({ heading, subHeading, closeChooseAvatar, onChangeAvatar }) {
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
    const { showAllAvatar, setShowAllAvatar } = useContext(OnEditUserProfileContext)
    const navigate = useNavigate()

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
    const [clickedAvt, setClickedAvt] = useState(null)
    function HandleChooseAvatar(avt, idx) {
        setClickedAvt(idx)
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
                // setGetAvatarNavBar(data.urlAvt)
                // alert(data.message)
                setIntroAfterLogin(false)
                navigate(0)

                // CHANGE AVATAR IN PROFILE
                if (onChangeAvatar) {
                    setShowAllAvatar(false)
                    return () => setShowAllAvatar(true)
                }

            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center fixed ">
            <div className="fixed w-full h-full bg-[#00000050] left-0 top-0 z-[15]" onClick={closeChooseAvatar} />

            <div
                className={`bg-[var(--bg-12)] outline outline-1 outline-[var(--black-border)] flex items-center justify-center p-4 rounded-[12px] fixed z-[16] top-[25%]  left-[50%]`}
                style={{
                    width: `${outputGRWidth}px`,
                    height: `${outputGRHeight}px`,
                    maxWidth: "90vw", // Responsif untuk tampilan mobile
                    maxHeight: "90vh", // Membatasi tinggi pada layar kecil
                    transform: 'translateX(-50%)',
                }}
            >
                <div className="text-center p-[16px]">
                    <p className="text-[14px] text-white">{heading}</p>
                    <div
                        ref={avtScroll}
                        className={`flex flex-row gap-[16px] h-fit overflow-x-scroll p-[16px] mx-[16px] mb-[8px]`}
                        style={{ width: `${outputGRWidth}px`, maxWidth: "90vw", }}
                    >
                        {getAllAvatar.map((avt, idx) => (
                            <div className="w-[100px] h-[100px] flex-shrink-0" key={idx}>
                                <img
                                    draggable='false'
                                    onContextMenu={(e) => e.preventDefault()}
                                    src={avt.urlAvt}
                                    style={{ border: clickedAvt === idx ? '2px solid var(--blue-clr)' : 'none', transform: clickedAvt === idx ? 'scale(95%)' : 'none' }}
                                    alt="all avatar"
                                    className="w-full h-full object-cover rounded-[50px]"
                                    onClick={() => HandleChooseAvatar(avt, idx)}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[12px] text-[var(--black-subtext)]">{subHeading}</p>
                    <div className="flex flex-col justify-center items-center gap-[8px]">
                        {/* <span>
                            <input type="file"
                                className="text-[12px] mt-[8px]"
                                onChange={(evnt) => HandleFileUpload(evnt)}
                            />

                        </span> */}
                        <button
                            onClick={HandleSubmitAvatar}
                            className="text-[12px] mt-4 px-[12px] py-[4px] bg-[#1585FF] text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}