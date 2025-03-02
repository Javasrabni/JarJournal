import useConfig from "antd/es/config-provider/hooks/useConfig";
import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { OVERALL_CONTEXT } from "../../../../Context/OVERALL_CONTEXT";
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL";

export const ArtikelContext = createContext()
export default function ArtikelProvider({ children }) {
    // STATE
    const [publikasi, setPublikasi] = useState([])
    const [judulPublikasi, setJudulPublikasi] = useState('')
    const [newPublikasi, setNewPublikasi] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    const { isLoading, setLoading } = useContext(OVERALL_CONTEXT)
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)

    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)

    const [onUploadPubLoading, setOnUploadPubLoading] = useState(false)
    const [onProgressUpPub, setonProgressUpPub] = useState(0)

    // ON EDIT PUB
    // const [onEditPub, setOnEditPub] = useState(false)
    // const [newEntriesPubEdit, setNewEntriesPubEdit] = useState({})

    useEffect(() => {
        const fetchPub = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_PUB}/get/all_user_publikasi`, {
                    cache: "no-cache",
                    method: "GET"
                })
                const data = await response.json()
                if (response.ok) {
                    setPublikasi(data)

                } else {
                    alert(data.Msg)
                }
                // console.log(data)
            } catch (err) {
                console.error(`gagal mendapatkan pub ${err}`)
            } finally {
                setLoading(false)
            }
        };

        fetchPub()
    }, [refreshData])

    const [komentarPublikasi, setKomentarPublikasi] = useState([])

    useEffect(() => {
        const GetAllKomentarPub = async () => {
            setLoading(true)

            try {
                const response = await fetch(`${API_URL_PUB}/get/komentar_publikasi`, {
                    cache: "no-cache",
                    method: "GET"
                })
                const data = await response.json()
                if (response.ok) {
                    setKomentarPublikasi(data)

                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)

            }
        }
        GetAllKomentarPub()
    }, [refreshData])

    const [getSavedPublikasi, setGetSavedPublikasi] = useState([])
    useEffect(() => {
        const GetAllSavedPublikasi = async () => {
            setLoading(true)

            try {
                const response = await fetch(`${API_URL_PUB}/get/save_publikasi`, {
                    cache: "no-cache",
                    method: "GET"
                })
                const data = await response.json()
                if (response.ok) {
                    setGetSavedPublikasi(data)

                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)

            }
        }
        GetAllSavedPublikasi()
    }, [refreshData])



    const { userId, setUserId } = useContext(API_URL_CONTEXT)



    // LIKE PUB
    const [likePub, setLikePub] = useState(false)

    // IMAGE PUB
    const [onRenderImg, setOnRenderImg] = useState(false)

    // INFINITE SCROLL
    const [infiniteScrollPub, setInfiniteScrollPub] = useState(2)


    return (
        <ArtikelContext.Provider value={{ onProgressUpPub, setonProgressUpPub, onUploadPubLoading, setOnUploadPubLoading, getSavedPublikasi, setGetSavedPublikasi, komentarPublikasi, setKomentarPublikasi, infiniteScrollPub, setInfiniteScrollPub, onRenderImg, setOnRenderImg, likePub, setLikePub, selectedImage, setSelectedImage, publikasi, setPublikasi, newPublikasi, setNewPublikasi, judulPublikasi, setJudulPublikasi }}>
            {children}
        </ArtikelContext.Provider>
    )
}