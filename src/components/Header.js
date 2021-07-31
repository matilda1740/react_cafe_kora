import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
    const { currentUser, logoutUser} = useAuth(); 

    const handleLogout = () => {
        logoutUser();
    }
    
    return (
    <section className="header_section">
        <div className="header_left">

        </div>
        <div className="header_right">
            <Link to="/">Home</Link>
            <Link to="/breads">Breads</Link> 
            <Link to="/pastries">Pastries</Link>
            {
                currentUser ?
                 <>
                   <Link to="/profile">Welcome, {currentUser.email}</Link>
                  <button onClick={handleLogout} className="logout_btn">Log Out</button>
                 </>
                :
                <>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Sign Up</Link>

                </>
            }

        </div>
    </section>            
    )
}
