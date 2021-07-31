import { Link } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import React from 'react'

export default function Role() {
    return (
        <section className="role_section">

            <h2></h2>          
            <form className="login_form" >
        
                <label className="form_labels">Are you a customer or an adminstrator?</label>
                <Link to="/login_admin">
                    
                </Link>
                <button className="form_btn">Adminstrator</button>
        
                <button className="form_btn">Customer</button>
            </form>
                
        
            <div className="login_footer">
                <div className="back_home_div">
                    <Link to="/">
                    <Home />Back Home
                    </Link>
                </div>
            </div>
        </section>
    )
}
