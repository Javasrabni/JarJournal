import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import axios from "axios"
import Header from "../../../Navbar-Top/Header"

export default function ArtikelForm() {
    // NAVIGATE
    const navigate = useNavigate()
    const location = useLocation()

    // STATE
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { onUploadPubLoading, setOnUploadPubLoading } = useContext(ArtikelContext)
    const { onProgressUpPub, setonProgressUpPub } = useContext(ArtikelContext)
    const [judulPublikasi, setJudulPublikasi] = useState(null)
    const [newPublikasi, setNewPublikasi] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)


    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken); // Set token untuk menganggap user sudah login
        }
    }, []); // GET USER TOKEN

    useEffect(() => {
        if (!token) {
            navigate('/Auth')
        }
    }, [token])

    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)

    // TOTAL LIKE PUB
    const { likePub, setLikePub } = useContext(ArtikelContext)

    const [onLoading, setLoading] = useState(false)


    const HandleAddPub = async () => {

        if (!judulPublikasi) {
            alert('judul dan konten dibutuhkan!');
            return;
        }
        try {
            setOnUploadPubLoading(true)
            navigate('/dashboard')
            const articleData = new FormData()
            articleData.append('userId', userId)
            if (judulPublikasi) {
                articleData.append('judulContent', judulPublikasi)
            }
            if (newPublikasi) {
                articleData.append('content', newPublikasi)
            }
            if (username) {
                articleData.append('userName', username)
            }
            if (likePub) {
                articleData.append('totalLikePub', likePub)

            }
            if (selectedImage) {
                articleData.append('file', selectedImage)
            }
            const response = await axios.post(`${API_URL_PUB}/post/userPublikasi`, articleData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (ProgressEvent) => {
                    const persen = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
                    setonProgressUpPub(persen)
                }
            })

            const data = response.data
            if (response.status === 200 || response.status === 201) {
                setSelectedImage(null);
                setNewPublikasi(''); // Reset input
                navigate('/Explore'); // Navigate setelah upload berhasil
                setRefreshData(prev => !prev);
            } else {
                console.error(data)
                // alert(data.ErrMsg);
            }
        } catch (err) {
            console.error(`Error adding publication: ${err}`);
        } finally {
            setOnUploadPubLoading(false)
            setonProgressUpPub(0)
        }

    };



    // const { onEditPub, setOnEditPub } = useContext(ArtikelContext)
    // const { newEntriesPubEdit, setNewEntriesPubEdit } = useContext(ArtikelContext)
    // const [judulEdit, setJudulEdit] = useState(null)
    // const [contentEdit, setContentEdit] = useState(null)


    // useEffect(() => {
    //     if (location.pathname !== "/clips/publish") {
    //         setOnEditPub(false);
    //         setNewEntriesPubEdit({}); // Reset state saat pindah halaman
    //     }
    // }, [location.pathname])

    // async function HandlePatchPub(pubId) {
    //     try {
    //         const response = await fetch(`${API_URL_PUB}/patch/user_publikasi`, {
    //             method: "PATCH",
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }, body: JSON.stringify({ userId: userId, pubId: pubId, newJudul: judulEdit, newContent: contentEdit })
    //         })
    //         const data = await response.json()
    //         if (response.ok) {
    //             setRefreshData(prev => !prev)
    //             console.log(data)
    //         }
    //     } catch (err) {
    //         console.error(err)
    //     }

    // }



    return (
        <div>
            {/* Form untuk menambah publikasi */}
            <Header />
            <div className="p-[16px] flex flex-col gap-[12px]">

                <div>
                    <label for="small-input" className="block mb-2 outline-none text-[12px] font-medium text-white ">Judul</label>
                    <input type="text" id="small-input" className="text-[12px] text-white px-[12px] py-[12px] outline-0 border-0 bg-[var(--black-bg)] rounded-[6px] w-full"
                        placeholder="Judul postingan"
                        // value={onEditPub ? newEntriesPubEdit.judul : null}
                        // onChange={(e) => (onEditPub ? setJudulEdit(e.target.value) : setJudulPublikasi(e.target.value))} />
                        onChange={(e) => setJudulPublikasi(e.target.value)} />
                </div>
                <div>
                    <label for="large-input" className="block mb-2 text-[12px] font-medium text-white">Content</label>
                    <textarea type="text" id="large-input" className="text-[12px] text-white px-[12px] py-[12px] outline-0 border-0 bg-[var(--black-bg)] rounded-[6px] w-full min-h-[240px] max-h-[340px] h-full"
                        placeholder="Isi konten dari postingan, curahkan isi hatimu"
                        // value={onEditPub ? newEntriesPubEdit.content : newPublikasi}
                        // onChange={(e) => (onEditPub ? setContentEdit(e.target.value) : setNewPublikasi(e.target.value))}
                        onChange={(e) => setNewPublikasi(e.target.value)}

                    />
                </div>

                <label className="block outline-none text-[12px] font-medium text-white " for="user_avatar">Post dengan gambar</label>
                <input className="text-[12px] text-white px-[12px] py-[12px] outline-0 border-0 bg-[var(--black-bg)] rounded-[6px] w-full" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
                <div className="text-[11px] text-[var(--black-subtext)]" id="user_avatar_help">Format JPG, JPEG, dan PNG, Mohon untuk menjaga sikap dan sopan santun antar sesama.</div>


                <button
                    // onClick={() => {
                    //     if (onEditPub) {
                    //         if (newEntriesPubEdit.pubId) {
                    //             HandlePatchPub(newEntriesPubEdit.pubId);
                    //         } else {
                    //             console.error("Error: pubId is missing!");
                    //         }
                    //     } else {
                    //         HandleAddPub();
                    //     }
                    // }}
                    onClick={HandleAddPub}
                    className="mt-[12px] w-full bg-[var(--blue-clr)] rounded-lg text-white text-[12px] font-semibold"
                    style={{ padding: "8px 16px" }}
                >
                    Publish
                    {/* {onEditPub ? "Update" : "Publish"} */}
                </button>
            </div>
        </div>
    )
}