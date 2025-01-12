import { createContext, useContext, useState, useEffect } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";


export const CatatanContext = createContext()

export default function CatatanProvider({ children }) {
    const { token, setToken } = useContext(API_URL_CONTEXT)
    const { API_URL_NOTE } = useContext(API_URL_CONTEXT)
    const { username, setUsername } = useContext(API_URL_CONTEXT)
    const { userEmail, setUserEmail } = useContext(API_URL_CONTEXT)
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    const [onNewNote, setOnNewNote] = useState([]) // value note
    const [valueOnNewNote, setValueOnNewNote] = useState([])

    const [writeingNote, setWriteingNote] = useState(false) // status page writing or not
    const [onEditNote, setOnEditNote] = useState(null);
    const [onEditNoteIndex, setOnEditNoteIndex] = useState(null);

    const [note, setNote] = useState(() => {
        const saveDraft = localStorage.getItem('draftNote')
        return saveDraft ? JSON.parse(saveDraft) : ''
    })

    const [removeDraft, setRemoveDraft] = useState(false)

    useEffect(() => {
        localStorage.setItem('draftNote', JSON.stringify(note))
    }, [note])

    // REMOVE DRAFT NOTE
    useEffect(() => {
        if (removeDraft) {
            localStorage.removeItem('draftNote')
        }
    }, [removeDraft])

    const [lastEdit, setLastEdit] = useState('')

    // FETCHING GET USER INFO
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL_AUTH}/auth/user-info`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                if (response.ok) {
                    setUsername(data.username)
                    setUserEmail(data.email)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (token) {
            fetchUserInfo()
        }
    }, [])

    // FETCHING GET USER NOTE
    const FetchDataNote = async () => {
        try {
            const response = await fetch(`${API_URL_NOTE}/auth/get-note`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                setOnNewNote(data.note || [])
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (token) {
            FetchDataNote()
        }
    }, [token, writeingNote])
    return (
        <CatatanContext.Provider value={{ removeDraft, setRemoveDraft, note, setNote, onEditNoteIndex, setOnEditNoteIndex, onEditNote, setOnEditNote, valueOnNewNote, setValueOnNewNote, onNewNote, setOnNewNote, writeingNote, setWriteingNote, lastEdit, setLastEdit }}>
            {children}
        </CatatanContext.Provider >
    )
}