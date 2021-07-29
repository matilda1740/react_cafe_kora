import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHeader() {
    return (

    <section className="header_section">
        <div className="header_left">

        </div>
        <div className="header_right">
            <Link to="/">Customer View</Link>
            <Link to="/breads">Breads</Link> 
            <Link to="/pastries">Pastries</Link>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
        </div>
    </section>            
    )
}
