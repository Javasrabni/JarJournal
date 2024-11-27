import { useContext, useEffect, useState } from "react"
import { API_URL_CONTEXT } from "../../../../Auth/Context/API_URL"

export default function Publikasi() {
    // API ENDPOINT
    const { API_URL_PUB } = useContext(API_URL_CONTEXT)
    const { token, setToken } = useContext(API_URL_CONTEXT)

    // STATE
    const [publikasi, setPublikasi] = useState([])
    const [newPublikasi, setNewPublikasi] = useState('')
    const [user, setUser] = useState('')

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

    const HandleAddPub = async () => {
        if (!user || !newPublikasi) {
            alert('User dan konten dibutuhkan!');
            return;
        }

        try {
            const response = await fetch(`${API_URL_PUB}/pub/add-pub`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ user, content: newPublikasi })
            });

            if (response.ok) {
                const { publications: newPub } = await response.json();
                setPublikasi((prev) => [...prev, newPub]); // Tambahkan publikasi baru ke state
                setNewPublikasi(''); // Reset input
            } else {
                alert('Gagal menambahkan publikasi');
            }
        } catch (err) {
            console.error(`Error adding publication: ${err}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',color: 'yellow'}}>
            <h1>Publications</h1>

            {/* Form untuk menambah publikasi */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <textarea
                    placeholder="Write your publication..."
                    value={newPublikasi}
                    onChange={(e) => setNewPublikasi(e.target.value)}
                    style={{ width: '300px', height: '100px', marginRight: '10px' }}
                />
                <button onClick={HandleAddPub} style={{ padding: '5px 10px' }}>
                    Publish
                </button>
            </div>

            {/* Daftar publikasi */}
            <div>
                {publikasi.map((pub) => (
                    <div key={pub.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
                        <p>
                            <strong>{pub.user}</strong> ({new Date(pub.timeStamp).toLocaleString()})
                        </p>
                        <p>{pub.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}