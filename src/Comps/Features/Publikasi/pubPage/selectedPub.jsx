import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ArtikelContext } from "../Context/artikelContext"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import Header from "../../../Navbar-Top/Header"
import { useNavigate } from "react-router-dom"
import Skeleton from "react-loading-skeleton"


export default function SelectedPub({ items }) {
    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)

    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    })

    // PUB CONTEXT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // PUB STATE
    const [selectedPub, setSelectedPub] = useState('')

    // GET ID
    const { id } = useParams()


    // NAVIGATE
    const navigate = useNavigate()


    // FETCHING DATA PUB
    useEffect(() => {
        const FetchSelectedPub = async () => {
            if (!id) return
            try {
                const response = await fetch(`${API_URL_PUB}/pub/${id}`, {
                    keepalive: true,
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        'ContentType': 'application/json',
                        'Connection': 'keep-alive',
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setSelectedPub(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        FetchSelectedPub()
    }, [id])

    // ICON
    const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>

    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>

    const [onLoading, setOnLoading] = useState(true)
    const { publicDataUser } = useContext(API_URL_CONTEXT)
    const { publikasi, setPublikasi } = useContext(ArtikelContext)

    const { komentarPublikasi, setKomentarPublikasi } = useContext(ArtikelContext)


    const loadingSpinner = <div role="status">
        <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
    </div>

    return (
        <div className={`max-w-[42rem] w-full h-full m-auto flex justify-center ${themeActive ? 'bg-[var(--black-card)]' : 'bg-white'} `}>
            {selectedPub ? (
                <div className="flex flex-col w-full h-full">
                    <Header
                        hideLogo={true}

                        backPage={
                            <div className="flex flex-row items-center w-full gap-[12px]" onClick={() => navigate('/Explore')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="text-[12px] text-white font-[600]">Kembali</p>
                                </div>
                            </div>
                        }
                    />
                    <div className={`p-[16px] h-full w-full`}>
                        {/* Author */}
                        <div className="flex flex-row gap-[8px] items-center" onClick={() => navigate(`/user/${selectedPub.userId}/${selectedPub.userName}`)}>
                            {publikasi && (() => {
                                const user = publikasi?.find(user => user.userName === selectedPub.userName) && publicDataUser?.find(user => user.username === selectedPub.userName); // Ambil user berdasarkan userName
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
                                                        <span className="text-[12px] font-[600] text-white">{selectedPub.userName}</span>
                                                        <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px] font-[500]`}>{selectedPub.createdAt.slice(0, 10).split('-').reverse().join('-')}</p>
                                                    </span>
                                                </p>
                                            </>
                                        )}
                                    </>
                                ) // Jika user tidak ditemukan, jangan tampilkan apa pun
                            })()}
                        </div>

                        {/* IMAGE  */}
                        {selectedPub.imageUrl && (
                            <div className="w-full h-full max-h-[240px] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px]  overflow-hidden">
                                <img src={selectedPub?.imageUrl} alt="pub-image" className="w-full h-full max-h-full object-cover rounded-[8px]" loading="lazy" />
                            </div>
                        )}

                        {/* JUDUL */}
                        <div className="pb-[16px]">
                            <h1 className={`text-[16px] ${themeActive ? 'text-[white]' : 'text-black'} font-[700] `} style={{ fontFamily: 'poppins' }}>{selectedPub.judulContent}</h1>
                        </div>





                        {/* CONTENT */}
                        <div>
                            <p className="text-[12px] text-white">{selectedPub.content}</p>
                        </div>



                        <div className={`flex flex-col gap-[8px] ${themeActive ? 'text-white' : 'text-black'} mt-[32px]`}>
                            {komentarPublikasi && (() => {
                                const getKomentar = komentarPublikasi.filter(user => user.pubId === selectedPub.id)
                                return (
                                    <>
                                        <p className="text-[12px] font-[600] text-white text-center">Komentar ({getKomentar.length})</p>

                                        <div className="flex flex-col gap-[6px]">
                                            {getKomentar.map(item =>
                                                <div className="flex flex-row gap-[8px]">
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
            ) : (
                <div className="flex flex-col gap-[8px] items-center justify-center w-full h-[100vh]">
                    <span>{loadingSpinner}</span>
                    <p className="text-[12px] text-[var(--black-subtext)]">Loading..</p>
                </div>
            )}
        </div>
    )
}