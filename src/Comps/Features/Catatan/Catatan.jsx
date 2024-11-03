import { useParams } from "react-router-dom"

export default function Catatan() {
    const {id} = useParams()
    return (
        <div className="w-full h-[100px]">
            <p>catatan page {id}</p>
        </div>
    )
}