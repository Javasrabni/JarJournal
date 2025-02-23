import { useContext, useEffect, useRef, useState } from "react"
import { OVERALL_CONTEXT } from "../../Context/OVERALL_CONTEXT"
import { API_URL_CONTEXT } from "../../Auth/Context/API_URL";
import { ChooseAvatarContext } from "./Context/choseAvtContext";
import { replace, useNavigate } from "react-router-dom";
import { OnEditUserProfileContext } from "../../Pages/userProfile/Context/onEditUserProfileCTX";

export function ChooseAvatar({ heading, subHeading, closeChooseAvatar, onChangeAvatar }) {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)

    const { introAfterLogin, setIntroAfterLogin } = useContext(OVERALL_CONTEXT) // Status Intro after login
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { getAllAvatar, setGetAllAvatar, getAvatarNavBar, setGetAvatarNavBar } = useContext(ChooseAvatarContext)
    const avtScroll = useRef()
    const { showAllAvatar, setShowAllAvatar } = useContext(OnEditUserProfileContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

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
    const [onFileUpload, setOnFileUpload] = useState(null)
    const [prevImageCustom, setPrevImageCustom] = useState(null)
    function HandleFileUpload(evnt) {
        const fileUpload = evnt.target.files[0]
        if (fileUpload) {
            const filePreview = URL.createObjectURL(fileUpload)
            setPrevImageCustom(filePreview)
            setOnFileUpload(fileUpload)
        }
    }

    // Submit data into server
    const [selectedAllAvatar, setSelectedAllAvatar] = useState([])
    const [clickedAvt, setClickedAvt] = useState(null)
    function HandleChooseAvatar(avt, idx) {
        setClickedAvt(idx)
        setSelectedAllAvatar({ selectedAvt: avt.urlAvt, idxSelectedAvatar: avt.id })
    }

    // UPDATE DATA (+ AVATAR INFO DATA)
    async function HandleSubmitAvatar() {
        setIsLoading(true)
        try {
            const newData = new FormData()
            newData.append('userId', userId)
            if (onFileUpload) {
                newData.append('file', onFileUpload)
            }
            if (selectedAllAvatar) {
                newData.append('selectedAvt', selectedAllAvatar.selectedAvt)
                newData.append('idxSelectedAvatar', selectedAllAvatar.idxSelectedAvatar)
            }

            const response = await fetch(`${API_URL_AUTH}/patch/user_avatar`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`
                }, body: newData
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                // setGetAvatarNavBar(data.urlAvt)
                // alert(data.message)
                setIntroAfterLogin(false)
                navigate(-1, { replace: true })
                setRefreshData(prev => !prev)

                // CHANGE AVATAR IN PROFILE
                if (onChangeAvatar) {
                    setShowAllAvatar(false)
                    return () => setShowAllAvatar(true)
                }

            } else {
                console.log(data)
                alert(data.Msg)
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
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
                        className={`flex flex-row gap-[16px] h-fit items-center justify-center overflow-x-scroll p-[16px] mx-[16px] mb-[8px]`}
                        style={{ width: `${outputGRWidth}px`, maxWidth: "90vw", }}
                    >
                        {isLoading ? (

                            <div role="status">
                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>


                        ) : (
                            <>


                                {prevImageCustom ? (
                                    <div className="w-[100px] h-[100px] flex-shrink-0">
                                        {prevImageCustom && (
                                            <img
                                                draggable='false'
                                                onContextMenu={(e) => e.preventDefault()}
                                                src={prevImageCustom}
                                                alt="all avatar"
                                                className="w-full h-full object-cover rounded-[50px]"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {getAllAvatar.map(avt => (
                                            <div className="w-[100px] h-[100px] flex-shrink-0" key={avt.id}>
                                                <img
                                                    draggable='false'
                                                    onContextMenu={(e) => e.preventDefault()}
                                                    src={avt.urlAvt}
                                                    style={{ border: clickedAvt === avt.id ? '2px solid var(--blue-clr)' : 'none', transform: clickedAvt === avt.id ? 'scale(95%)' : 'none' }}
                                                    alt="all avatar"
                                                    className="w-full h-full object-cover rounded-[50px]"
                                                    onClick={() => HandleChooseAvatar(avt, avt.id)}
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <p className="text-[12px] text-[var(--black-subtext)]">{subHeading}</p>
                    <div className="flex flex-col justify-center items-center gap-[8px]">
                        <span>

                            <input type="file"
                                className="text-[12px] mt-[8px]"
                                onChange={(evnt) => HandleFileUpload(evnt)}
                            />

                        </span>
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