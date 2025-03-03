import { useEffect, useState, useRef, memo } from "react"
import { useContext } from "react"
import { MemoContext } from "./MemoContext"
import BoxPopupFromSetting from "../../Popup_settings/popupSetting/boxPopupFromSetting"
import { PopupFrSettingsContext } from "../../Popup_settings/popupSetting/boxPopupFromSetting"
import { motion, AnimatePresence } from "framer-motion";
import { ThemeAppContext } from "../Theme/toggleTheme.jsx/ThemeAppContext"
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL"
// import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom"

export default function Memo() {
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const navigate = useNavigate()

    // Memo Section
    const { indicatorFromMemo, setIndicatorFromMemo, memoInputValue, setMemoInputValue, editValueMemoStatus, setEditValueMemoStatus, afterEditValueMemo, setAfterEditValueMemo, valueJudulMemo, setValueJudulMemo, changeHeightMemo, setChangeHeightMemo, visibleMemo, setVisibleMemo, valueMemo, setValueMemo } = useContext(MemoContext)

    const [indicator, setIndicator] = useState(false)
    const inputActive = useRef('')

    const [popupSetting, setPopupSetting] = useState(false)
    const [dotSetting, setDotSetting] = useState(false)

    const { nameUser, setNameUser } = useContext(API_URL_CONTEXT)


    useEffect(() => {
        if (inputActive.current) {
            if (indicator) {
                inputActive.current.focus()
            }
        }
    })

    // Memo Section
    useEffect(() => {
        const HandleInputFocus = () => {
            setIndicatorFromMemo(true)
        }

        const HandleInputBlur = () => {
            setIndicator((prev) => !prev)
            setPopupSetting(false)

            if (inputActive.current) {
                inputActive.current.value = '';
            }
        }


        if (inputActive.current) {
            inputActive.current.addEventListener('focus', HandleInputFocus)
            inputActive.current.addEventListener('blur', HandleInputBlur)
        }

        return () => {
            if (inputActive.current) {
                inputActive.current.removeEventListener('focus', HandleInputFocus);
                inputActive.current.removeEventListener('blur', HandleInputBlur);
            }
        }
    })

    useEffect(() => {
        if (inputActive.current) {
            if (inputActive.current.value === "") {
                setIndicatorFromMemo(false)
            } else {
                setIndicatorFromMemo(true)
            }
        }
    })

    // Popup new memo
    const [activePopupMemo, setActivePopupMemo] = useState(false)

    const HandleClickMemo = async () => {
        if (!token) {
            alert('Login untuk menggunakan fitur');
            navigate('/Auth')
            return
        }
        // setIndicator((prev)=> !prev)
        // setIndicatorFromMemo(true)
        setActivePopupMemo(true)
    }

    function HandleChange(e) {
        const ValueInputMemo = e.target.value;
        setMemoInputValue(ValueInputMemo)
    }

    // visibility dot setting
    useEffect(() => {
        if (valueMemo.length < 1) {
            setDotSetting(false)
        } else {
            setDotSetting(true)
        }
    }, [valueMemo])

    // edit option clicked
    const { option1_Status, setOption1_Status } = useContext(PopupFrSettingsContext)

    useEffect(() => {
        if (option1_Status) {
            setPopupSetting(false)
        }
    })

    async function HandleDelMemo(index) {
        const confirmDelMemo = window.confirm(`Yakin ingin menghapus?`)
        if (!confirmDelMemo) return

        try {
            const response = await fetch(`${API_URL_AUTH}/del/memo_user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: userId, memo_idx: index })
            })
            const data = await response.json()
            if (response.ok) {
                setRefreshData(prev => !prev)
            } else {
                console.log(data.Msg)
            }
        } catch (err) {
            console.error(err)
        }
    }

    // // Edit memo function
    // function HandleEditMemo(index) {
    //     setMemoInputValue(valueMemo[index])
    //     setEditValueMemoStatus(true)
    // }

    // Keyboard on new memo
    const [keyboardActive, setKeyboardActive] = useState(false)
    function KeyboardActive() {
        if (activePopupMemo) {
            setKeyboardActive(true)
        }
    }
    function KeyboardBlur() {
        setKeyboardActive(false)
    }

    // change height after memo has more than 2 values
    // useEffect(() => {
    //     if (changeHeightMemo) {
    //         setValueMemo(valueMemo.slice(0, 2))
    //     } else {
    //         setValueMemo(valueMemo)
    //     }
    // }, [changeHeightMemo])

    // useEffect(() => {
    //     setValueMemo(prev => (prev.length > 2 ? prev.slice(0, 2) : prev))
    // })

    // Theme App
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    // Handle popup view memo
    const [openPopupMemo, setOpenPopupMemo] = useState(false)
    const [indexValueMemo, setIndexValueMemo] = useState([])
    function PopupMemoView(valueMemoIndex, time) {
        setOpenPopupMemo((prev) => !prev)
        setIndexValueMemo({ index: valueMemoIndex, time: time })
    }

    // Style 
    const BoxPopupNote = {
        position: "absolute",
        top: keyboardActive ? "20%" : "30%",
        transition: "0.5s ease",
        width: "260px",
        height: "fit-content",
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
    }
    const SubmitMemo = {
        backgroundColor: "black",
        border: "none",
        borderRadius: "8px",
        color: "#fff",
        outline: "none",
        padding: "8px",
        fontSize: "12px",
        fontWeight: "600"
    }
    // 

    // Loading memo
    const [readyMemo, setReadyMemo] = useState(false)

    // const fetchMemo = async () => {
    //     try {
    //         const response = await fetch(`${API_URL_AUTH}/auth/get-memos`, {
    //             method: "GET",
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setReadyMemo(true)
    //             setValueMemo(data.memos); // Atur memo user
    //         } else {
    //             setReadyMemo(false)
    //         }
    //     } catch (err) {
    //         console.error('Error fetching memo:', err);
    //     }
    // };

    // useEffect(() => {
    //     if (token) {
    //         fetchMemo(); // Panggil fetchMemo setelah token tersedia
    //     }
    // }, [token]);


    // const handleSaveMemo = async (newMemo) => {
    //     const response = await fetch(`${API_URL_AUTH}/auth/save-memo`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify({ memos: [...valueMemo, newMemo] })
    //     });

    //     if (response.ok) {
    //         fetchMemo();
    //     } else {
    //         const error = await response.json();
    //         console.error('Error saving memo:', error);
    //     }
    // };


    const { userId, setUserId } = useContext(API_URL_CONTEXT)
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)

    // Add memo func in btn
    const HandleAddMemo = async () => {
        if (!memoInputValue) {
            setIndicatorFromMemo(false)
            setMemoInputValue('')
            return
        }
        try {

            const response = await fetch(`${API_URL_AUTH}/post/memo_user`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ userId: userId, value_memo: memoInputValue })
            })

            const data = await response.json()

            if (response.ok) {
                console.log(data)
                setRefreshData(prev => !prev)
                setOption1_Status(false)
                setIndicatorFromMemo(false)
                setMemoInputValue('')
                setActivePopupMemo(false)
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {/* View popup memo */}
            {openPopupMemo && (
                <div style={{ color: "black", zIndex: "16", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "fixed", left: "0", top: "0" }}>
                    <div className="w-[100%] h-[100%] bg-[#00000080]" onClick={() => { setOpenPopupMemo(false) }} />

                    <div style={BoxPopupNote}>
                        <div style={{ width: "100%" }} className="flex flex-col gap-[4px] items-center">
                            <p className="text-[12px] font-[500]" style={{ whiteSpace: "pre-wrap" }}>{indexValueMemo.index}</p>
                            <p className="whitespace-pre-wrap text-[10px] break-words text-[var(--black-subtext)]">{indexValueMemo.time}</p>

                        </div>
                        {/* <button onClick={() => setOpenPopupMemo(false)} style={SubmitMemo}>Tutup</button> */}
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-center items-center" >

                {/* Popup memo  */}
                {activePopupMemo && (
                    <div style={{ color: "black", zIndex: "16", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "fixed", left: "0", top: "0" }}>
                        <div className="w-[100%] h-[100%] bg-[#00000080]" onClick={() => { setActivePopupMemo(false) }} />
                        <div style={BoxPopupNote}>
                            {/* <div style={{marginBottom: "8px", width: "100%"}}>
                     <input type="search" style={{width: "100%", outline: "none", fontSize: "14px", fontWeight: "600"}} onChange={(e) => HandleChange(e)} placeholder="Judul"  autoFocus onFocus={KeyboardActive} onBlur={KeyboardBlur} />
                   </div> */}

                            <div style={{ marginBottom: "8px", width: "100%" }}>
                                <textarea name="" id="" style={{ width: "100%", height: "100px", outline: "none", fontSize: "12px", fontWeight: "500" }} onChange={(e) => HandleChange(e)} autoFocus placeholder="Memo kamu" onFocus={KeyboardActive} onBlur={KeyboardBlur} />
                                {/* localStorage.setItem("IsiNote", e.target.value) */}
                            </div>

                            {/* <div style={{marginBottom: "8px", width: "100%"}}>
                     <input type="file" name="" id="image" accept="image/*" onChange={handleImageChange} style={{display: "none"}}/>
                     <label htmlFor="image" className="InputImageNote" onFocus={KeyboardActive} onBlur={KeyboardBlur} ><i class="fa-solid fa-plus"></i> Add image</label>
                     {nameFileNote && (
                       <div style={NameFileImageNote}>{nameFileNote}</div>
                     )}
                   </div> */}

                            <button onClick={HandleAddMemo} style={SubmitMemo}>Tambah</button>
                        </div>
                    </div>
                )}


                {/* invisible div untuk mengclose popup */}
                {popupSetting && (
                    <div onClick={() => { setPopupSetting(false); setActivePopupMemo(false) }} style={{ width: "100%", height: "100%", position: "fixed", backgroundColor: "transparent", top: "0px", left: "0px", zIndex: "10" }} />
                )}


                {/* w-[158px] */}
                <div className={`w-full ${themeActive ? 'bg-[var(--black-card)]' : 'bg-[var(--white-bg-100)]'} text-white rounded-[8px] p-[12px] gap-[12px]`} style={{ overflowWrap: "break-word", whiteSpace: "normal", outline: themeActive ? '1px solid var(--black-bg)' : "1px solid var(--white-bg-200)" }}>
                    <div className="flex flex-row items-center justify-between" style={{ marginBottom: valueMemo.length < 1 ? "0px" : "8px" }}>
                        <div className="flex flex-row gap-[4px] items-center">
                            <p className={`font-semibold text-xs ${themeActive ? 'text-white' : 'text-[var(--black-text)]'}`}>Memo</p>
                            <p className="font-[600] text-[10px]" style={{ opacity: "50%", color: themeActive ? 'white' : 'var(--black-text)' }}>({valueMemo.length})</p>
                            {/* <p className="text-[10px] font-[400 text-[#999999]">{descFeatures}</p> */}
                        </div>
                        <button className={`text-[10px] py-[4px] px-[4px] ${themeActive ? 'bg-white' : 'bg-[var(--white-bg-200)]'} text-black rounded-xl font-semibold mt-[0px]`} style={{ height: "fit-content" }} onClick={HandleClickMemo}>
                            <span className="flex gap-[4px] items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="w-full">
                        <div className="mb-[4px] flex">
                            {indicator && (
                                <span className="flex flex-row mt-[4px]">
                                    <textarea ref={inputActive} className="w-full h-[40px] outline-none text-white bg-transparent text-[10px]" placeholder="Masukkan memo" onChange={(e) => HandleChange(e)} />

                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg> */}
                                </span>
                            )}
                        </div>
                        {/* Isi dari value memo */}
                        <div className="w-full h-fit flex flex-row justify-between items-end">
                            <ul className="flex flex-col gap-[8px] w-full">
                                {valueMemo.length < 1 ? (
                                    <div>
                                        {!indicator && (
                                            <span className="flex flex-row gap-[4px] items-center text-[#999999]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>
                                                <p className="text-[10px]">Belum ada memo ...</p>
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <AnimatePresence>
                                            {valueMemo.map((item, index) =>
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeIn" }}
                                                    style={{ overflow: "hidden" }}>
                                                    {/* <li key={index + 1}> */}
                                                    {option1_Status ? (
                                                        <div className="flex flex-row gap-[8px]">
                                                            {/* Icon edit-del */}
                                                            <div className="flex flex-col items-center justify-center">
                                                                <span className="flex flex-row gap-[6px] cursor-pointer" onClick={() => HandleDelMemo(item.id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3 text-[tomato]">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                </span>
                                                                {/* <span className="cursor-pointer mt-[-2px]" onClick={()=> HandleEditMemo(index)}>
                                                                <i class="fa-regular fa-pen-to-square" style={{fontSize: "10px", }}></i>
                                                            </span> */}
                                                            </div>

                                                            {/* Value memo on edit */}
                                                            <div className={`w-full ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-200)]'} h-fit rounded ${themeActive ? 'text-white' : 'text-[var(--black-text)]'} p-[8px]`}>
                                                                <p className="whitespace-pre-wrap text-[10px] break-words"> {item.value_memo}</p>
                                                            </div>
                                                            {/* {editValueMemoStatus ? ():()} */}

                                                            {/* <div className="w-[118px]  bg-[#262626] h-fit rounded text-white p-[8px]">
                                                                        <textarea ref={inputActive} className="w-full h-[40px] outline-none text-white bg-transparent text-[10px]" placeholder="Masukkan memo" 
                                                                        onChange={()=> setAfterEditValueMemo(item, index)}>
                                                                            {item}
                                                                        </textarea>
                                                                         <p className="whitespace-pre-wrap text-[10px] break-words">{index + 1}. {item}</p> 
                                                                    </div> */}
                                                            {/* <div className="w-[118px]  bg-[#262626] h-fit rounded text-white p-[8px]">
                                                                    <p className="whitespace-pre-wrap text-[10px] break-words">{index + 1}. {item}</p>
                                                                </div> */}

                                                        </div>
                                                    ) : (
                                                        <div className={`w-full  ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-200)]'} h-fit rounded ${themeActive ? 'text-white' : 'text-[var(--black-text)]'} p-[8px]`}>
                                                            <p className="whitespace-pre-wrap text-[10px] break-words" onClick={() => PopupMemoView(item.value_memo, item.updatedAt.slice(0, 10))}> {item.value_memo}</p>
                                                        </div>
                                                    )}
                                                    {/* </li> */}
                                                </motion.li>

                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </ul>


                        </div>
                        {/* {valueMemo.length >= 2 && (
                            <p className="text-[10px] text-[var(--aksen-color)] cursor-pointer text-center pt-[8px]">Buka semua memo</p>
                        )} */}
                    </div>
                </div>
                {/* Setting 3 dots */}
                <div className={`cursor-pointer mb-[0px] h-[10px] ${themeActive ? 'bg-[var(--black-card)]' : 'bg-[var(--white-bg-100)]'} ${themeActive ? 'text-white' : 'text-black'} flex items-center justify-center`} style={{ borderRadius: "0px 0px 8px 8px", zIndex: "12", width: valueMemo.length > 1 ? "64px" : "52px", borderBottom: themeActive ? "1px solid rgb(38, 38, 38)" : "1px solid var(--white-bg-200)" }}>
                    <div className="flex flex-col items-end gap-[4px] w-[100%]">
                        {popupSetting && (
                            <BoxPopupFromSetting
                                option_1={'Edit'}
                                option_2={'Lebarkan'}
                            />
                        )}
                        <span className="mb-[2px] w-[100%] " >
                            {!indicator && (
                                <>
                                    {dotSetting && (
                                        <>
                                            {valueMemo.length > 1 ? (
                                                <div className="flex flex-row gap-[4px] items-center justify-evenly w-[100%]">
                                                    <div onClick={() => setChangeHeightMemo((prev) => !prev)}>
                                                        {changeHeightMemo ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                            </svg>

                                                        )}
                                                    </div>
                                                    <div onClick={() => setPopupSetting((prev) => !prev)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row items-center justify-evenly w-[100%]">
                                                    <div onClick={() => setPopupSetting((prev) => !prev)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}