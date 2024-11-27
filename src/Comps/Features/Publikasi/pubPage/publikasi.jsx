import { useContext, useEffect, useState } from "react"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import './pubStyle.css'

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




    return (
        <div>
            {/* Daftar publikasi */}
            <div>
                {publikasi.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '12px', border: themeActive ? '1px solid var(--black-border)' : '1px solid var(--white-bg-200)', padding: '12px', backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-100)', borderRadius: '8px' }}>

                        <div className={`font-[inter] flex flex-col`}>
                            <p className={`text-[12px] ${themeActive ? 'text-white' : 'text-black'} font-[600] pb-[6px]`}>{pub.judulContent}</p>
                            <p className={`Content-artikel text-[10px] text-[var(--black-subtext)]`}>{pub.content}</p>

                            <div className="flex flex-row items-center justify-between pt-[16px]">
                                <div>
                                    <p className={`text-[10px] pb-[4px] ${themeActive ? 'text-white' : 'text-black'} leading-[1] italic`}>
                                        <span className="flex flex-row gap-[6px] items-center">
                                            {/* {userIcon} */}
                                            {pub.userName}
                                        </span>
                                    </p>

                                    <p className={`text-[10px] text-[var(--black-subtext)]`}>{pub.timeStamp}</p>
                                </div>
                                <div className="flex flex-row  gap-[6px]">
                                    <div className="flex flex-row items-center gap-[6px] text-[var(--black-subtext)]">
                                        {eyeIcon}
                                        <p className={`text-[10px] pt-[1px]`}>27</p>
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