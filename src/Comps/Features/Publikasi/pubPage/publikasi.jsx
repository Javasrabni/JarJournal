import { useContext, useEffect, useRef, useState } from "react"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import './pubStyle.css'
import { useNavigate, useParams } from "react-router-dom"
import { OVERALL_CONTEXT } from "../../../../Context/OVERALL_CONTEXT"
import { UserProfileContext } from "../../../../Pages/userProfile/Context/userProfileContext"


// LIBRARY
// import html2canvas from "html2canvas"
// import DomToImage from "dom-to-image"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "framer-motion"
import { toJpeg } from "html-to-image"

export default function Publikasi({ publikasiData, profilePage, profilePageUserLikes }) {
    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    }, [])

    // LOADING
    const { isLoading, setLoading } = useContext(OVERALL_CONTEXT)

    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)



    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { MainDomain } = useContext(API_URL_CONTEXT)

    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { usernameParamsFromUserProfile, setUsernameParamsFromUserProfile } = useContext(UserProfileContext) // username from profile page 


    // STATE
    const { publikasi, setPublikasi } = useContext(ArtikelContext)

    const { komentarPublikasi, setKomentarPublikasi } = useContext(ArtikelContext)
    const { newPublikasi, setNewPublikasi } = useContext(ArtikelContext)
    // const [user, setUser] = useState('')



    // useEffect(() => {
    //     const fetchPub = async () => {
    //         setLoading(true)
    //         try {
    //             const response = await fetch(`get-pub`)
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setPublikasi(data)
    //                 setLoading(false)
    //             } else {
    //                 setLoading(true)
    //             }
    //             // console.log(data)
    //         } catch (err) {
    //             console.error(`gagal mendapatkan pub ${err}`)
    //         }
    //     };

    //     fetchPub()
    // }, [])

    // PUBLIC DATA USER POST
    const { publicDataUser } = useContext(API_URL_CONTEXT)



    // Delete pub
    const DelPublikasi = async (id) => {
        const confirm = window.confirm('Ingin menghapus Clips?')
        if (!confirm) return

        try {
            const response = await fetch(`${API_URL_PUB}/delete/user_publikasi`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, pubId: id }),
            });

            const data = await response.json()
            if (response.ok) {
                setOnSettingPost(false)
                setRefreshData(prev => !prev)
            } else {
                // alert(data.Msg)
            }
        } catch (err) {
            console.error(`Error deleting publication: ${err}`);
        }
    }

    // const { onEditPub, setOnEditPub } = useContext(ArtikelContext)
    // const { newEntriesPubEdit, setNewEntriesPubEdit } = useContext(ArtikelContext)

    // function PatchPublikasi(judul, content, image, pubId, userIdPub) {
    //     setNewEntriesPubEdit({ judul: judul, content: content, image: image, pubId: pubId, userId: userIdPub })
    //     setOnEditPub(true)
    //     navigate(`/clips/publish`)
    // }

    const navigate = useNavigate()

    // Handle Select pub
    function HandleSelectedPub(id, pubUsername, onImage) {
        if (!onImage) {
            return
        } else {
            navigate(`/clips/${id}-${pubUsername}`)
        }
    }

    // HANDLE SHARE PUB
    async function HandleSharePub(pubId) {
        const postUrl = `${MainDomain}/clips/${pubId}-${username}`
        try {
            navigator.clipboard.writeText(postUrl)
            alert('Link tersalin!')
        } catch (err) {
            console.error(err)
            alert('gagal mendapatkan link.')
        } finally {
            setOnShareClick(false)
        }
    }

    // HANDLE LIKE

    const [likedPosts, setLikedPosts] = useState(new Set()); // Menyimpan post yang di-like

    // Ambil data like dari localStorage saat pertama kali render
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem("likedPosts")) || [];
        setLikedPosts(new Set(storedLikes));
    }, []);

    async function HandleLikePub(pubId) {
        const isLiked = likedPosts.has(pubId);
        const newLikedPosts = new Set(likedPosts);

        if (isLiked) {
            newLikedPosts.delete(pubId);
        } else {
            newLikedPosts.add(pubId);
        }

        setLikedPosts(newLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify([...newLikedPosts])); // Simpan ke localStorage

        try {
            const response = await fetch(`${API_URL_PUB}/patch/userPublikasi`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ pubId, plusLike: !isLiked })
            });

            const data = await response.json();
            if (!response.ok) {
                // alert(data.ErrMsg);
                return;
            } else {
                setRefreshData(prev => !prev)
                // console.log(data.StatusLike);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const { getSavedPublikasi, setGetSavedPublikasi } = useContext(ArtikelContext);
    const [savedPub, setSavedPub] = useState([]);

    useEffect(() => {
        // Ambil data `savedPub` dari localStorage saat pertama kali render
        const storedSavedPub = JSON.parse(localStorage.getItem("savedPublikasi")) || [];
        setSavedPub(storedSavedPub);
    }, []);

    useEffect(() => {
        // Simpan `savedPub` ke localStorage setiap kali ada perubahan
        if (savedPub.length > 0) {
            localStorage.setItem("savedPublikasi", JSON.stringify(savedPub));
        }
    }, [savedPub]);

    async function HandleSavePub(pubId) {
        let updatedSavedPub;

        setSavedPub((prev) => {
            if (prev.includes(pubId)) {
                updatedSavedPub = prev.filter(id => id !== pubId);
            } else {
                updatedSavedPub = [...prev, pubId];
            }
            return updatedSavedPub;
        });

        try {
            let response;
            if (!savedPub.includes(pubId)) {
                response = await fetch(`${API_URL_PUB}/save_publikasi`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId, pubId, username: username })
                });
            } else {
                response = await fetch(`${API_URL_PUB}/del/save_publikasi`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId, pubId, username: username })
                });
            }

            const data = await response.json();
            if (response.ok) {
                setRefreshData(prev => !prev)
                localStorage.setItem("savedPublikasi", JSON.stringify(updatedSavedPub));
            }
        } catch (err) {
            console.error(err);
        }
    }


    // RAND INDEX LIKE
    const [randomUserLikes, setRandomUserLikes] = useState({}); // Menyimpan random per pub.id
    useEffect(() => {
        const newRandoms = {};
        publikasi.forEach((pub) => {
            if (pub.totalLikePub?.length > 0 && !newRandoms[pub.id]) {
                newRandoms[pub.id] = Math.floor(Math.random() * pub.totalLikePub.length);
            }
        });
        setRandomUserLikes(newRandoms);
    }, [publikasi]);

    const [onLoading, setOnLoading] = useState(true)


    // TAKE SCREENSHOT IN PUB THREAD
    const pubElement2Download = useRef({})

    async function DownloadPub(pubId, pubUsername) {
        setOnShareClick(false);
        try {
            setTimeout(async () => {
                const element = pubElement2Download.current[pubId];
                if (!element) return;

                // Buat wrapper untuk menghindari layout berantakan
                const wrapper = document.createElement("div");
                wrapper.style.padding = "8px 32px 32px 32px";
                wrapper.style.height = "640px";
                wrapper.style.display = "flex";
                wrapper.style.flexDirection = "column";
                wrapper.style.alignItems = "center";
                wrapper.style.gap = "12px";
                wrapper.style.justifyContent = "center";
                wrapper.style.backgroundColor = "white";
                wrapper.style.borderRadius = "16px";
                wrapper.style.fontFamily = "Poppins, sans-serif"; // Pastikan font tetap

                const logo = document.createElement('p')
                logo.style.fontSize = '16px';
                logo.style.color = "black";
                logo.style.fontWeight = "800";
                logo.style.marginTop = "16px";
                logo.style.fontFamily = "newspaper black"; // Pastikan font tetap
                logo.textContent = "JarJournal";

                wrapper.appendChild(logo);

                // Clone elemen dan tambahkan ke wrapper
                const clonedElement = element.cloneNode(true);
                wrapper.appendChild(clonedElement);

                document.body.appendChild(wrapper);

                // Tunggu gambar selesai dimuat sebelum mengambil screenshot
                toJpeg(wrapper, {
                    quality: 1, // Kualitas terbaik
                    cacheBust: true,
                    pixelRatio: 5, // Tingkatkan resolusi agar tidak buram
                })
                    .then((dataUrl) => {
                        const link = document.createElement("a");
                        link.href = dataUrl;
                        link.download = `${pubId}-jarjournal-${pubUsername}.jpg`;

                        link.click();
                        // Hapus wrapper setelah selesai
                        document.body.removeChild(wrapper);
                    })
                    .catch((error) => {
                        console.error("Gagal mengambil gambar:", error);
                        // Hapus wrapper jika terjadi error
                        document.body.removeChild(wrapper);
                    });
            }, 15);
        } catch (err) {
            console.error(err);
        }
    }



    // IMAGE PART
    // const { onRenderImg, setOnRenderImg } = useContext(ArtikelContext)
    // function HandleRenderImg() {
    //     setOnRenderImg(true)
    // }

    // COMMENT PART
    const commentPub = useRef(null)
    const commentPubRef = commentPub.current

    const [commentStateTyping, setCommentStateTyping] = useState(false)
    useEffect(() => {
        if (commentPubRef) {
            const userInput = () => {
                setCommentStateTyping((prev) => !prev)
            }
            commentPubRef.addEventListener('input', userInput)
        }
    }, [commentPub])

    const [valueComment, setValueComment] = useState([])
    const [valueINPUTComment, setValueINPUTComment] = useState('')

    const AddComentPub = async (pubId) => {
        setPubOnComment(null)
        try {
            const response = await fetch(`${API_URL_PUB}/post/komentar_publikasi`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ pubId: pubId, komentar: `${valueINPUTComment}`, userId: userId })
            })

            const data = await response.json()
            if (response.ok) {
                setRefreshData(prev => !prev)
                // alert(data.Msg)

                if (commentPub.current) {
                    commentPub.current.value = ''
                }
                setValueINPUTComment('')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const [pubOnComment, setPubOnComment] = useState(null)
    function HandleChangeComment(e, pubId) {
        setValueINPUTComment(e.target.value)
        setPubOnComment(pubId)
    }

    // ON SETTING USER'S POST
    const [onSettingPost, setOnSettingPost] = useState(false)


    // ICON 
    const userIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={`${themeActive ? '' : 'white'}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const eyeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>


    const saveIconSolid = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>

    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>

    const settingPostIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ rotate: '90deg' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>

    const komenArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
    </svg>
    const Linkicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
    const DownloadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>



    const deletePost = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: 'tomato' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>






    // SIMULASI ALGORITMA FEED
    const { infiniteScrollPub, setInfiniteScrollPub } = useContext(ArtikelContext)

    function ShufflePub(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const AlgorithmPub = ShufflePub([...publikasi])



    // POPOVER
    const [onShareClick, setOnShareClick] = useState(false)
    const [selectedPubShare, setSelectedPubShare] = useState(null)

    function HandlerSharePub(index) {
        setSelectedPubShare(index)
        setTimeout(() => {
            setOnShareClick(true)
        }, 10)
    }

    return (
        <div>
            {/* Daftar publikasi */}

            <div className="flex flex-col-reverse " >
                {isLoading ? (
                    <div className="flex flex-col gap-[8px]">
                        <Skeleton count={1} width={'100%'} height={'224px'} className="skeleton-delayed animate-pulse" style={{ borderRadius: '8px', animationDelay: '0.3s' }} />
                        <Skeleton count={1} width={'100%'} height={'224px'} className="animate-pulse" style={{ borderRadius: '8px' }} />
                        <Skeleton count={1} width={'100%'} height={'224px'} className="animate-pulse" style={{ borderRadius: '8px' }} />
                    </div>
                ) : (
                    <>
                        {profilePage ? (
                            <div className="flex flex-col-reverse gap-[16px]">

                                {profilePage && publikasiData && publikasiData.filter(user => user.userId === profilePage).map((pub) =>
                                    <div key={pub.id} style={{ border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '16px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px', cursor: 'pointer', height: 'fit-content', width: '100%' }} ref={(el) => pubElement2Download.current[pub.id] = el} >

                                        <div className={`font-[inter] flex flex-col `}>
                                            <span onClick={() => HandleSelectedPub(pub.id, pub.userName, pub.imageUrl)}>

                                                {/* JUDUL PUB */}
                                                <p className={`text-[16px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[6px]`}>{pub.judulContent}</p>

                                                {/* KONTEN PUB */}
                                                <p className={`Content-artikel text-[11px] text-white`} onClick={() => HandleSelectedPub(pub.id, pub.userName)}>{pub.content}</p>

                                                {/* IMAGE PUB*/}
                                                <div>
                                                    {onLoading && (
                                                        <div className="w-full h-[260px] rounded-[16px]">
                                                            <Skeleton count={1} className="w-full h-[260px] rounded-[16px]" />

                                                        </div>
                                                    )}
                                                    {pub.imageUrl && (
                                                        <>
                                                            <div className="w-full max-h-[260px] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px] overflow-hidden relative" style={{ display: onLoading ? 'none' : 'flex' }}>
                                                                <>


                                                                    < img
                                                                        src={`${pub.imageUrl}`}
                                                                        alt="pub-image"
                                                                        className={`w-full h-auto max-h-full object-cover rounded-[8px] transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                        onLoad={() => setOnLoading(false)}

                                                                    />

                                                                </>
                                                            </div>


                                                        </>
                                                    )}
                                                </div>
                                            </span>

                                            {/* AUTHOR PUB */}
                                            <div className={`flex flex-row items-center justify-between ${pub.imageUrl ? 'mt-[8px]' : 'mt-[32px]'} h-fit`} >
                                                <div className="flex flex-row gap-[8px] items-center" onClick={() => navigate(`/user/${pub.userId}/${pub.userName}`)}>
                                                    {publikasi && (() => {
                                                        const user = publikasi?.find(user => user.userName === pub.userName) && publicDataUser?.find(user => user.username === pub.userName); // Ambil user berdasarkan userName
                                                        return (
                                                            <>
                                                                {user && (
                                                                    <>
                                                                        <div className="w-[32px] h-[32px]">
                                                                            {onLoading && (<Skeleton count={1} circle={true} className="w-full h-full" />)}
                                                                            <img
                                                                                src={user.avatar || "https://res.cloudinary.com/dwf753l9w/image/upload/w_32,h_32,q_auto/no_profile_user_emaldm.svg"}
                                                                                alt="profile"
                                                                                loading="lazy"
                                                                                crossOrigin="anonymous"
                                                                                onLoad={() => setOnLoading(false)}
                                                                                className={`rounded-[50px] object-cover w-full h-full transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                            />
                                                                        </div>
                                                                        <p className={`text-[11px] font-[600] pb-[0px] ${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--black-subtext)]'} `} >
                                                                            <span className="flex flex-col gap-[1.5px] justify-center">
                                                                                <span className="text-[12px] font-[600] text-white">{pub.userName}</span>
                                                                                <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px] font-[500]`}>{pub.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                                                            </span>
                                                                        </p>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) // Jika user tidak ditemukan, jangan tampilkan apa pun
                                                    })()}
                                                </div>

                                                {/* CTA PUB */}
                                                <div className="flex flex-row  gap-[6px] cursor-pointer items-center">
                                                    <div className="flex flex-row items-center gap-[16px] text-white justify-between relative">

                                                        {pub.id === selectedPubShare && (
                                                            <>
                                                                {/* Background overlay */}
                                                                <div className={`fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19] transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                                                    onClick={() => setOnShareClick(false)}
                                                                />

                                                                {/* Popover box */}
                                                                <div
                                                                    data-popover
                                                                    id="popover-top"
                                                                    role="tooltip"
                                                                    className={`absolute z-[50] left-1/2 bottom-full mb-2 -translate-x-1/2 w-fit text-sm text-gray-500 transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-[var(--bg-12)] border border-[var(--black-border)] rounded-lg shadow-xs`}
                                                                >
                                                                    <div className="px-3 py-2 bg-[var(--black-bg)] border-b border-[var(--black-border)] rounded-t-lg ">
                                                                        <p className="font-semibold text-[11px] text-white">Opsi bagikan</p>
                                                                    </div>
                                                                    <div className="px-3 py-2 text-white flex flex-col gap-[8px]">
                                                                        <div className="flex items-center gap-[12px]" onClick={() => HandleSharePub(pub.id)}>
                                                                            {Linkicon}
                                                                            <p className="text-[11px] ">Salin Link</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-[12px]" onClick={() => DownloadPub(pub.id, pub.userName)}>
                                                                            {DownloadIcon}
                                                                            <p className="text-[11px] ">Download</p>
                                                                        </div>
                                                                    </div>
                                                                    <div data-popper-arrow></div>
                                                                </div>
                                                            </>
                                                        )}


                                                        <div role="button" onClick={() =>
                                                            HandlerSharePub(pub.id)
                                                        }>
                                                            {shareIcon}
                                                        </div>
                                                        <div onClick={() => { HandleSavePub(pub.id); }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill={`${savedPub.includes(pub.id) ? "white" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </div>

                                                        <div role="button" onClick={() => { HandleLikePub(pub.id); }}>
                                                            <div className="relative flex flex-row gap-[2px] items-center">
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill={`${likedPosts.has(pub.id) ? "tomato" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke={!likedPosts.has(pub.id) && 'white'} className="size-4" >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                    </svg>
                                                                </span>
                                                                <p className="text-[14px] text-white pt-[1px]">{pub.totalLikePub}</p>
                                                            </div>
                                                        </div>
                                                        {userId == pub.userId && (
                                                            <div>
                                                                <>

                                                                    <span onClick={() => setOnSettingPost(prev => !prev)}>{settingPostIcon}</span>

                                                                    {onSettingPost && (
                                                                        <OnPopupSetting
                                                                            Heading={'Pengaturan Clips'}
                                                                            onClickFunc={() => setOnSettingPost(prev => !prev)}
                                                                            // Button1={<button role="button" onClick={() => {
                                                                            //     const selectedPub = { ...pub }; // Tangkap data yang sedang diklik
                                                                            //     PatchPublikasi(
                                                                            //         selectedPub.judulContent,
                                                                            //         selectedPub.content,
                                                                            //         selectedPub.imageUrl,
                                                                            //         selectedPub.id,
                                                                            //         selectedPub.userId
                                                                            //     );
                                                                            // }}>
                                                                            //     <span className="flex flex-row items-center gap-[8px]">
                                                                            //         <i class="fa-regular fa-pen-to-square" style={{ fontSize: '13px', fontWeight: '400', }}></i>
                                                                            //         <span className="text-[12px] text-white">Edit</span>
                                                                            //     </span>
                                                                            // </button>}
                                                                            Button2={<button role="button" onClick={() => DelPublikasi(pub.id)}>
                                                                                <span className="flex flex-row items-center gap-[8px]">
                                                                                    {deletePost}
                                                                                    <span className="text-[12px] text-white">Hapus </span>
                                                                                </span>
                                                                            </button>}
                                                                        />
                                                                    )}
                                                                </>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* LIKE PUB */}
                                            <div className="pt-[2px] flex flex-col gap-[4px]">
                                                {/* <div className="flex flex-row text-white pt-[4px]">
                                                {pub.likes.length >= 1 && (
                                                    <div className="leading-[1]" >
                                                        <span className="text-[11px] pr-[4px]">Disukai oleh</span>
                                                        {pub.likes.length >= 2 ? (
                                                            <span className="text-[11px]"><span className="font-[600]">{pub.likes[randomUserLikes[pub.id]]}</span> dan lainnya</span>
                                                        ) : (
                                                            <span className="text-[11px] font-[600]">{pub.likes[0]}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div> */}

                                                {/* COMMENT SECTION */}
                                                <div className="pt-[6px]">
                                                    <div className="flex flex-row justify-between items-center ">

                                                        <input ref={commentPub} type="text" name="commentPub" id="commentPub" placeholder="Tambahkan komentar..." className={`text-[11px] bg-transparent outline-0 border-0 pl-[0px] w-full pr-[12px]`} style={{ color: commentStateTyping ? 'white' : 'var(--black-subtext)' }} onChange={(e) => HandleChangeComment(e, pub.id)} value={pub.id === pubOnComment ? valueINPUTComment : null} />

                                                        <button className={`${themeActive ? 'bg-white text-black' : 'bg-black text-white'} py-[4px] px-[4px] rounded-[6px]`} onClick={() => AddComentPub(pub.id)}>{sendIcon}</button>
                                                    </div>
                                                    <div className="gap-[4px] flex flex-row gap-[2px] pt-[2px] items-center">
                                                        {komentarPublikasi && (() => {
                                                            const getKomentar = komentarPublikasi.filter(user => user.pubId === pub.id)
                                                            return (
                                                                <>
                                                                    <div className="flex flex-col gap-[4px]">
                                                                        {getKomentar.slice(0, 2).map(item =>
                                                                            <div className="flex flex-row gap-[8px]">
                                                                                <span className="text-[var(--black-subtext)]">{komenArrow}</span>
                                                                                <p key={item.id} className="text-[11px] text-white pt-[4px]">
                                                                                    <span className="font-[600] " onClick={() => navigate(`/user/${item.userId}/${item.username}`)}>{item.username}</span> {item.komentar}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )


                                                        })()}

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {profilePageUserLikes ? (
                                    <div className="flex flex-col-reverse gap-[16px]">

                                        {profilePageUserLikes && publikasiData?.filter(item => profilePageUserLikes.includes(item.id)).map(pub =>
                                            <div key={pub.id} style={{ border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '16px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px', cursor: 'pointer', height: 'fit-content', width: '100%' }} ref={(el) => pubElement2Download.current[pub.id] = el} >

                                                <div className={`font-[inter] flex flex-col `}>
                                                    <span onClick={() => HandleSelectedPub(pub.id, pub.userName, pub.imageUrl)}>

                                                        {/* JUDUL PUB */}
                                                        <p className={`text-[16px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[6px]`}>{pub.judulContent}</p>

                                                        {/* KONTEN PUB */}
                                                        <p className={`Content-artikel text-[11px] text-white`} onClick={() => HandleSelectedPub(pub.id, pub.userName)}>{pub.content}</p>

                                                        {/* IMAGE PUB*/}
                                                        <div>
                                                            {onLoading && (
                                                                <div className="w-full h-[260px] rounded-[16px]">
                                                                    <Skeleton count={1} className="w-full h-[260px] rounded-[16px]" />

                                                                </div>
                                                            )}
                                                            {pub.imageUrl && (
                                                                <>
                                                                    <div className="w-full max-h-[260px] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px] overflow-hidden relative" style={{ display: onLoading ? 'none' : 'flex' }}>
                                                                        <>


                                                                            < img
                                                                                src={`${pub.imageUrl}`}
                                                                                alt="pub-image"
                                                                                className={`w-full h-auto max-h-full object-cover rounded-[8px] transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                                onLoad={() => setOnLoading(false)}

                                                                            />

                                                                        </>
                                                                    </div>


                                                                </>
                                                            )}
                                                        </div>
                                                    </span>

                                                    {/* AUTHOR PUB */}
                                                    <div className={`flex flex-row items-center justify-between ${pub.imageUrl ? 'mt-[8px]' : 'mt-[32px]'} h-fit`} >
                                                        <div className="flex flex-row gap-[8px] items-center" onClick={() => navigate(`/user/${pub.userId}/${pub.userName}`)}>
                                                            {publikasi && (() => {
                                                                const user = publikasi?.find(user => user.userName === pub.userName) && publicDataUser?.find(user => user.username === pub.userName); // Ambil user berdasarkan userName
                                                                return (
                                                                    <>
                                                                        {user && (
                                                                            <>
                                                                                <div className="w-[32px] h-[32px]">
                                                                                    {onLoading && (<Skeleton count={1} circle={true} className="w-full h-full" />)}
                                                                                    <img
                                                                                        src={user.avatar || "https://res.cloudinary.com/dwf753l9w/image/upload/w_32,h_32,q_auto/no_profile_user_emaldm.svg"}
                                                                                        alt="profile"
                                                                                        loading="lazy"
                                                                                        crossOrigin="anonymous"
                                                                                        onLoad={() => setOnLoading(false)}
                                                                                        className={`rounded-[50px] object-cover w-full h-full transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                                    />
                                                                                </div>
                                                                                <p className={`text-[11px] font-[600] pb-[0px] ${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--black-subtext)]'} `} >
                                                                                    <span className="flex flex-col gap-[1.5px] justify-center">
                                                                                        <span className="text-[12px] font-[600] text-white">{pub.userName}</span>
                                                                                        <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px] font-[500]`}>{pub.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                                                                    </span>
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) // Jika user tidak ditemukan, jangan tampilkan apa pun
                                                            })()}
                                                        </div>

                                                        {/* CTA PUB */}
                                                        <div className="flex flex-row  gap-[6px] cursor-pointer items-center">
                                                            <div className="flex flex-row items-center gap-[16px] text-white justify-between relative">

                                                                {pub.id === selectedPubShare && (
                                                                    <>
                                                                        {/* Background overlay */}
                                                                        <div className={`fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19] transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                                                            onClick={() => setOnShareClick(false)}
                                                                        />

                                                                        {/* Popover box */}
                                                                        <div
                                                                            data-popover
                                                                            id="popover-top"
                                                                            role="tooltip"
                                                                            className={`absolute z-[50] left-1/2 bottom-full mb-2 -translate-x-1/2 w-fit text-sm text-gray-500 transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-[var(--bg-12)] border border-[var(--black-border)] rounded-lg shadow-xs dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
                                                                        >
                                                                            <div className="px-3 py-2 bg-[var(--black-bg)] border-b border-[var(--black-border)] rounded-t-lg ">
                                                                                <p className="font-semibold text-[11px] text-white">Opsi bagikan</p>
                                                                            </div>
                                                                            <div className="px-3 py-2 text-white flex flex-col gap-[8px]">
                                                                                <div className="flex items-center gap-[12px]" onClick={() => HandleSharePub(pub.id)}>
                                                                                    {Linkicon}
                                                                                    <p className="text-[11px] ">Salin Link</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[12px]" onClick={() => DownloadPub(pub.id, pub.userName)}>
                                                                                    {DownloadIcon}
                                                                                    <p className="text-[11px] ">Download</p>
                                                                                </div>
                                                                            </div>
                                                                            <div data-popper-arrow></div>
                                                                        </div>
                                                                    </>
                                                                )}


                                                                <div role="button" onClick={() =>
                                                                    HandlerSharePub(pub.id)
                                                                }>
                                                                    {shareIcon}
                                                                </div>
                                                                <div onClick={() => { HandleSavePub(pub.id); }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill={`${savedPub.includes(pub.id) ? "white" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                                    </svg>
                                                                </div>

                                                                <div role="button" onClick={() => { HandleLikePub(pub.id); }}>
                                                                    <div className="relative flex flex-row gap-[2px] items-center">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill={`${likedPosts.has(pub.id) ? "tomato" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke={!likedPosts.has(pub.id) && 'white'} className="size-4" >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                            </svg>
                                                                        </span>
                                                                        <p className="text-[14px] text-white pt-[1px]">{pub.totalLikePub}</p>
                                                                    </div>
                                                                </div>
                                                                {userId == pub.userId && (
                                                                    <div>
                                                                        <>

                                                                            <span onClick={() => setOnSettingPost(prev => !prev)}>{settingPostIcon}</span>

                                                                            {onSettingPost && (
                                                                                <OnPopupSetting
                                                                                    Heading={'Pengaturan Clips'}
                                                                                    onClickFunc={() => setOnSettingPost(prev => !prev)}
                                                                                    // Button1={<button role="button" onClick={() => {
                                                                                    //     const selectedPub = { ...pub }; // Tangkap data yang sedang diklik
                                                                                    //     PatchPublikasi(
                                                                                    //         selectedPub.judulContent,
                                                                                    //         selectedPub.content,
                                                                                    //         selectedPub.imageUrl,
                                                                                    //         selectedPub.id,
                                                                                    //         selectedPub.userId
                                                                                    //     );
                                                                                    // }}>
                                                                                    //     <span className="flex flex-row items-center gap-[8px]">
                                                                                    //         <i class="fa-regular fa-pen-to-square" style={{ fontSize: '13px', fontWeight: '400', }}></i>
                                                                                    //         <span className="text-[12px] text-white">Edit</span>
                                                                                    //     </span>
                                                                                    // </button>}
                                                                                    Button2={<button role="button" onClick={() => DelPublikasi(pub.id)}>
                                                                                        <span className="flex flex-row items-center gap-[8px]">
                                                                                            {deletePost}
                                                                                            <span className="text-[12px] text-white">Hapus </span>
                                                                                        </span>
                                                                                    </button>}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* LIKE PUB */}
                                                    <div className="pt-[2px] flex flex-col gap-[4px]">
                                                        {/* <div className="flex flex-row text-white pt-[4px]">
                                                        {pub.likes.length >= 1 && (
                                                            <div className="leading-[1]" >
                                                                <span className="text-[11px] pr-[4px]">Disukai oleh</span>
                                                                {pub.likes.length >= 2 ? (
                                                                    <span className="text-[11px]"><span className="font-[600]">{pub.likes[randomUserLikes[pub.id]]}</span> dan lainnya</span>
                                                                ) : (
                                                                    <span className="text-[11px] font-[600]">{pub.likes[0]}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div> */}

                                                        {/* COMMENT SECTION */}
                                                        <div className="pt-[6px]">
                                                            <div className="flex flex-row justify-between items-center ">

                                                                <input ref={commentPub} type="text" name="commentPub" id="commentPub" placeholder="Tambahkan komentar..." className={`text-[11px] bg-transparent outline-0 border-0 pl-[0px] w-full pr-[12px]`} style={{ color: commentStateTyping ? 'white' : 'var(--black-subtext)' }} onChange={(e) => HandleChangeComment(e, pub.id)} value={pub.id === pubOnComment ? valueINPUTComment : null} />

                                                                <button className={`${themeActive ? 'bg-white text-black' : 'bg-black text-white'} py-[4px] px-[4px] rounded-[6px]`} onClick={() => AddComentPub(pub.id)}>{sendIcon}</button>
                                                            </div>
                                                            <div className="gap-[4px] flex flex-row gap-[2px] pt-[2px] items-center">
                                                                {komentarPublikasi && (() => {
                                                                    const getKomentar = komentarPublikasi.filter(user => user.pubId === pub.id)
                                                                    return (
                                                                        <>
                                                                            <div className="flex flex-col gap-[4px]">
                                                                                {getKomentar.slice(0, 2).map(item =>
                                                                                    <div className="flex flex-row gap-[8px]">
                                                                                        <span className="text-[var(--black-subtext)]">{komenArrow}</span>
                                                                                        <p key={item.id} className="text-[11px] text-white pt-[4px]">
                                                                                            <span className="font-[600] " onClick={() => navigate(`/user/${item.userId}/${item.username}`)}>{item.username}</span> {item.komentar}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    )


                                                                })()}

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                ) : (
                                    <div className="flex flex-col-reverse gap-[16px]">
                                        {/* EXPLORE VIEW */}
                                        {publikasiData?.map(pub => (
                                            <div key={pub.id} style={{ border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '16px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px', cursor: 'pointer', height: 'fit-content', width: '100%' }} ref={(el) => pubElement2Download.current[pub.id] = el} >

                                                <div className={`font-[inter] flex flex-col `}>
                                                    <span onClick={() => HandleSelectedPub(pub.id, pub.userName, pub.imageUrl)}>

                                                        {/* JUDUL PUB */}
                                                        <p className={`text-[16px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[6px]`}>{pub.judulContent}</p>

                                                        {/* KONTEN PUB */}
                                                        <p className={`Content-artikel text-[11px] text-white`} onClick={() => HandleSelectedPub(pub.id, pub.userName)}>{pub.content}</p>

                                                        {/* IMAGE PUB*/}
                                                        <div>
                                                            {onLoading && (
                                                                <div className="w-full h-[260px] rounded-[16px]">
                                                                    <Skeleton count={1} className="w-full h-[260px] rounded-[16px]" />

                                                                </div>
                                                            )}
                                                            {pub.imageUrl && (
                                                                <>
                                                                    <div className="w-full max-h-[260px] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px] overflow-hidden relative" style={{ display: onLoading ? 'none' : 'flex' }}>
                                                                        <>


                                                                            < img
                                                                                src={`${pub.imageUrl}`}
                                                                                alt="pub-image"
                                                                                className={`w-full h-auto max-h-full object-cover rounded-[8px] transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                                onLoad={() => setOnLoading(false)}

                                                                            />

                                                                        </>
                                                                    </div>


                                                                </>
                                                            )}
                                                        </div>
                                                    </span>

                                                    {/* AUTHOR PUB */}
                                                    <div className={`flex flex-row items-center justify-between ${pub.imageUrl ? 'mt-[8px]' : 'mt-[32px]'} h-fit`} >
                                                        <div className="flex flex-row gap-[8px] items-center" onClick={() => navigate(`/user/${pub.userId}/${pub.userName}`)}>
                                                            {publikasi && (() => {
                                                                const user = publikasi?.find(user => user.userName === pub.userName) && publicDataUser?.find(user => user.username === pub.userName); // Ambil user berdasarkan userName
                                                                return (
                                                                    <>
                                                                        {user && (
                                                                            <>
                                                                                <div className="w-[32px] h-[32px]">
                                                                                    {onLoading && (<Skeleton count={1} circle={true} className="w-full h-full" />)}
                                                                                    <img
                                                                                        src={user.avatar || "https://res.cloudinary.com/dwf753l9w/image/upload/w_32,h_32,q_auto/no_profile_user_emaldm.svg"}
                                                                                        alt="profile"
                                                                                        loading="lazy"
                                                                                        crossOrigin="anonymous"
                                                                                        onLoad={() => setOnLoading(false)}
                                                                                        className={`rounded-[50px] object-cover w-full h-full transition-opacity duration-300 ${onLoading ? 'opacity-0' : 'opacity-100'}`}
                                                                                    />
                                                                                </div>
                                                                                <p className={`text-[11px] font-[600] pb-[0px] ${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--black-subtext)]'} `} >
                                                                                    <span className="flex flex-col gap-[1.5px] justify-center">
                                                                                        <span className="text-[12px] font-[600] text-white">{pub.userName}</span>
                                                                                        <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px] font-[500]`}>{pub.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                                                                    </span>
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) // Jika user tidak ditemukan, jangan tampilkan apa pun
                                                            })()}
                                                        </div>

                                                        {/* CTA PUB */}
                                                        <div className="flex flex-row  gap-[6px] cursor-pointer items-center">
                                                            <div className="flex flex-row items-center gap-[16px] text-white justify-between relative">

                                                                {pub.id === selectedPubShare && (
                                                                    <>
                                                                        {/* Background overlay */}
                                                                        <div className={`fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19] transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                                                            onClick={() => setOnShareClick(false)}
                                                                        />

                                                                        {/* Popover box */}
                                                                        <div
                                                                            data-popover
                                                                            id="popover-top"
                                                                            role="tooltip"
                                                                            className={`absolute z-[50] left-1/2 bottom-full mb-2 -translate-x-1/2 w-fit text-sm text-gray-500 transition-opacity duration-200 ${onShareClick ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-[var(--bg-12)] border border-[var(--black-border)] rounded-lg shadow-xs dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
                                                                        >
                                                                            <div className="px-3 py-2 bg-[var(--black-bg)] border-b border-[var(--black-border)] rounded-t-lg ">
                                                                                <p className="font-semibold text-[11px] text-white">Opsi bagikan</p>
                                                                            </div>
                                                                            <div className="px-3 py-2 text-white flex flex-col gap-[8px]">
                                                                                <div className="flex items-center gap-[12px]" onClick={() => HandleSharePub(pub.id)}>
                                                                                    {Linkicon}
                                                                                    <p className="text-[11px] ">Salin Link</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[12px]" onClick={() => DownloadPub(pub.id, pub.userName)}>
                                                                                    {DownloadIcon}
                                                                                    <p className="text-[11px] ">Download</p>
                                                                                </div>
                                                                            </div>
                                                                            <div data-popper-arrow></div>
                                                                        </div>
                                                                    </>
                                                                )}


                                                                <div role="button" onClick={() =>
                                                                    HandlerSharePub(pub.id)
                                                                }>
                                                                    {shareIcon}
                                                                </div>
                                                                <div onClick={() => { HandleSavePub(pub.id); }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill={`${savedPub.includes(pub.id) ? "white" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                                    </svg>
                                                                </div>

                                                                <div role="button" onClick={() => { HandleLikePub(pub.id); }}>
                                                                    <div className="relative flex flex-row gap-[2px] items-center">
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill={`${likedPosts.has(pub.id) ? "tomato" : "var(--bg-12)"}`} viewBox="0 0 24 24" strokeWidth={2} stroke={!likedPosts.has(pub.id) && 'white'} className="size-4" >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                            </svg>
                                                                        </span>
                                                                        <p className="text-[14px] text-white pt-[1px]">{pub.totalLikePub}</p>
                                                                    </div>
                                                                </div>
                                                                {userId == pub.userId && (
                                                                    <div>
                                                                        <>

                                                                            <span onClick={() => setOnSettingPost(prev => !prev)}>{settingPostIcon}</span>

                                                                            {onSettingPost && (
                                                                                <OnPopupSetting
                                                                                    Heading={'Pengaturan Clips'}
                                                                                    onClickFunc={() => setOnSettingPost(prev => !prev)}
                                                                                    // Button1={<button role="button" onClick={() => {
                                                                                    //     const selectedPub = { ...pub }; // Tangkap data yang sedang diklik
                                                                                    //     PatchPublikasi(
                                                                                    //         selectedPub.judulContent,
                                                                                    //         selectedPub.content,
                                                                                    //         selectedPub.imageUrl,
                                                                                    //         selectedPub.id,
                                                                                    //         selectedPub.userId
                                                                                    //     );
                                                                                    // }}>
                                                                                    //     <span className="flex flex-row items-center gap-[8px]">
                                                                                    //         <i class="fa-regular fa-pen-to-square" style={{ fontSize: '13px', fontWeight: '400', }}></i>
                                                                                    //         <span className="text-[12px] text-white">Edit</span>
                                                                                    //     </span>
                                                                                    // </button>}
                                                                                    Button2={<button role="button" onClick={() => DelPublikasi(pub.id)}>
                                                                                        <span className="flex flex-row items-center gap-[8px]">
                                                                                            {deletePost}
                                                                                            <span className="text-[12px] text-white">Hapus </span>
                                                                                        </span>
                                                                                    </button>}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* LIKE PUB */}
                                                    <div className="pt-[2px] flex flex-col gap-[4px]">
                                                        {/* <div className="flex flex-row text-white pt-[4px]">
                                                            {pub.likes.length >= 1 && (
                                                                <div className="leading-[1]" >
                                                                    <span className="text-[11px] pr-[4px]">Disukai oleh</span>
                                                                    {pub.likes.length >= 2 ? (
                                                                        <span className="text-[11px]"><span className="font-[600]">{pub.likes[randomUserLikes[pub.id]]}</span> dan lainnya</span>
                                                                    ) : (
                                                                        <span className="text-[11px] font-[600]">{pub.likes[0]}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div> */}

                                                        {/* COMMENT SECTION */}
                                                        <div className="pt-[6px]">
                                                            <div className="flex flex-row justify-between items-center ">

                                                                <input ref={commentPub} type="text" name="commentPub" id="commentPub" placeholder="Tambahkan komentar..." className={`text-[11px] bg-transparent outline-0 border-0 pl-[0px] w-full pr-[12px]`} style={{ color: commentStateTyping ? 'white' : 'var(--black-subtext)' }} onChange={(e) => HandleChangeComment(e, pub.id)} value={pub.id === pubOnComment ? valueINPUTComment : null} />

                                                                <button className={`${themeActive ? 'bg-white text-black' : 'bg-black text-white'} py-[4px] px-[4px] rounded-[6px]`} onClick={() => AddComentPub(pub.id)}>{sendIcon}</button>
                                                            </div>
                                                            <div className="gap-[4px] flex flex-row gap-[2px] pt-[2px] items-center">
                                                                {komentarPublikasi && (() => {
                                                                    const getKomentar = komentarPublikasi.filter(user => user.pubId === pub.id)
                                                                    return (
                                                                        <>
                                                                            <div className="flex flex-col gap-[4px]">
                                                                                {getKomentar.slice(0, 2).map(item =>
                                                                                    <div className="flex flex-row gap-[8px]">
                                                                                        <span className="text-[var(--black-subtext)]">{komenArrow}</span>
                                                                                        <p key={item.id} className="text-[11px] text-white pt-[4px]">
                                                                                            <span className="font-[600] " onClick={() => navigate(`/user/${item.userId}/${item.username}`)}>{item.username}</span> {item.komentar}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    )


                                                                })()}

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </>
                        )}
                    </>
                )}

            </div>
        </div >
    )
}

// SETTING MENU POPUP COMP
export const OnPopupSetting = ({ Button1, Button2, Heading, onClickFunc, JurnalSect, jurnalAdd }) => {
    const XIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

    return (
        <>
            <div className="fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19]" onClick={onClickFunc} />
            <motion.div
                className="rounded-[24px_24px_0px_0px] z-[20] max-w-[42rem] w-full h-fit bg-[var(--bg-12)] outline outline-[1px] outline-[var(--black-border)] fixed bottom-0 left-[50%] flex p-[16px]"
                style={{ transform: 'translateX(-50%)' }}
                initial={{ y: 100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                exit={{ y: 100, x: "-50%", opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }} // Transisi 0.2 detik
            >
                <div className="w-full flex flex-col items-start justify-between">
                    <span className="pb-[16px] w-full flex flex-row items-center justify-between">
                        <span>
                            <p className="text-[12px] text-center text-white select-none">{Heading}</p>
                        </span>
                        <span onClick={onClickFunc} className="cursor-pointer text-white">
                            {XIcon}
                        </span>
                    </span>
                    <div className="w-full flex flex-col gap-[8px] cursor-pointer">
                        {Button1 && (
                            <span className="w-full p-[12px] bg-[var(--black-bg)] flex items-center rounded-[12px] flex items-center justify-center">{Button1}</span>
                        )}
                        {Button2 && (
                            <>
                                {jurnalAdd ? (
                                    <span>{Button2}</span>
                                ) : (
                                    <span className={`w-full p-[12px] ${JurnalSect ? 'bg-[var(--blue-clr)]' : 'bg-[var(--black-bg)]'} flex items-center rounded-[12px] flex items-center justify-center`}>{Button2}</span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    )
}