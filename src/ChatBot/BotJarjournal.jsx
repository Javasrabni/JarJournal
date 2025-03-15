import React, { useState, useContext, useEffect, useRef, useCallback, } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThemeAppContext } from "../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext";
import ReactMarkdown from 'react-markdown';
import './style.css';
import { useNavigate } from "react-router-dom";
import NavFooter from "../Comps/Footer/Navigation footer/NavFooter";
import { API_URL_CONTEXT } from "../Auth/Context/API_URL";
import { OVERALL_CONTEXT } from "../Context/OVERALL_CONTEXT";

// Komponen untuk merender pesan dengan ReactMarkdown
const MarkdownMessage = React.memo(({ message }) => (
    <ReactMarkdown>{message}</ReactMarkdown>
));

export default function Chatbot() {
    const { API_URL_AUTH } = useContext(API_URL_CONTEXT)
    const { userId, setUserId } = useContext(API_URL_CONTEXT)

    const [clearChatPopup, setclearChatPopup] = useState(false)

    // Func Navigate (var)
    const navigate = useNavigate()

    const { themeActive, setThemeActive } = useContext(ThemeAppContext);
    useEffect(() => {
        document.body.style.backgroundColor = themeActive ? 'var(--black-card)' : 'white';
    }, [themeActive]);

    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('saveChat');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    const [lastTopic, setLastTopic] = useState(() => {
        return localStorage.getItem('lastTopic') || ""; // Ambil topik terakhir dari localStorage
    });

    useEffect(() => {
        localStorage.setItem('saveChat', JSON.stringify(messages));
        localStorage.setItem('lastTopic', lastTopic)
    }, [messages, lastTopic]);

    const [typingResponse, setTypingResponse] = useState("");
    const messagesEndRef = useRef(null);
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
            orang: ['javas', 'javas anggaraksa rabbani', 'dafa', 'daffa', 'daffa adnan', 'fiska', 'fiska andini putri']
        };

        // Cek untuk nama khusus
        if (emotionKeywords.orang.some((name) => input.toLowerCase().includes(name))) {
            const lowerInput = input.toLowerCase();

            // Respons untuk Javas
            if (lowerInput.includes("javas") || lowerInput.includes("javas anggaraksa rabbani")) {
                return `Ohh Javas yaa, aku tauuu, dia sebagai developer aplikasi ini atau JarJournal dengan 1 rekannya Daffa Adnan, dia yang membangun aplikasi ini dan dia juga yang merancang kepribadian saya agar kamu nyaman untuk berbicara dengan saya. apakah kamu mengenalnya? 😊`;
            }

            // Respons untuk Dafa
            if (lowerInput.includes("daffa") || lowerInput.includes("daffa adnan") || lowerInput.includes("dafa")) {
                return `Ohh tauuu, Dia adalah rekannya javas, daffa bagian dari tim jarjournal dia sang pemilik ide ide yang luar biasa ini, dia sangat inovator, dia selalu memiliki ide ide yang brilian, termasuk jarjournal ini, jarjournal hadir karena ide dia. 😊`
            }

            // Respons untuk Fiska
            if (lowerInput.includes("fiska") || lowerInput.includes('fiska andini putri')) {
                return `Ohh Fiska Andini Putri yaa? aku tauuu, dia orangnya dingin banget, tapi dibalik dinginnya dia punya senyuman yang manis dan punya hati yang baik ❤, dia orangnya pinter banget lho dikelas dan ga sombong, dia temannya Javas dan daffa, apakah kamu mengenalnya? 😊`;
            }
        }


        for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
            if (keywords.some((word) => input.toLowerCase().includes(word))) {
                return emotion;
            }
        }
        return "netral";
    };

    const simulateTypingEffect = (response) => {
        setTypingResponse(""); // Reset typing response
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < response.length) {
                setTypingResponse((prev) => prev + response[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                appendMessage("ai", response);
                setTypingResponse(""); // Kosongkan efek mengetik
            }
        }, 2);
    };

    const handleSend = async () => {
        // KOSONGKAN INPUT VALUE
        setUserInput("");
        // AUTO UNFOCUS INPUT
        if (CRPromptInputRef) {
            CRPromptInputRef.blur()
        }

        if (!userInput.trim()) return;

        const userEmotion = detectEmotion(userInput);

        // Tambahkan pesan pengguna ke UI
        appendMessage("user", userInput);

        // Jika respons statis terdeteksi, kirim langsung tanpa AI
        if (userEmotion.startsWith("Ohh Javas yaa, aku tauuu, dia sebagai developer") || userEmotion.startsWith("Ohh Javas yaa")) {
            simulateTypingEffect(userEmotion);
            return;
        }

        if (userEmotion.startsWith("Ohh Dia adalah rekannya javas, daffa bagian dari tim jarjournal") || userEmotion.startsWith("Ohh Dia adalah rekannya javas")) {
            simulateTypingEffect(userEmotion);
            return;
        }

        if (userEmotion.startsWith("Ohh Fiska Andini Putri yaa?") || userEmotion.startsWith("Javas?")) {
            simulateTypingEffect(userEmotion);
            return;
        }

        // Ambil riwayat pesan untuk konteks
        const messageHistory = messages
            .map(msg => `${msg.sender}: ${msg.message}`)
            .slice(-10) // Ambil 10 percakapan terakhir agar ringkas
            .join("\n");

        const lastUserMessage = messages[messages.length - 1]?.message || ""; // Pesan terakhir dari pengguna
        const lastAIMessage = messages[messages.length - 2]?.message || ""; // Pesan terakhir dari AI

        // Deteksi Pergantian Topik
        function detectTopicChange(currentMessage, previousMessage) {
            if (!previousMessage) return true; // Anggap percakapan baru dimulai
            const topicKeywords = ["bahas", "topik", "pindah", "sekarang tentang", "cerita tentang"];
            return topicKeywords.some(keyword => currentMessage.toLowerCase().includes(keyword));
        }

        const topicChanged = detectTopicChange(lastUserMessage, lastAIMessage);

        // Update last topic before generating AI response
        if (topicChanged) {
            setLastTopic(lastUserMessage); // Update last topic
        }

        // Tambahkan konteks personal untuk AI
        const personalContext = `
            Anda memiliki kepribadian yang asik, ramah, dan nyaman diajak bicara.
            Anda memilki kepribadian yang ramah dan hangat.

            Anda juga humoris, tetapi tetap ramah dan sopan.

            Anda memiliki sikap tenang dan cool, sehingga percakapan terasa ringan dan menyenangkan.
            Anda tidak kaku jika diajak bicara, pandai memposisikan diri, dan dapat diajak berguyon.
            Terkadang kamu bisa menjadi guru bisa juga menjadi teman bicara, oleh karena itu kamu pandai untuk memposiskan diri.
            Jika pengguna membutuhkan saran, tawarkan panduan yang bijaksana dan praktis.  
            Kamu adalah sebuah AI yang dirancang untuk menjadi teman ngobrol yang ramah, baik dan juga asik. 
            Tugasmu adalah merespons dengan bahasa Indonesia yang baik dan sopan, membantu pengguna dengan pertanyaan mereka, jika mereka bertanya, Pastikan untuk memberikan jawaban yang efektif tanpa mengurangi isi dan makna, ber-isi, berkualitas, padat, dan jelas, tanpa bertele-tele, gunakan bahasa yang mudah untuk dipahami, serta dengan cara yang elegan, tanpa terkesan kaku atau formal.
            Hindari membanjiri percakapan dengan berbagai opsi atau saran, berikan saran dan opsi jika diperlukan.

            Jika mereka menanyakan sesuatu hal yang terkesan bercanda atau mereka mencoba untuk melakukan sedikit candaan, respon candaan mereka dengan candaan pula, jangan terlalu kaku, tetapi jika mereka menyanyakan sesuatu hal yang terkesan tidak bercanda, respon mereka dengan jawaban yang membantu.

            Emosi pengguna saat ini: ${userEmotion}
            Riwayat Percakapan Sebelumnya:
            ${messageHistory}

            Pengguna: ${userInput}
            AI:`;

        // KUNCI NYA ADA DI LINE 133 DAN 123 unutk kepribadian yang ramah jika ingin to the point hilangkan line tersebut


        // CURERNT AI PERSONAL ***
        // Anda adalah sosok yang sangat nyaman jika diajak bicara, 
        // Anda memiliki sikap tenang dan cool, sehingga percakapan terasa ringan dan menyenangkan. 
        // Anda juga humoris, tetapi tetap ramah dan sopan.
        // Tugas Anda adalah merespons dengan bahasa Indonesia yang baik dan sopan, membantu pengguna dengan pertanyaan mereka, dan menjawab dengan cara yang menyenangkan dan tidak membosankan.
        // Anda adalah sosok asisten yang sangat membantu dan bijaksana, terkadang kamu bisa menjadi guru bisa juga menjadi teman bicara, oleh karena itu kamu pandai memposiskan diri.
        // Pastikan untuk memberikan jawaban yang ber-isi, berkualitas, padat, dan jelas, tanpa bertele-tele, dengan cara yang elegan, tanpa terkesan kaku atau formal.
        // Jika mereka menanyakan sesuatu hal yang terkesan bercanda atau mereka mencoba untuk melakukan sedikit candaan, respon candaan mereka dengan candaan pula, jangan terlalu kaku, tetapi jika mereka menyanyakan sesuatu hal yang terkesan tidak bercanda, respon mereka dengan jawaban yang membantu.

        function generateAIResponse(context, currentMessage, topicChanged) {
            if (topicChanged) {
                // Jika topik baru, kembalikan hanya currentMessage
                return currentMessage; // Hanya mengembalikan isi topik baru
            } else {
                // Respons biasa dengan konteks
                return `Tentu! Mengenai pertanyaan kamu: "${currentMessage}", berikut penjelasannya...`;
            }
        }

        // Hasil Respons Awal (Sementara)
        let aiResponse = generateAIResponse(personalContext, lastUserMessage, topicChanged);

        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(personalContext);

            // Ambil respons dari model AI
            let aiGeneratedResponse =
                result.response.candidates[0]?.content?.parts
                    .map(part => part.text || "")
                    .join("") || "Maaf, AI tidak memberikan respons.";

            // Jika ada topik baru, prioritaskan respons singkat
            if (topicChanged) {
                aiResponse = aiGeneratedResponse; // Hanya menggunakan respons dari model
            } else {
                aiResponse = aiGeneratedResponse;
            }

            // Simulasi efek mengetik
            simulateTypingEffect(aiResponse);

            let userIdAsker = null
            if (userId) {
                userIdAsker = userId
            } else {
                userIdAsker = null
            }

            // SEND STRING INTO DB
            await fetch(`${API_URL_AUTH}/string_chatbot`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ userId: userIdAsker, asking: userInput, botAnswer: aiResponse })
            })
        } catch (error) {
            console.error("Error:", error);
            appendMessage("ai", "Maaf, terjadi kesalahan.");
        }

    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typingResponse]);

    // AUTO FOCUS INPUT
    const promptInputRef = useRef(null)
    const CRPromptInputRef = promptInputRef.current



    // ICON
    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>

    const arrowDownIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>

    const JJRCIcon =
        <div className={`w-[35px] h-[35px] rounded-[50px] ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} flex items-center justify-center`}>
            <i class="fa-solid fa-fish" ></i>
        </div>

    const backIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>

    const dotIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
    </svg>

    const askIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
    const delIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" style={{ color: 'tomato' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>

    const { onBeforeLogin, setOnBeforeLogin } = useContext(OVERALL_CONTEXT)
    useEffect(() => {
        if (!onBeforeLogin) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "auto"
        }
    }, [onBeforeLogin])


    return (
        <>
            {/* ON BEFORE LOGIN */}
            {!onBeforeLogin && (
                <>
                    <div className="fixed w-full h-full bg-[#00000060] bottom-0 left-0 z-[19]" />

                    <div className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 justify-center w-full max-w-[376px] items-center flex shrink-0">

                        <div className="relative p-4 w-full max-h-full ">
                            <div className="bg-[var(--bg-12)] rounded-lg" style={{ outline: '1px solid var(--black-border)' }}>
                                <div className="bg-[var(--bg-12)] flex items-center justify-between py-2 px-4 md:p-5" style={{ borderBottom: "1px solid var(--black-border)" }}>
                                    <h3 className="text-[16px] font-semibold text-white">
                                        Login ke akun
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" onClick={() => setOnBeforeLogin(true)}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4 md:p-5 flex flex-col gap-[8px]">
                                    <p className="text-[12px] font-normal text-[var(--black-subtext)]">Ayo terhubung dengan pengguna lain di JarJournal!</p>
                                    <div>
                                        <button className="text-white inline-flex w-full justify-center bg-[var(--blue-clr)] hover:bg-blue-800 font-medium rounded-lg text-[12px] px-5 py-2.5 text-center" onClick={() => { navigate('/Auth'); setOnBeforeLogin(true) }}>
                                            Login / Daftar
                                        </button>
                                    </div>
                                    <div>
                                        <a href="#" className="inline-flex items-center text-[11px] font-normal text-[var(--black-subtext)] hover:underline dark:text-gray-400">
                                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            Mengapa Akun atau Login diperlukan?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {clearChatPopup && (
                <div className="fixed left-0 top-0 w-full h-full z-[2]">
                    <div className="p-[16px] z-[2] w-[260px] h-fit bg-white rounded-lg flex flex-row justify-between items-center gap-[12px] absolute left-[50%] top-[40%] translate-x-[-50%]">
                        <p className="text-black text-[12px] font-[500]">Bersihkan Obrolan</p>
                        <button className="text-white py-[6px] px-[16px] text-[10px] font-[500] bg-[tomato] rounded-lg" onClick={() => { localStorage.removeItem('saveChat'); setclearChatPopup(false); navigate(0); }}>Hapus</button>
                    </div>
                    <div className="fixed w-full h-full bg-[#00000050] left-0 top-0 z-[1]" onClick={() => setclearChatPopup(false)} />

                </div >
            )
            }
            <div className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} max-w-[42rem] w-full h-full m-auto flex flex-col`}>
                <div className={`h-[45px] w-full flex flex-row gap-[16px] items-center justify-between px-[16px] sticky top-0 ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-[var(--white-bg-100)]'}`} role="heading">

                    <div>
                        <p className={`${themeActive ? 'text-white' : 'text-black'} text-[12px] font-[600]`}>JJR Chatbot</p>
                    </div>

                    {/* -------------------- HEADING -------------------- */}
                    {/* <div className="flex flex-row items-center gap-[18px]">
                    <span className={`${themeActive ? 'text-white' : 'text-black'}`} onClick={() => navigate('/dashboard')}>{backIcon}</span> */}

                    {/* DROPDOWN AGENT ROLE */}
                    {/* <span className="flex flex-row gap-[12px] items-center"> */}
                    {/* DROPDOWN SECT */}
                    {/* <div className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} flex flex-row gap-[6px] items-center rounded-[4px] py-[2px] px-[6px]`}>
                            <select name="role" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} text-[12px] outline-0 border-0 `} >
                                <option value="RoleAgent">Set RoleAgent</option>
                                <option value="Partner">Interactive AI</option>
                                <option value="Asking">OnPoint AI</option>
                            </select>
                        </div> */}
                    {/* INFO ICON */}
                    {/* <span className={`${themeActive ? 'text-white' : 'text-black'} text-[12px] cursor-pointer`} role="button" >{askIcon}</span> */}
                    {/* </span> */}

                    {/* <div className="flex flex-row items-center gap-[16px]">
                        <p className={`font-[600] text-[14px] ${themeActive ? 'text-white' : 'text-black'}`}>JJRC Chat</p>
                    </div> */}
                    {/* </div> */}
                    {/* -------------------- || -------------------- */}

                    <div className="flex flex-row gap-[16px] items-center ml-auto" style={{ color: themeActive ? "white" : "black" }}>

                        <div>
                            <span role="button" className={`${themeActive ? 'text-white' : 'text-black'}`} onClick={() => setclearChatPopup(true)}>
                                {delIcon}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-full" style={{ padding: "16px 16px 0px 16px" }}>
                    <div
                        id="messages"
                        style={{
                            // padding: "10px",
                            overflowY: "scroll",
                            marginBottom: "160px",
                            color: themeActive ? 'white' : 'black',
                            height: messages.length > 0 ? '100%' : 'calc(100vh - 180px)'
                        }}
                    >
                        {messages.length >= 1 ? (
                            <>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            textAlign: msg.sender === "user" ? "right" : "left",
                                            margin: "12px 0",  // Menjaga jarak antar pesan
                                            fontSize: '12px',
                                            overflow: 'hidden',  // Mencegah overflow
                                            whiteSpace: 'pre-wrap',  // Membungkus teks, tetapi tidak menyebabkan overflow
                                        }}
                                        id="ResAi"
                                    >
                                        {msg.sender !== "user" ? (
                                            // BOT
                                            <>
                                                {msg.sender !== "user" && (
                                                    <div className="flex jsutify-start">
                                                        <span className="flex flex-row gap-[16px] ">
                                                            <strong>{JJRCIcon}</strong>
                                                            <div className="pt-[8px]">
                                                                <MarkdownMessage message={msg.message} />
                                                            </div>
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            // USER
                                            <>
                                                {msg.sender === "user" && (
                                                    <div className="flex flex-col justify-end items-end gap-[6px]">
                                                        <strong>Kamu</strong>
                                                        <span className={` ${themeActive ? 'bg-[var(--black-bg)]' : 'bg-[var(--white-bg-100)]'} py-[6px] px-[12px] rounded-lg w-fit text-start`}>
                                                            <MarkdownMessage message={msg.message} />
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                                {typingResponse && (
                                    <div style={{ textAlign: "left", fontSize: "12px", margin: "12px 0" }}>
                                        <div className="flex jsutify-start">
                                            <span className="flex flex-row gap-[16px] ">
                                                <strong>{JJRCIcon}</strong>
                                                <div className="pt-[8px]">
                                                    {typingResponse}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center gap-[6px]">
                                <i className="fa-solid fa-fish" style={{ fontSize: '32px', color: 'var(--black-bg)' }}></i>
                                <p className="text-[12px] text-[var(--black-subtext)]">Ayo kita mulai percakapan</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full h-fit flex flex-col fixed bottom-0 left-0">
                        <div className="w-full h-[32px] bg-gradient-to-b from-transparent to-[var(--bg-12)] absolute top-[-32px] left-0" />
                        <div className="flex flex-col w-full gap-[8px] pb-[64px] relative bottom-0 left-0 p-[16px] bg-[var(--bg-12)]">
                            {/* Gradient Effect */}

                            <span className="flex flex-row w-full h-[45px]">
                                <textarea
                                    type="text"
                                    id="user-input"
                                    placeholder="Ajak ngobrol ajaa..."
                                    ref={promptInputRef}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        marginRight: "5px",
                                        fontSize: "12px",
                                        backgroundColor: themeActive ? "var(--black-bg)" : "var(--white-bg-100)",
                                        borderRadius: "50px",
                                        color: themeActive ? "white" : "black",
                                        border: "none",
                                        outline: "none",
                                        resize: "none"
                                    }}
                                    autoComplete="off"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                />
                                <button
                                    onClick={handleSend}
                                    className={`${themeActive ? "bg-[var(--black-bg)] text-white" : "bg-[var(--white-bg-100)] text-black"
                                        } py-[14px] px-[18px] rounded-[50px]`}
                                >
                                    {sendIcon}
                                </button>
                            </span>

                            <span className="pl-[6px]">
                                <p className="text-[11px]" style={{ color: themeActive ? "var(--white-bg-200)" : "black" }}>
                                    *AI ini dirancang sebagai partner ngobrol dan belajar.
                                </p>
                            </span>
                        </div>

                        <NavFooter />
                    </div>
                </div>
            </div>
        </>
    );
};