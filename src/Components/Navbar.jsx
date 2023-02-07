import React from 'react'
import {auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {Link} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {Toaster,toast} from 'react-hot-toast'

const Navbar = () => {

    const [user ] = useAuthState(auth)
    const LogUserOut = async ()=>{
        await signOut(auth)
        toast.success('Logged Out Successfully')    
    }
  return (
    <div>

<Toaster/>
        <h1>{user?.displayName}</h1>
        
        
        {user ? (
            <div>
                <img src={user?.photoURL} alt="" />
            <button onClick={LogUserOut}>Log Out</button>
            </div>
        ) : (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
        )}
    </div>
  )
}

export default Navbar