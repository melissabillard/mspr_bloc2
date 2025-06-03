import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Swal from "sweetalert2"

/**
 * Composant Login
 *
 * @returns {JSX.Element} Le formulaire de connexion.
 */

function Login(){

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    /**
   * Gère la soumission du formulaire de connexion.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
   */

    async function handleLogin(e){
        e.preventDefault()
        try {
            const requestBody = {email, password}
            const response = await axios.post('https://api.p2.lc2s5.foxhub.space/login', requestBody)
            localStorage.setItem('access_token', response.data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            });
        }
    }

    return (
        <div className="container">
            <h2>Login to your account</h2>
            <form onSubmit={handleLogin}>
                <p>Welcome back!</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address :</label>
                    <input onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input onChange={e => {setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">LOG IN</button>
                <p style={{marginTop:"2vh"}}>Don't have an account?<Link to={'/signin'}>Create an account</Link></p>
            </form> 
        </div>
    )
}

export default Login