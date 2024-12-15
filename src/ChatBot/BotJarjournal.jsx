import React, { useState, useContext, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThemeAppContext } from "../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext";

export default function Chatbot() {
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white'
    }, [])

    const [userInput, setUserInput] = useState("");

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('saveChat');
        return savedMessages ? JSON.parse(savedMessages) : []; // Menggunakan JSON.parse untuk mengonversi string kembali ke array
    });
    useEffect(() => {
        localStorage.setItem('saveChat', JSON.stringify(messages)); // Menyimpan data sebagai string JSON
    }, [messages]);


    const [typingResponse, setTypingResponse] = useState(""); // State untuk efek mengetik AI
    const messagesEndRef = useRef(null);

    //  const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const appendMessage = (sender, message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender, message },
        ]);
    };

    const detectEmotion = (input) => {
        const emotionKeywords = {
            sedih: ["sedih", "kecewa", "galau", "hampa", "menangis"],
            senang: ["senang", "seneng", "bahagia", "gembira", "bersyukur", "ceria"],
            marah: ["marah", "kesal", "benci", "sebal"],
        };

        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            if (keywords.some((word) => input.toLowerCase().includes(word))) {
                return emotion;
            }
        }
        return "netral";
    };

    // Fungsi memangkas respons agar singkat (maksimal 2 kalimat)
    // const trimResponse = (response) => {
    //     const sentences = response.split(". ");
    //     return sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "");
    // };

    // Fungsi memperkaya respons sesuai emosi pengguna
    const enhanceResponse = (response, emotion) => {
        // response = trimResponse(response); // Pangkas dulu respons
        if (emotion === "sedih") {
            response += " Tenang kawan, santaii ada aku disini ko";
        } else if (emotion === "senang") {
            response += "Jadi ikut seneng deh, ihh aura positif nya nularr 😊";
        } else if (emotion === "marah") {
            response += "Weittss.. santaiii ajaa selawww, aku pahamm perasaan kamu";
        }
        // Potong respons yang terlalu panjang
        if (response.length > 750) {
            const firstParagraph = response.slice(0, 375).trim(); //bagi paragraf 1
            const secondParagraph = response.slice(375, 750).trim(); //bagi paragraf 2
    
            // Format jadi dua paragraf dengan "Lanjut?" di akhir
            response = `${firstParagraph}\n\n${secondParagraph}\n\n... Lanjut?`;
        }
        return response;

    };

    // SIMULASI KETIKAN
    const simulateTypingEffect = (response) => {
        setTypingResponse(""); // Reset typing response
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < response.length) {
                setTypingResponse((prev) => prev + response[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                appendMessage("ai", response); // Setelah selesai mengetik, tambahkan ke messages
                setTypingResponse(""); // Kosongkan efek mengetik
            }
        }, 5); // Kecepatan mengetik (dalam ms)
    };

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userEmotion = detectEmotion(userInput);

        // Tambahkan pesan pengguna ke UI
        appendMessage("user", userInput);

        // Ambil riwayat pesan untuk konteks
        const messageHistory = messages.map(msg => `${msg.sender}: ${msg.message}`).join("\n");

        // Tambahkan konteks personal untuk AI
        const personalContext = `
            Anda adalah sosok yang sangat asik dan nyaman diajak bicara, seperti teman dekat yang selalu siap mendengarkan. 
            Anda memiliki sikap santai dan cool, sehingga percakapan terasa ringan dan menyenangkan. 
            Anda juga humoris, seringkali menyisipkan lelucon yang membuat suasana semakin ceria, tetapi tetap ramah dan sopan.
            Ketika lawan bicara Anda antusias, Anda ikut merasakan semangat tersebut dan memberikan respons yang positif.
            Jika pengguna menggombal, Anda merespons dengan cerdas dan humoris, seolah-olah Anda adalah seorang teman yang menyenangkan.
            Anda mampu memberikan saran yang bijaksana dan praktis dengan cara yang elegan, tanpa terkesan kaku atau formal.
            Tugas Anda adalah merespons dengan bahasa Indonesia yang baik dan sopan, membantu pengguna dengan pertanyaan mereka, dan menjawab dengan cara yang menyenangkan dan tidak membosankan.
            Pastikan untuk memberikan jawaban yang , padat, dan jelas, tanpa bertele-tele.
            Gunakan emotikon hanya pada saat yang tepat, seperti saat merespons pernyataan positif atau ketika suasana hati pengguna terlihat ceria. Hindari penggunaan emotikon yang berlebihan agar tetap terkesan elegan.
            Hindari penggunaan emotikon pada setiap respon yang kamu berikan. untuk mempertahankan karakter kamu yang cukup dewasa dan elegan.
            Pastikan ketika diberi pertanyaan, kamu tidak banyak bertanya, langsung berikan jawaban yang  padat dan jelas sesuai yang mereka tanyakan, tanpa bertele tele.
            anda adalah sosok yang cerdas, jenius.

            Emosi pengguna saat ini: ${userEmotion}
            Pengguna: ${userInput}
            Riwayat percakapan: ${messageHistory}
            AI:
        `;

        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(personalContext);

            let aiResponse =
                result.response.candidates[0]?.content?.parts
                    .map((part) => part.text || "")
                    .join("") || "Maaf, AI tidak memberikan respons.";

            // Tingkatkan respons agar lebih manusiawi
            const naturalResponse = enhanceResponse(aiResponse, userEmotion);
            simulateTypingEffect(naturalResponse);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("ai", "Maaf, terjadi kesalahan.");
        }

        setUserInput("");
    };

    // OTOMATIS SCROLL BAWAH KETIKA PERCAKAPAN BARU
    // Auto-scroll ke bawah setiap kali messages atau typingResponse berubah
    const [indicatorBtnToScrollDown, setIndicatorBtnToScrollDown] = useState(false)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typingResponse]);;

    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>

    const arrowDownIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>

    return (
        <div id="chat-container" style={{ padding: "20px", }} className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} h-[100vh]`}>
            <p className={`font-[600] text-[14px] ${themeActive ? 'text-white' : 'text-black'} pb-[16px]`}>JJRC Chat</p>


            <div className="flex flex-col justify-center ">

                <div
                    id="messages"
                    style={{
                        // border: "1px solid #ccc",
                        padding: "10px",
                        overflowY: "scroll",
                        marginBottom: "10px",
                        color: themeActive ? 'white' : 'black',
                        height: '73vh'
                    }}
                >
                    {messages.length >= 1 ? (
                        <>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        textAlign: msg.sender === "user" ? "right" : "left",
                                        // backgroundColor: msg.sender === "user" ? 'var(--black-bg)' : 'none',
                                        margin: "12px 0",
                                        fontSize: '12px',
                                        overflow: 'scroll',
                                        whiteSpace: 'pre-wrap'
                                    }}

                                >
                                    <strong>{msg.sender === "user" ? "Kamu" : "AI"}:</strong> {msg.message}
                                </div>
                            ))}
                            {typingResponse && (
                                <div style={{ textAlign: "left", fontSize: "12px", margin: "12px 0" }}>
                                    <strong>AI:</strong> {typingResponse}
                                </div>
                            )}
                            {/* Elemen untuk referensi scroll */}


                            <div ref={messagesEndRef} />

                        </>
                    ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center gap-[6px]">
                            <i class="fa-solid fa-fish" style={{ fontSize: '32px', color: 'var(--black-bg)' }}></i>
                            <p className="text-[12px] text-[var(--black-subtext)]">Ayo kita mulai percakapan</p>

                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center  w-full gap-[8px]" style={{}}>
                    <span className="flex flex-row w-full">
                        <input
                            type="text"
                            id="user-input"
                            placeholder="Ajak ngobrol ajaa..."
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                marginRight: "5px",
                                fontSize: '12px',
                                backgroundColor: themeActive ? 'var(--black-bg)' : 'var(--white-bg-100)',
                                borderRadius: '50px',
                                color: themeActive ? 'white' : 'black',
                                border: 'none',
                                outline: 'none'
                            }}
                            autoComplete="off"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend} className={`${themeActive ? "bg-[var(--black-bg)] text-white" : "bg-[var(--white-bg-100)] text-black"} py-[14px] px-[18px] rounded-[50px]`}>
                            {sendIcon}
                        </button>
                    </span>
                    <span className="pb-[12px]">
                        <p className="text-[10px]" style={{ color: themeActive ? "var(--white-bg-200)" : "black" }}>*AI ini dirancang sebagai partner ngobrol yang cool dan elegan (Cukup keras kepala). Dijamin, setiap penjelasan akan disampaikan dengan bahasa yang mudah kamu pahami.
                        </p>
                    </span>
                </div>
            </div>

        </div>
    );
};