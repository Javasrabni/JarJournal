import { useEffect, useState } from "react";

export default function SisaHariToNewYear() {
    const [tahun, setTahun] = useState(new Date().getFullYear())

    const [sisaHari, setSisaHari] = useState(0);

    useEffect(() => {
        hitungSisaHari();
    }, []);

    const hitungSisaHari = () => {
        const hariIni = new Date(); // Tanggal saat ini
        const tahunDepan = hariIni.getFullYear() + 1; // Tahun berikutnya
        const tahunBaru = new Date(tahunDepan, 0, 1); // 1 Januari tahun depan (bulan 0 = Januari)
        // Hitung selisih waktu dalam milidetik
        const selisihWaktu = tahunBaru - hariIni;
        // Konversi milidetik ke hari (1 hari = 86400000 ms)
        const sisaHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
        setSisaHari(sisaHari);
    };
    return (
        <div className="flex flex-col">
            <span className="flex flex-row gap-[4px] items-center">
                {/* <span className="mb-[2px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span> */}
                <p className="text-[10px] text-white ">{sisaHari} Hari Menuju {tahun + 1}</p>
            </span>
            <progress value={365 - sisaHari} max={365} style={{ borderRadius: "6px", marginTop: "6px", width: "100%", height: "4px", filter: "drop-shadow(gold 0px 0px 6px)"}} className="progress-bar bg-[#999999] rounded-lg overflow-hidden" />
        </div>

    )
}