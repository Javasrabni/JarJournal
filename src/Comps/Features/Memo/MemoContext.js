import { createContext, useState, useEffect } from "react";

export const MemoContext = createContext()

export default function MemoProvider({children}) {
    const [indicatorFromMemo, setIndicatorFromMemo] = useState(false)
    // Value input memo
    const [memoInputValue, setMemoInputValue] = useState('')

    // localstorage state memo value "isi textarea"
    const [valueMemo, setValueMemo] = useState(()=> {
        const saveMemo = localStorage.getItem('saveUserMemo')
        return saveMemo ? JSON.parse(saveMemo) : []
    })
    


    // Edit value memo
    const [editValueMemoStatus, setEditValueMemoStatus] = useState(false)
    const [afterEditValueMemo, setAfterEditValueMemo] = useState('')

    // edit height after valuememo has more than 2 values
    const [changeHeightMemo, setChangeHeightMemo] = useState(()=> {
        const saveState = localStorage.getItem('saveStateHeightMemo')
        return saveState ? JSON.parse(saveState) : false
    })
    const [visibleMemo, setVisibleMemo] = useState([])

    useEffect(()=> {
        localStorage.setItem('saveUserMemo', JSON.stringify(valueMemo))
        localStorage.setItem('saveStateHeightMemo', changeHeightMemo)
    }, [valueMemo, changeHeightMemo])

    return (
        <MemoContext.Provider value={{indicatorFromMemo, setIndicatorFromMemo, memoInputValue, setMemoInputValue, valueMemo, setValueMemo, editValueMemoStatus, setEditValueMemoStatus, afterEditValueMemo, setAfterEditValueMemo, changeHeightMemo, setChangeHeightMemo, visibleMemo, setVisibleMemo}}>
            {children}
        </MemoContext.Provider>
    )
}