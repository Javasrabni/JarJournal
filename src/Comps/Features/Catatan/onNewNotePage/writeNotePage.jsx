import { useContext, useEffect } from "react"
import { ThemeAppContext } from "../../Theme/toggleTheme.jsx/ThemeAppContext"
import { WriteNoteContext } from "./writeNoteContext"
import { useRef } from "react"
import { CatatanContext } from "../catatanContex"

export default function WriteNotePage() {
    const { themeActive } = useContext(ThemeAppContext)

    // Note array
    const { onNewNote, setOnNewNote } = useContext(CatatanContext)

    function HandleNoteSubmit() {
        setOnNewNote((prevValue) => [...prevValue, valueEditableDiv])
    }

    const { valueEditableDiv, setValueEditableDiv } = useContext(WriteNoteContext)

    const { boldStatus, setBoldStatus } = useContext(WriteNoteContext)

    useEffect(() => {
        const noteDivRef = editorRef.current

        noteDivRef.addEventListener('keyup', (e) => {
            if (e.ctrlKey && e.key === 'b') {
                setBoldStatus((prev) => !prev)
            }
        })
    }, [])

    const HandleInputEditable = (e) => {
        setValueEditableDiv(e.target.innerHTML)
    }

    console.log(valueEditableDiv)
    const editorRef = useRef(null);

    const applyBold = () => {
        // Mendapatkan teks yang dipilih dan menerapkan format bold
        document.execCommand("bold", false, null);
        setBoldStatus((prev) => !prev)
        editorRef.current.focus(); // Kembali fokus ke editor
    };

    const boldIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
        <path strokeLinejoin="round" d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
    </svg>

    


    return (
        <div className={`w-full h-[100vh] ${themeActive ? 'bg-black' : 'bg-white'} ${themeActive ? 'text-white' : 'text-black'} flex flex-col `}>
            <div className="w-full h-fit">
                <input type="text" placeholder="Judul" className={`w-full px-[12px] outline-0 text-[24px] font-[600] ${themeActive ? 'bg-black text-white' : 'bg-white text-[var(--black-text)]'}`} autoFocus />
            </div>
            <div>

                <div
                    ref={editorRef}
                    contentEditable
                    onInput={HandleInputEditable}
                    // dangerouslySetInnerHTML={{ __html: valueEditableDiv }}
                    style={{
                        // border: "1px solid #ccc",
                        minHeight: "100px",
                        padding: "12px",
                        outline: "none",
                        color: themeActive ? "white" : "black",
                        fontSize: '12px',
                        fontFamily: 'inter'
                    }}
                >
                </div>
            </div>

            <div className="fixed bottom-0">
                <div>
                    <div onClick={HandleNoteSubmit}>
                        <p>sip</p>
                    </div>

                    <button onClick={applyBold} style={{ marginBottom: "10px", color: "white", backgroundColor: themeActive ? 'var(--black-card)' : 'var(--white-bg-200)', outline: boldStatus ? themeActive ? '1px solid var(--black-border)' : '1px solid black' : 'none' }} className="px-[12px] py-[6px] text-[10px] rounded-[4px]">
                        <span className={`${themeActive ? 'text-white' : 'text-black'}`} >{boldIcon}</span>
                    </button>

                </div>

            </div>


            {/* <div className="w-full h-full">
                <textarea name="" id="" placeholder="Isi catatan" className={`w-full h-full px-[12px] py-[4px] font-[300] outline-0 text-[14px] ${themeActive ? 'bg-black text-white' : 'bg-white text-[var(--black-text)]'}`} >
                </textarea>
            </div> */}
        </div >
    )
}