import { PersonPin, ShoppingCart } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useStateValue } from './StateProvider';

export default function Header() {
    const { currentUser, logoutUser} = useAuth(); 
    const [ { users }, dispatch] = useStateValue();

    const [profile, setProfile] = useState();
    let temp = [];

    const getProfile = async () => {
        if(currentUser)  {
        return users.find( each => each.email === currentUser.email && each
        )
        }
    }

    const handleLogout = () => {
        logoutUser();
    }

    useEffect( () => {
        getProfile()
            .then( (data) => setProfile(data))

            // if(profile){
                console.log("Profile: ", profile)
            // }
            // .then( () => console.log("Profile: ", profile))
            // .catch( error => console.log(error))

    }, [])

    return (
    <section className="header_section">
        <div className="header_left">

        </div>
        <div className="header_right">
            <Link to="/">Home</Link>
            <Link to="/breads">Breads</Link> 
            <Link to="/pastries">Pastries</Link>
            <Link to="/cart"><ShoppingCart/></Link>

            {
                currentUser ?
                 <>
                   <Link to="/profile/:id">
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
