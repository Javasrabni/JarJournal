import { useParams } from "react-router-dom"
import { useArticle } from "../Context/artikelContext"
import { useContext, useEffect, useState } from "react"
import { ArtikelContext } from "../Context/artikelContext"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import Header from "../../../Navbar-Top/Header"
import { useNavigate } from "react-router-dom"

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
            try {
                const response = await fetch(`${API_URL_PUB}/pub/get-pub/${id}`)
                const data = await response.json()
                if (response.ok) {
                    setSelectedPub(data)
                    console.log(selectedPub)
                }
            } catch (err) {
                console.error(err)
            }
        }
        FetchSelectedPub()
    }, [])

    // ICON
    const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>

    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>



    return (
        <div className={`min-w-[360px] h-fit flex justify-center ${themeActive ? 'bg-[var(--black-card)]' : 'bg-white'} `}>
            {selectedPub ? (
                <div className="flex flex-col w-full h-full">
                    <Header
                        hideLogo={true}
                        backPage={
                            <div className="flex flex-row justify-between items-center w-full" onClick={() => navigate('/dashboard')}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </div>
                                <div className="flex flex-row gap-[12px] items-center">
                                    {shareIcon}
                                    {saveIcon}
                                </div>
                            </div>
                        }
                    />
                    <div className={`p-[16px] h-full w-full`}>
                        <div className="leading-[1] pb-[12px]">
                            <h1 className={`text-[32px] ${themeActive ? 'text-[white]' : 'text-black'} font-[700] `} style={{ fontFamily: 'newspaper bold' }}>{selectedPub.judulContent}</h1>
                        </div>

                        {selectedPub.imageUrl && (
                            <div className="w-full max-h-[93.75rem] rounded-[8px] flex items-center justify-center mb-[16px] mt-[16px]  overflow-hidden">
                                <img src={`${API_URL_PUB}/pub/${selectedPub.imageUrl}`} alt="pub-image" className="w-full h-auto max-h-full object-cover rounded-[8px]" loading="lazy" />
                            </div>
                        )}


                        <div>
                            <p className="text-[14px] text-white">{selectedPub.content}</p>
                        </div>

                        <div className={`flex flex-row gap-[8px] ${themeActive ? 'text-white' : 'text-black'}`}>
                            <p>{selectedPub.userName}</p>
                            <p>{selectedPub.timeStamp}</p>
                        </div>
                    </div>

                </div>
            ) : (
                <p>loadd..</p>
            )}
        </div>
    )
}