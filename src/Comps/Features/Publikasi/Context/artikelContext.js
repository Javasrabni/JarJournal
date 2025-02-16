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



    useEffect(() => {
        const fetchPub = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_PUB}/get/all_user_publikasi`, {
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
    }, [])

    // LIKE PUB
    const [likePub, setLikePub] = useState(false)

    // IMAGE PUB
    const [onRenderImg, setOnRenderImg] = useState(false)

    // INFINITE SCROLL
    const [infiniteScrollPub, setInfiniteScrollPub] = useState(2)


    return (
        <ArtikelContext.Provider value={{ infiniteScrollPub, setInfiniteScrollPub, onRenderImg, setOnRenderImg, likePub, setLikePub, selectedImage, setSelectedImage, publikasi, setPublikasi, newPublikasi, setNewPublikasi, judulPublikasi, setJudulPublikasi }}>
            {children}
        </ArtikelContext.Provider>
    )
}