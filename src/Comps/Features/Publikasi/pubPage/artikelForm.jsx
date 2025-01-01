import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"
import { ArtikelContext } from "../Context/artikelContext"

export default function ArtikelForm() {
    // STATE
    const { publikasi, setPublikasi } = useContext(ArtikelContext)
    const { newPublikasi, setNewPublikasi } = useContext(ArtikelContext)
    const { judulPublikasi, setJudulPublikasi } = useContext(ArtikelContext)
    const { selectedImage, setSelectedImage } = useContext(ArtikelContext)

    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // GET USERNAME CONTEXT
    const { username, setUsername } = useContext(API_URL_CONTEXT)

    // NAVIGATE
    const navigate = useNavigate()

    // TOTAL LIKE PUB
    const { likePub, setLikePub } = useContext(ArtikelContext)


    const HandleAddPub = async () => {
        if (!judulPublikasi || !newPublikasi) {
            alert('judul dan konten dibutuhkan!');
            return;
        }

        const articleData = new FormData()
        articleData.append('judulContent', judulPublikasi)
        articleData.append('content', newPublikasi)
        articleData.append('userName', username)
        articleData.append('totalLikePub', likePub)
        if (selectedImage) {
            articleData.append('image', selectedImage)
        }

            try {
                const response = await fetch(`${API_URL_PUB}/pub/add-pub`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: articleData
                });

                if (response.ok) {
                    const { publications: newPub } = await response.json();
                    setJudulPublikasi((prev) => [newPub, ...prev])
                    setPublikasi((prev) => [newPub, ...prev]); // Tambahkan publikasi baru ke state
                    setSelectedImage(null)
                    setNewPublikasi(''); // Reset input
                    navigate('/dashboard') // after publish, return path
                } else {
                    alert('Gagal menambahkan publikasi');
                }
            } catch (err) {
                console.error(`Error adding publication: ${err}`);
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
                {/* <input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                /> */}
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