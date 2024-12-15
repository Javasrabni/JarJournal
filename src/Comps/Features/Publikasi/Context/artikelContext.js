import useConfig from "antd/es/config-provider/hooks/useConfig";
import { createContext, useContext } from "react";
import { useState } from "react";

export const ArtikelContext = createContext()

export default function ArtikelProvider({ children }) {
    // STATE
    const [publikasi, setPublikasi] = useState([])
    const [judulPublikasi, setJudulPublikasi] = useState('')
    const [newPublikasi, setNewPublikasi] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    // LIKE PUB
    const [likePub, setLikePub] = useState(false)

    // IMAGE PUB
    const [onRenderImg, setOnRenderImg] = useState(false)

    // INFINITE SCROLL
    const [infiniteScrollPub, setInfiniteScrollPub] = useState(2)


    return (
        <ArtikelContext.Provider value={{infiniteScrollPub, setInfiniteScrollPub, onRenderImg, setOnRenderImg, likePub, setLikePub, selectedImage, setSelectedImage, publikasi, setPublikasi, newPublikasi, setNewPublikasi, judulPublikasi, setJudulPublikasi }}>
            {children}
        </ArtikelContext.Provider>
    )
}