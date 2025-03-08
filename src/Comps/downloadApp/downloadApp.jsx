import { useEffect, useState } from "react";

const InstallApp = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
            setShowButton(true); // Tampilkan tombol
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                setDeferredPrompt(null);
                setShowButton(false);
            });
        }
    };

    return (
        showButton && (
            <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }}>
                Install App
            </button>
        )
    );
};

export default InstallApp;