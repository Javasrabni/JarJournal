import React, { useState, useEffect } from "react";

const TypingEffect = ({ texts, typingSpeed = 100, deletingSpeed = 50, delay = 1000 }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        if (texts.length === 0) return;
        const currentText = texts[textIndex] || '';
        const handleTyping = () => {
            if (!isDeleting) {
                // Mengetik
                if (displayedText.length < currentText.length) {
                    setDisplayedText((prev) => currentText.substring(0, prev.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                // Menghapus
                if (displayedText.length > 0) {
                    setDisplayedText((prev) => prev.substring(0, prev.length - 1));
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length); // Pindah ke kalimat berikutnya
                }
            }
        };

        const typingInterval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearInterval(typingInterval);
    }, [displayedText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delay]);

    // Efek berkedip pada kursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);


    return (
        <h1 className="text-[11px] font-mono">
            {displayedText}
            <span className="text-blue-500">{cursorVisible ? `|` : " "}</span>
        </h1>
    );
};


export default TypingEffect;
