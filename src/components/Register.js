import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../contexts/AuthContext'
import { db } from './firebase'

export default function Register() {

    const history = useHistory();

    const { currentUser, registerUser } = useAuth(); 

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPass, setUserPass] = useState();
    const [userConfirmPass, setConfirmPass] = useState();

    const[isAuthError, setIsAuthError] = useState(false);
    const[authError, setAuthError] = useState("");


    const customersTable = db.collection("customer")

    const handleChange = (e) => {
        
        if(e.target.name === "registerFname"){
            setFirstName(e.target.value)
        }else if (e.target.name === "registerLname"){
            setLastName(e.target.value)
        }else if (e.target.name === "registerEmail"){
            setUserEmail(e.target.value)
        }else if(e.target.name === "registerPass"){
            setUserPass(e.target.value)
        }else if(e.target.name === "registerConfirmPass"){
            setConfirmPass(e.target.value)
        }

    }

    const handleRegister = async  e => {
        e.preventDefault();

        try{
            await registerUser(userEmail, userPass)
            await customersTable.add({
                "fname": firstName,
                "lname": lastName,
                "email": userEmail,
                "pass": userPass,
                "confirmPass": userConfirmPass,
                })
            await history.push("/") 
            await  setIsAuthError(false);
        }catch(error){
            console.log("Registration Error: ", error)
            setIsAuthError(true);
            setAuthError(error.message)
        }   
    }

    return (
        <section className="login_section reg_section">
        
            <div className="login_logo">
                {/* <!-- <img src="images/logo.png" alt="Site Logo" /> --> */}
            </div>
            <h2>Customer Sign Up</h2>

            <form onSubmit={handleRegister} className="registration_form">
                {
                isAuthError ?
                <div className="form_error form_inputs">
                    <p>{authError}</p>
                </div> 
                :
                <>
                </>               
                }
                
                <label className="form_labels">First Name:</label>
                <input onChange={handleChange} type="text" className="form_inputs" name="registerFname" />
                <label className="form_labels">Last Name:</label>
                <input onChange={handleChange} type="text" className="form_inputs" name="registerLname" />
                <label className="form_labels">Email:</label>
                <input onChange={handleChange} type="email" className="form_inputs" name="registerEmail" />
                <label className="form_labels">Password:</label>
                <input onChange={handleChange} type="password" className="form_inputs" name="registerPass" />
                <label className="form_labels">Confirm Password:</label>
                <input onChange={handleChange} type="password" className="form_inputs" name="registerConfirmPass" password="" autoComplete="new-password" />
                
                <button type="submit" className="form_btn ">Sign Up</button>
            </form>
            <div className="login_footer">
                <p>Already have an account?
                    <Link to="/login"> Sign In</Link>
                </p>
                <p>
                    <Link to="/"><i className="fas fa-chevron-left"></i>Back Home</Link>
                </p>
            </div>
        </section>        
    )
}
