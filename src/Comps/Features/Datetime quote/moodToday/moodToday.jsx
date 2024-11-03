export default function MoodToday() {
    const emoticon = [
        {id: 1, icon: <img src="/Assets/MoodToday/emoticon/01.png" alt="01 Emoticon"/>},
        {id: 2, icon: <img src="/Assets/MoodToday/emoticon/02.png" alt="02 Emoticon"/>},
        {id: 3, icon: <img src="/Assets/MoodToday/emoticon/03.png" alt="03 Emoticon"/>},
        {id: 4, icon: <img src="/Assets/MoodToday/emoticon/04.png" alt="04 Emoticon"/>},
        {id: 5, icon: <img src="/Assets/MoodToday/emoticon/05.png" alt="05 Emoticon"/>}
    ]
    return (
        <div className="">
            <p className="text-[10px] font-[500]">Bagaimana perasaan kamu hari ini?</p>
            <div style={{}} className="flex flex-row">
                {emoticon.map((emot, index) => 
                    <div key={index} className="">{emot.icon}</div>
                )}

              
            </div>
        </div>
    )
}

// <button>
// <span className="flex flex-row gap-[4px]">
//     <p className="text-[10px] ">Jawaban kamu</p>
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//     </svg>
// </span>

// </button>