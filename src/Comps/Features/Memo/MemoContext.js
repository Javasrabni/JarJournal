import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { API_URL_CONTEXT } from "../../../Auth/Context/API_URL";

export const MemoContext = createContext()

export default function MemoProvider({ children }) {
    const { token, setToken } = useContext(API_URL_CONTEXT)

    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)

    const [indicatorFromMemo, setIndicatorFromMemo] = useState(false)
    // Value input memo
    const [memoInputValue, setMemoInputValue] = useState('')

    // localstorage state memo value "isi textarea"
    const [valueMemo, setValueMemo] = useState([])
    // const [valueMemo, setValueMemo] = useState(() => {
    //     const saveMemo = localStorage.getItem('saveUserMemo')
    //     return saveMemo ? JSON.parse(saveMemo) : []
    // })



    // Edit value memo
    const [editValueMemoStatus, setEditValueMemoStatus] = useState(false)
    const [afterEditValueMemo, setAfterEditValueMemo] = useState('')

    // edit height after valuememo has more than 2 values
    const [changeHeightMemo, setChangeHeightMemo] = useState(() => {
        const saveState = localStorage.getItem('saveStateHeightMemo')
        return saveState ? JSON.parse(saveState) : false
    })
    const [visibleMemo, setVisibleMemo] = useState([])
    const { refreshData, setRefreshData } = useContext(API_URL_CONTEXT)

    useEffect(() => {
        const GetMemoUser = async () => {
            try {

                const response = await fetch(`${API_URL_AUTH}/get/memo_user`, {
                    method: "GET",
                    cache: "no-cache",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setValueMemo(data)
                }

            } catch (err) {
                console.error(err)
            }

        }
        GetMemoUser()
    }, [refreshData])

    return (
        <MemoContext.Provider value={{ valueMemo, setValueMemo, indicatorFromMemo, setIndicatorFromMemo, memoInputValue, setMemoInputValue, editValueMemoStatus, setEditValueMemoStatus, afterEditValueMemo, setAfterEditValueMemo, changeHeightMemo, setChangeHeightMemo, visibleMemo, setVisibleMemo }}>
            {children}
        </MemoContext.Provider>
    )
}