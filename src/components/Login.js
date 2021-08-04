import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../contexts/AuthContext'
import { Home } from '@material-ui/icons';
 
export default function Login() {
    const history = useHistory();
    
    const { loginUser } = useAuth(); 
    const [ loginEmail, setLoginEmail ] = useState();
    const [ loginPass, setLoginPass] = useState();
    const [isLoginError, setIsLoginError] = useState(false);
    const [ loginError, setLoginError] = useState();    

    const [isAdmin, setIsAdmin] = useState(false);

    const handleChange = e => {
        if(e.target.name === "login_email"){
           setLoginEmail(e.target.value)
        }else if (e.target.name === "login_pass"){
            setLoginPass(e.target.value)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await loginUser(loginEmail, loginPass)
            isAdmin ? await history.push("/admin") : await history.push("/")
            
        }catch(error){
            if(error.code === "auth/wrong-password"){
                setIsLoginError(true)
                setLoginError(error.message)
            }
            console.log("Login Error: ", error)
        }
    }
    const checkAdmin = async (e) => {
        if (e.target.style.backgroundColor === 'rgb(202, 151, 3)'){
            e.target.style.backgroundColor = '#002147'
            setIsAdmin(false);
        }
        else{
            e.target.style.backgroundColor = '#ca9703'
        //             try{
        //     await loginUser(loginEmail, loginPass)
        //     await history.push("/")
        // }catch(error){
        //     if(error.code === "auth/wrong-password"){
        //         setIsLoginError(true)
        //         setLoginError(error.message)
        //     }
        //     console.log("Login Error: ", error)
        // }
            setIsAdmin(true);
        }
    }
    return (
        <section className="login_section">
            <div className="check_admin" onClick={checkAdmin}>
                <p>Are you an admin?</p>
            </div>
            <h2>Cafe Kora Log In</h2>
          
            <form className="login_form" onSubmit={handleLogin}>
                {
                isLoginError ?
                <div className="form_error form_inputs">
                    <p>{loginError}</p>
                </div> 
                :
                <>
                </>               
                }          
                <label className="form_labels">Email:</label>
                <input onChange={handleChange} type="email" id="form_input" className="form_inputs" name="login_email" />
                <label className="form_labels">Password:</label>
                <input onChange={handleChange} type="password" id="form_input" className="form_inputs" name="login_pass" password="" />
        
                <button type="submit" className="form_btn ">Log In</button>
            </form>
                 
            <div className="login_footer">
                <p>Are you a new user?
                    <Link to="/register"> Sign Up</Link>
                </p>
                <div className="back_home_div">
                    <Link to="/">
                    <Home />Back Home
                    </Link>
                </div>
            </div>
        </section>
    )
}
