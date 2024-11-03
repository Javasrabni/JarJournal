import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Page404() {
    const { id } = useParams();
    const pathLocation = useLocation()
    return (
        <div>
            <p><i>{pathLocation.pathname}</i> Not Found 404</p>
        </div>
    )
}