import { useState, useEffect, createContext, useContext } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";
import { OVERALL_CONTEXT } from "../../../Context/OVERALL_CONTEXT";
import { ArtikelContext } from "../../../Comps/Features/Publikasi/Context/artikelContext";

export const ExploreContext = createContext();

export default function ExploreProvider({ children }) {
    const [filteredPub, setFilteredPub] = useState([])
    const [dataPubToFilter, setDataPubToFilter] = useState([])
    const { isLoading, setLoading } = useContext(OVERALL_CONTEXT)
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { setPublikasi } = useContext(ArtikelContext)
    const [statusSearchExplore, setStatusSearchExplore] = useState(false)

    // useEffect(() => {
    //     const fetchPub = async () => {
    //         setLoading(true)
    //         try {
    //             const response = await fetch(`${API_URL_PUB}/pub/get-pub`)
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setDataPubToFilter(data)
                    // setLoading(false)
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
    return (
        <ExploreContext.Provider value={{statusSearchExplore, setStatusSearchExplore, filteredPub, setFilteredPub, setDataPubToFilter, dataPubToFilter }}>
            {children}
        </ExploreContext.Provider>
    )
}