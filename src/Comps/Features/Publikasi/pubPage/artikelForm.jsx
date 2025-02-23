import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"
import axios from "axios"

export default function ArtikelForm() {
    // NAVIGATE
    const navigate = useNavigate()

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

        if (!judulPublikasi || !newPublikasi) {
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
                alert(data.ErrMsg);
            }
        } catch (err) {
            console.error(`Error adding publication: ${err}`);
        } finally {
            setOnUploadPubLoading(false)
            setonProgressUpPub(0)
        }

    };

    return (
        <div>
            {/* Form untuk menambah publikasi */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    placeholder="judul pub"
                    type="text"
                    // value={judulPublikasi}
                    onChange={(e) => setJudulPublikasi(e.target.value)}

                />
                <textarea
                    placeholder="Write your publication..."
                    value={newPublikasi}
                    onChange={(e) => setNewPublikasi(e.target.value)}
                    style={{ width: '300px', height: '100px', marginRight: '10px' }}
                />
                <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />

                <button onClick={HandleAddPub} className="text-[yellow]" style={{ padding: '5px 10px' }}>
                    Publish
                </button>
            </div>
        </div>
    )
}