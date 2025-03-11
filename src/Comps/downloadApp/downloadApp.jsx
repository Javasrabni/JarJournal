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

    const downloadIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>

    const mobileIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>

    return (
        showButton && (
            <div className="mt-[32px] text-white bg-[var(--blue-clr)] p-[16px] w-full h-fit flex flex-col gap-[12px] items-center rounded-lg">
                <span className="flex flex-row items-center">
                    <p className="text-[12px] text-white text-center">Dapatkan pengalaman terbaik dalam versi Mobile App</p>
                    <span className="flex flex-row gap-[8px]">{mobileIcon}</span>
                </span>
                <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "12px", fontWeight: 'bolder' }} className="bg-[var(--black-card)] rounded-full w-full">
                    Install App
                </button>

            </div >
        )
    );
};

export default InstallApp;