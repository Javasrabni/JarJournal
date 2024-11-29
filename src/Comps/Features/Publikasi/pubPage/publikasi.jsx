import { useContext, useEffect, useState } from "react"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import './pubStyle.css'
import { useNavigate, useParams } from "react-router-dom"

export default function Publikasi() {
    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // GET USERNAME CONTEXT
    const { nameUser, setNameUser } = useContext(API_URL_CONTEXT)

    // STATE
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { newPublikasi, setNewPublikasi } = useContext(ArtikelContext)
    // const [user, setUser] = useState('')

    // THEME
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)


    useEffect(() => {
        const fetchPub = async () => {
            try {
                const response = await fetch(`${API_URL_PUB}/pub/get-pub`)
                const data = await response.json()
                setPublikasi(data)
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
                body: JSON.stringify({ nameUser }),
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

    const userIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={`${themeActive ? '' : 'white'}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const eyeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>

    const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>

    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>

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

    return (
        <div>
            {/* Daftar publikasi */}
            <div className="flex flex-col-reverse">
                {publikasi.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '12px', border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '16px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px', cursor: 'pointer' }} >

                        <div className={`font-[inter] flex flex-col `}>
                            <p className={`text-[12px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[2px]`} onClick={() => HandleSelectedPub(pub.id)}>{pub.judulContent}</p>
                            
                            <p className={`Content-artikel text-[10px] text-[var(--black-subtext)]`} onClick={() => HandleSelectedPub(pub.id)}>{pub.content}</p>

                            <div className="flex flex-row items-center justify-between mt-[12px] h-[12px]">
                                <div className="flex flex-row gap-[8px] items-center">
                                    <p className={`text-[11px] font-[600] pb-[0px] ${themeActive ? 'text-[var(--black-subtext)]' : 'text-[var(--black-subtext)]'} `} >
                                        <span className="flex flex-row gap-[6px] items-center">
                                            {/* {userIcon} */}
                                            @{pub.userName}
                                        </span>
                                    </p>

                                    <p className={`text-[10px] text-[var(--black-subtext)] pt-[0px]`}>{pub.timeStamp}</p>
                                </div>
                                <div className="flex flex-row  gap-[6px] cursor-pointer items-center">
                                    <div className="flex flex-row items-center gap-[12px] text-[var(--black-subtext)]">
                                        <div onClick={() => HandleSharePub(pub.id)}>
                                            {shareIcon}
                                        </div>
                                        {saveIcon}
                                        {/* <p className={`text-[10px] pt-[1px]`}>27</p> */}
                                    </div>
                                    <div>
                                        {nameUser === pub.userName && (
                                            <button onClick={() => DelPublikasi(pub.id)} className={`text-[var(--black-subtext)]`}></button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}