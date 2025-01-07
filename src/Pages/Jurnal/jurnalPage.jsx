import { useContext } from "react"
import { JurnalContext } from "../../Comps/Features/Jurnal/Context/jurnalContext"
import { useParams } from "react-router-dom"


export default function JurnalPage() {
    const { index, desc } = useParams()
    // GET DATA JURNAL USER
    const { dataDayJournal, setDataDayJournal } = useContext(JurnalContext)

    return (
        <div className="w-full max-w-[42rem] m-auto h-full flex flex-col items-center max-w-[42rem]">
            <div className="text-white">
                {dataDayJournal && dataDayJournal[index] && (
                    <div>
                        <p>Day: {dataDayJournal[index].day}</p>
                        <p>Description: {dataDayJournal[index].descJurnal}</p>
                        <p>Date: {dataDayJournal[index].date || "No date available"}</p>
                        <p>Mood: {dataDayJournal[index].moodToday || "No mood recorded"}</p>
                    </div>
                )}

            </div>

        </div>
    )
}