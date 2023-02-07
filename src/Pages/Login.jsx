import GoogleButton from "react-google-button"
import {auth,db,provider} from '../firebase'
import { signInWithPopup,signInWithEmailAndPassword } from "firebase/auth"
import {Toaster,toast} from 'react-hot-toast'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = ()=>{
    let Navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [user] = useAuthState(auth)
        
    const SignInUser = async ()=>{
        const result = await signInWithPopup(auth,provider)
        console.log(result)
        toast.success('Login Successfull')
    }

    const SignInWithEmailAndPassword = async (e)=>{
        e.preventDefault()
        const userEmail = email
        const userPassword = password

        const user = await signInWithEmailAndPassword(auth,userEmail,userPassword)
        .then((result)=>{
            console.log(result)
            toast.success('Logged In Successfully')
            Navigate('/')
        })
        .catch((err)=>{
            console.log(err)
            toast.error('Invalid Email or Password')
        })
    }


    return(

        <div>
            <Toaster/>
            <form onSubmit={SignInWithEmailAndPassword}>

                <input type="email" placeholder="Email..." value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password..."value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit">Log In</button>

            </form>
            <GoogleButton onClick={SignInUser} />
        </div>
    )
}

export default Login