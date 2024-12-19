import React, { useState, useContext, useEffect, useRef, useCallback, } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThemeAppContext } from "../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext";
import ReactMarkdown from 'react-markdown';
import './style.css';
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce'; // Pastikan untuk menginstal lodash.debounce

// Komponen untuk merender pesan dengan ReactMarkdown
const MarkdownMessage = React.memo(({ message }) => (
    <ReactMarkdown>{message}</ReactMarkdown>
));

export default function Chatbot() {
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



    return (
        <div className={`${themeActive ? "bg-[var(--bg-12)]" : "white"} h-[100vh]`}>
            <div className={`h-[45px] w-full flex flex-row gap-[16px] items-center justify-between px-[16px] fixed ${themeActive ? 'bg-[var(--bg-12)]' : 'bg-[var(--white-bg-100)]'}`} role="heading">
                <div className="flex flex-row items-center gap-[18px]">
                    <span className={`${themeActive ? 'text-white' : 'text-black'}`} onClick={() => navigate('/dashboard')}>{backIcon}</span>

                    {/* DROPDOWN AGENT ROLE */}
                    <span className="flex flex-row gap-[12px] items-center">
                        {/* DROPDOWN SECT */}
                        <div className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} flex flex-row gap-[6px] items-center rounded-[4px] py-[2px] px-[6px]`}>
                            <select name="role" className={`${themeActive ? 'bg-[var(--black-bg)] text-white' : 'bg-[var(--white-bg-100)] text-black'} text-[12px] outline-0 border-0 `} tabIndex={0}>
                                <option value="RoleAgent">Set RoleAgent</option>
                                <option value="Partner">Interactive AI</option>
                                <option value="Asking">OnPoint AI</option>
                            </select>
                        </div>
                        {/* INFO ICON */}
                        <span className={`${themeActive ? 'text-white' : 'text-black'} text-[12px] cursor-pointer`} role="button" tabIndex={0}>{askIcon}</span>
                    </span>



                    {/* <div className="flex flex-row items-center gap-[16px]">
                        <p className={`font-[600] text-[14px] ${themeActive ? 'text-white' : 'text-black'}`}>JJRC Chat</p>
                    </div> */}
                </div>

                <div className="flex flex-row gap-[16px] items-center" style={{ color: themeActive ? "white" : "black" }}>

                    <div>
                        <span role="button" tabIndex={0} className={`${themeActive ? 'text-white' : 'text-black'}`}>
                            {dotIcon}
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
                <div className="flex flex-col items-center w-full gap-[8px]">
                    <span className="flex flex-row w-full h-[45px]">
                        <textarea
                            type="text"
                            id="user-input"
                            placeholder="Ajak ngobrol ajaa..."
                            ref={promptInputRef}
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                marginRight: "5px",
                                fontSize: '12px',
                                backgroundColor: themeActive ? 'var(--black-bg)' : 'var(--white-bg-100)',
                                borderRadius: '50px',
                                color: themeActive ? 'white' : 'black',
                                border: 'none',
                                outline: 'none',
                                resize: 'none'
                            }}
                            autoComplete="off"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        // onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend} className={`${themeActive ? "bg-[var(--black-bg)] text-white" : "bg-[var(--white-bg-100)] text-black"} py-[14px] px-[18px] rounded-[50px]`}>
                            {sendIcon}
                        </button>
                    </span>
                    <span className="">
                        <p className="text-[10px]" style={{ color: themeActive ? "var(--white-bg-200)" : "black" }}>*AI ini dirancang sebagai partner ngobrol dan belajar. Setiap penjelasan akan disampaikan dengan bahasa yang mudah dipahami.</p>
                    </span>
                </div>
            </div>
        </div>
    );
};