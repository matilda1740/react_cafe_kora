import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../contexts/AuthContext'
 
export default function Login() {
    const history = useHistory();
    
    const { loginUser } = useAuth(); 
    const [ loginEmail, setLoginEmail ] = useState();
    const [ loginPass, setLoginPass] = useState();
    const [isLoginError, setIsLoginError] = useState(false);
    const [ loginError, setLoginError] = useState();    

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
            await history.push("/")
        }catch(error){
            if(error.code === "auth/wrong-password"){
                setIsLoginError(true)
                setLoginError(error.message)
            }
            console.log("Login Error: ", error)
        }
    }

    return (
        <section className="login_section">
            <div className="login_logo">
                {/* <!-- <img src="images/logo.png" alt="Site Logo" /> --> */}
            </div>
            <h2>Customer Log In</h2>
                {
                isLoginError ?
                <div className="form_error form_inputs">
                    <p>{loginError}</p>
                </div> 
                :
                <>
                </>               
                }            
            <form className="login_form" onSubmit={handleLogin}>
        
                <label className="form_labels">Email:</label>
                <input onChange={handleChange} type="email" id="form_input" className="form_inputs" name="login_email" />
                <label className="form_labels">Password:</label>
                <input onChange={handleChange} type="password" id="form_input" className="form_inputs" name="login_pass" password="" />
        
                <button type="submit" className="form_btn ">Log In</button>
            </form>
                {
                    isLoginError &&
                    <div className="form_btn ">{loginError}</div>
                }
                
        
            <div className="login_footer">
                <p>Are you a new user?
                    <Link to="/register">Sign Up</Link>
                </p>
                <Link className="back_home" to="/"><i className="fas fa-chevron-left"></i>Back Home</Link>
            </div>
        </section>
    )
}
