import { useEffect, useState } from "react"

export default function AuthForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [results, setResults] = useState("")
    function HandleChangeUsername(e) {
        setUsername(e.target.value);
    }
    function HandleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function HandleChangePass(e) {
        setPass(e.target.value);
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)

        fetch("http://localhost:8000/server.php", {
            method: "POST",
            body: formData
        })
        .then((response)=> response.text())
        .then(data => {
            setResults(data)
        })
        .catch(error => console.error("Error: ", error))
       
    }
    return (
        <div>
            <form action="http://localhost:8000/server.php" method="POST" onSubmit={(e)=> HandleSubmit(e)}>
                <label htmlFor="username">Username</label> <br />
                <input type="text" name="username" onChange={(e) => HandleChangeUsername(e)} value={username} />
               
                <label htmlFor="email">Email</label> <br />
                <input type="email" name="email" onChange={(e) => HandleChangeEmail(e)} value={email} />

                <label htmlFor="password">Password</label> <br />
                <input type="text" name="password" onChange={(e) => HandleChangePass(e)} value={pass} />


                <button name="OnSubmit">Submit</button>
            </form>
            <div>
                {results && (
                    <p>{results}</p>
                )}
            </div>
        </div>
    )
}