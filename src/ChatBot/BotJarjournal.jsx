import React, { useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThemeAppContext } from "../Comps/Features/Theme/toggleTheme.jsx/ThemeAppContext";

export default function Chatbot() {
    const { themeActive, setThemeActive } = useContext(ThemeAppContext)


    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);

    //  const API_KEY = process.env.REACT_APP_API_KEY;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const appendMessage = (sender, message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender, message },
        ]);
    };

    const handleSend = async () => {
        if (!userInput.trim()) return;

        // Tambahkan pesan pengguna ke UI
        appendMessage("user", userInput);

        // Deteksi jika pengguna merasa bingung
        if (userInput.toLowerCase().includes("bingung")) {
            appendMessage("ai", "Tidak apa-apa jika bingung, saya di sini untuk membantu. 😊");
            setUserInput("");
            return;
        }

        // Deskripsi konteks untuk AI
        const personalContext = `
      Anda lembut, penuh rasa ingin tahu, dan selalu ingin menawarkan dukungan. 
      Jika pengguna membutuhkan saran, tawarkan panduan yang bijaksana dan praktis. 
      Kamu adalah sebuah AI yang dirancang untuk menjadi teman ngobrol yang harmonis, perhatian, dan ramah. 
      Tugasmu adalah merespons dengan bahasa Indonesia yang baik dan sopan, membantu pengguna dengan pertanyaan mereka, 
      dan menciptakan percakapan yang nyaman dan menyenangkan. Selalu gunakan nada yang hangat, mendukung, dan empati. 
      Anda adalah asisten yang sangat membantu.
      
      Pengguna: ${userInput}
      AI:
    `;

        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(personalContext);

            let aiResponse =
                result.response.candidates[0]?.content?.parts
                    .map((part) => part.text || "")
                    .join("") || "Maaf, AI tidak memberikan respons.";

            // Tambahkan respons lebih hangat
            const harmonizedMessage = `${aiResponse} 😊`;
            appendMessage("ai", harmonizedMessage);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("ai", "Maaf, terjadi kesalahan.");
        }

        setUserInput("");
    };

    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>

    return (
        <div id="chat-container" style={{ padding: "20px", }} className={`${themeActive? "bg-[var(--bg-12)]": "white"} h-[100vh]`}>
            <p className={`font-[600] text-[14px] ${themeActive? 'text-white' : 'text-black'} pb-[16px]`}>JJRC Chat</p>
            <div
                id="messages"
                style={{
                    // border: "1px solid #ccc",
                    padding: "10px",
                    height: '82%',
                    overflowY: "scroll",
                    marginBottom: "10px",
                    color: themeActive ? 'white' : 'black'
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === "user" ? "right" : "left",
                            margin: "12px 0",
                            fontSize: '12px',
                            overflow: 'scroll'
                        }}
                    >
                        <strong>{msg.sender === "user" ? "Anda" : "AI"}:</strong> {msg.message}
                    </div>
                ))}
            </div>

            <div className="flex flex-row items-center">
                <input
                    type="text"
                    id="user-input"
                    placeholder="Tulis pertanyaan Anda..."
                    style={{
                        width: "80%",
                        padding: "12px 16px",
                        marginRight: "5px",
                        fontSize: '12px',
                        backgroundColor: themeActive ? 'var(--black-bg)' : 'var(--white-bg-100)',
                        borderRadius: '50px',
                        color: themeActive ? 'white' : 'black'
                    }}
                    autoComplete="off"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend} className={`${themeActive ? "bg-[var(--black-bg)] text-white" : "bg-[var(--white-bg-100)] text-black"} py-[14px] px-[18px] rounded-[50px]`}>
                    {sendIcon}
                </button>
            </div>

        </div>
    );
};