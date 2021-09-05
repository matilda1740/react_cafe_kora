import { PersonPin, ShoppingCart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useStateValue } from './StateProvider';
import { getproductTotal } from '../components/reducer'
import "./Header.css"

export default function Header() {
    const { currentUser, logoutUser} = useAuth(); 
    const [ { users, cart}, dispatch] = useStateValue();

    const handleLogout = () => {
        logoutUser();
    }

    // STICKY HEADER
    // console.log(window.onscroll)
    // window.onscroll( () => {
    //     console.log(window.PageYOffset)
    // })
    return (
    <section className="header_section">
        <div className="header_left">

        </div>
        <div className="header_right">
            <Link to="/">Home</Link>
            <Link to="/breads">Breads</Link> 
            <Link to="/pastries">Pastries</Link>
            <Link to="/cart">
                <span className="store_badge">
                    <ShoppingCart className="notifications nav_icons" />
                    {
                    cart?.length !== 0 ? 
                    <span className="num_notif"> {getproductTotal(cart)}</span>
                    :<span className="no_badge"></span>
                    }
                </span>             
            </Link>

            {
                currentUser ?
                 <>
                   <Link to={`/my_account/${currentUser.uid}`}>
                   <PersonPin/>
                   Welcome, {currentUser.email}</Link>
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
