import { useContext, useEffect, useRef, useState } from "react"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import './pubStyle.css'
import { useNavigate, useParams } from "react-router-dom"
import { OVERALL_CONTEXT } from "../../../../Context/OVERALL_CONTEXT"

// LIBRARY
import html2canvas from "html2canvas"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Publikasi() {
    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'bg-[var(--black-card)]' : 'white'
    }, [])

    // LOADING
    const { isLoading, setLoading } = useContext(OVERALL_CONTEXT)


    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)

    // STATE
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { newPublikasi, setNewPublikasi } = useContext(ArtikelContext)
    // const [user, setUser] = useState('')



    useEffect(() => {
        const fetchPub = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_PUB}/pub/get-pub`)
                if (response.ok) {
                    const data = await response.json()
                    setPublikasi(data)
                    setLoading(false)
                } else {
                    setLoading(true)
                }
                // console.log(data)
            } catch (err) {
                console.error(`gagal mendapatkan pub ${err}`)
            }
        };

        fetchPub()
    }, [])




    // Delete pub
    const DelPublikasi = async (id) => {
        try {
            const response = await fetch(`${API_URL_PUB}/pub/del-pub/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                setPublikasi((prev) => prev.filter((pub) => pub.id !== id)); // Perbarui state
                alert('Publikasi berhasil dihapus');
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Tampilkan pesan error dari server
            }
        } catch (err) {
            console.error(`Error deleting publication: ${err}`);
        }
    }

    const navigate = useNavigate()

    // Handle Select pub
    function HandleSelectedPub(id) {
        navigate(`/posts/${id}`)
    }

    // HANDLE SHARE PUB
    function HandleSharePub(pubId) {
        const params = 'http://localhost:3000/posts'
        console.log(`Link copied! "${params}/${pubId}"`)
    }


    // HANDLE LIKE
    const { likePub, setLikePub } = useContext(ArtikelContext)
    function HandleColorLike(pubId) {
        const idPub = publikasi.find(item => item.id === parseInt(pubId))
        if (idPub) {
            setLikePub((prev) => !prev)
        }
    }



    async function HandleLikePub(pubId) {
        try {
            const response = await fetch(`${API_URL_PUB}/pub/like-pub`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ LikePubId: pubId, userName: username })
            });

            if (response.ok) {
                const { publication } = await response.json();
                setPublikasi((prevPublikasi) =>
                    prevPublikasi.map((pub) =>
                        pub.id === pubId ? { ...pub, totalLikePub: publication.totalLikePub } : pub
                    )
                );
            } else {
                const { message } = await response.json();
                alert(message); // Menampilkan pesan error jika user sudah memberikan "like"
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
            if (pub.likes.length > 0 && !newRandoms[pub.id]) {
                newRandoms[pub.id] = Math.floor(Math.random() * pub.likes.length);
            }
        });
        setRandomUserLikes(newRandoms);
    }, [publikasi]);

    // TAKE SCREENSHOT IN PUB THREAD
    const pubElement2Download = useRef({})
    function DownloadPub(pubId) {
        const element = pubElement2Download.current[pubId]

        // Buat elemen pembungkus dengan padding dan background
        const wrapper = document.createElement("div");
        wrapper.style.padding = "32px"; // Sesuaikan dengan padding yang diinginkan
        wrapper.style.backgroundColor = "#f0f0f0"; // Ganti dengan warna latar belakang yang diinginkan
        wrapper.style.borderRadius = "8px"; // Untuk menambah radius pada sudut
        wrapper.style.width = "fit-content"; // Agar ukuran sesuai dengan konten

        // Salin konten elemen ke dalam wrapper
        wrapper.appendChild(element.cloneNode(true));

        // Tambahkan wrapper ke body untuk screenshot
        document.body.appendChild(wrapper);

        // Ambil screenshot dari elemen pembungkus
        html2canvas(wrapper, {
            useCORS: true,
            scale: 3, // Sesuaikan dengan resolusi layar
            scrollX: 0,
            scrollY: 0,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = `${pubId}-Threads.jpg`; // Nama file download
            link.click();

            // Hapus wrapper setelah screenshot
            document.body.removeChild(wrapper);
        });
    }

    // IMAGE PART
    const { onRenderImg, setOnRenderImg } = useContext(ArtikelContext)
    function HandleRenderImg() {
        setOnRenderImg(true)
    }

    console.log(onRenderImg)

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
        try {
            const response = await fetch(`${API_URL_PUB}/pub/add-comment`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ username: username, pubIndex: pubId, valueComment: valueINPUTComment })
            })

            if (response.ok) {
                const { publication, message } = await response.json()
                // setValueComment(publication.komentar)

                // Update komentar hanya pada publikasi tertentu
                setPublikasi((prevPublikasi) =>
                    prevPublikasi.map((pub) =>
                        pub.id === pubId
                            ? { ...pub, komentar: publication.komentar }
                            : pub
                    )
                );

                if (commentPub.current) {
                    commentPub.current.value = ''
                }
                setValueINPUTComment('')
                console.log(message)
            }
        } catch (err) {
            console.error(err)
        }
    }



    function HandleChangeComment(e) {
        setValueINPUTComment(e.target.value)
    }

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

    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>

    const loveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={`${likePub && 'tomato'}`} viewBox="0 0 24 24" strokeWidth={2} stroke={!likePub && 'white'} className="size-4" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>

    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
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
    console.log(AlgorithmPub)
    
    return (
        <div>
            {/* Daftar publikasi */}

            <div className="flex flex-col-reverse " >
                {isLoading ? (
                    <div className="flex flex-col gap-[8px]">
                        <Skeleton count={1} width={'100%'} height={'140px'} className="skeleton-delayed animate-pulse" style={{ borderRadius: '8px', animationDelay: '0.3s' }} />
                        <Skeleton count={1} width={'100%'} height={'140px'} className="animate-pulse" style={{ borderRadius: '8px' }} />
                        <Skeleton count={1} width={'100%'} height={'140px'} className="animate-pulse" style={{ borderRadius: '8px' }} />
                    </div>
                ) : (
                    <>
                        {AlgorithmPub.map((pub, index) => (
                            <div key={pub.id} style={{ marginBottom: '12px', border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '16px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px', cursor: 'pointer', height: 'fit-content' }} ref={(el) => pubElement2Download.current[pub.id] = el} >

                                <div className={`font-[inter] flex flex-col `}>

                                    <span role="button" tabIndex={0} onClick={() => HandleSelectedPub(pub.id)}>

                                        {/* JUDUL PUB */}
                                        <p className={`text-[12px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[2px]`}>{pub.judulContent}</p>

                                        {/* KONTEN PUB */}
                                        <p className={`Content-artikel text-[11px] text-white`} onClick={() => HandleSelectedPub(pub.id)}>{pub.content}</p>

                                        {/* IMAGE PUB*/}
                                        <div>
                                            {pub.imageUrl && (
                                                <>
                                                    {/* {onRenderImg ? ( */}
                                                    <div className="w-full max-h-[260px] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px] overflow-hidden">
                                                        <img
                                                            src={`${API_URL_PUB}/pub/${pub.imageUrl}`}
                                                            alt="pub-image"
                                                            className="w-full h-auto max-h-full object-cover rounded-[8px]"
                                                            loading="lazy"
                                                            onLoad={HandleRenderImg}
                                                        />
                                                    </div>
                                                    {/* ) : (
                                                        <Skeleton count={1} width={'100%'} height={'80px'} className="animate-pulse" style={{ borderRadius: '8px' }} />
                                                    )} */}

                                                </>
                                            )}
                                        </div>
                                    </span>

                                    {/* AUTHOR PUB */}
                                    <div className={`flex flex-row items-center justify-between ${pub.imageUrl ? 'mt-[8px]' : 'mt-[32px]'} h-fit`}>
                                        <div className="flex flex-row gap-[8px] items-center">
                                            <p className={`text-[11px] font-[600] pb-[0px] ${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--black-subtext)]'} `} >
                                                <span className="flex flex-col gap-[2px] justify-center">
                                                    {/* {userIcon} */}
                                                    @{pub.userName}
                                                    <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px] font-[500]`}>{pub.timeStamp}</p>
                                                </span>
                                            </p>


                                        </div>

                                        {/* CTA PUB */}
                                        <div className="flex flex-row  gap-[6px] cursor-pointer items-center">
                                            <div className="flex flex-row items-center gap-[12px] text-white">

                                                <div role="button" tabIndex={0} onClick={() => { HandleSharePub(pub.id); DownloadPub(pub.id) }}>
                                                    {shareIcon}
                                                </div>
                                                <div>
                                                    {saveIcon}
                                                </div>
                                                <div role="button" tabIndex={0} onClick={() => { HandleLikePub(pub.id); HandleColorLike(pub.id) }}>
                                                    <span className="flex flex-row gap-[2px] items-center">
                                                        {loveIcon}
                                                        <p className="text-[12px] text-white pt-[2px]">{pub.totalLikePub}</p>
                                                    </span>
                                                </div>
                                                {/* <p className={`text-[10px] pt-[1px]`}>27</p> */}
                                            </div>
                                            <div>
                                                {username === pub.userName && (
                                                    <button role="button" tabIndex={0} onClick={() => DelPublikasi(pub.id)} className={`text-[var(--black-subtext)]`}>Del</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* LIKE PUB */}
                                    <div className="pt-[2px] flex flex-col gap-[4px]">
                                        <div className="flex flex-row text-white pt-[4px]">
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
                                        </div>

                                        {/* COMMENT SECTION */}
                                        <div className="pt-[6px]">
                                            <div className="flex flex-row justify-between items-center ">

                                                <input ref={commentPub} type="text" name="commentPub" id="commentPub" placeholder="Tambahkan komentar..." className={`text-[11px] bg-transparent outline-0 border-0 pl-[0px] w-full pr-[12px]`} style={{ color: commentStateTyping ? 'white' : 'var(--black-subtext)' }} onChange={(e) => HandleChangeComment(e)} value={valueINPUTComment} />

                                                <button className={`${themeActive ? 'bg-white text-black' : 'bg-black text-white'} py-[4px] px-[4px] rounded-[6px]`} onClick={() => AddComentPub(pub.id)}>{sendIcon}</button>
                                            </div>
                                            <div className="gap-[4px] flex flex-col pt-[12px]">
                                                {pub.komentar.map((item, index) =>
                                                    <p key={index} className="text-[11px] text-white pl-[4px]">
                                                        <span className="font-[600]">{item.username}</span> {item.valueKomentar}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                        }
                    </>
                )}

            </div>
        </div >
    )
}