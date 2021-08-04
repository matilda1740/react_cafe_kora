import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../contexts/AuthContext'
import { db,  time } from './firebase'
import {Home } from '@material-ui/icons';

export default function Register() {
    const history = useHistory();

    const { currentUser, registerUser } = useAuth(); 

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userRole, setUserRole] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPass, setUserPass] = useState();
    const [userConfirmPass, setConfirmPass] = useState();

    const [isAuthError, setIsAuthError] = useState(false);
    const [authError, setAuthError] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

    const userTable = db.collection("user");

    const handleChange = (e) => {
        const selectRole = document.getElementById("select_role")
        
        if(e.target.name === "registerFname"){
            setFirstName(e.target.value)
        }else if (e.target.name === "registerLname"){
            setLastName(e.target.value)
        }else if (e.target.name === "registerPhone"){
            setUserPhone(e.target.value)
        }else if (e.target.name === "registerEmail"){
            setUserEmail(e.target.value)
        }else if(e.target.name === "registerPass"){
            setUserPass(e.target.value)
        }else if(e.target.name === "registerConfirmPass"){
            setConfirmPass(e.target.value)
        }else if (selectRole.id === "select_role"){
            setUserRole(selectRole.value)
        }
    }

    const handleRegister = async  e => {
        e.preventDefault();

        if(userPass === userConfirmPass){
            try{
                // console.log(userEmail, userPass)
                await registerUser(userEmail, userPass)
                    .then( (data) => console.log(data))
                await userTable.add({
                    "userID": userTable.doc().id,
                    "fname": firstName,
                    "lname": lastName,
                    "phone": userPhone,
                    "type" : isAdmin ? "admin" : "customer",
                    "email": userEmail,
                    "pass": userPass,
                    "datejoined": time
                    })                    
                await isAdmin ? history.push("/admin") : history.push("/")
                await  setIsAuthError(false);
            }catch(error){
                console.log("Registration Error: ", error)
                setIsAuthError(true);
                setAuthError(error.message)
            }
        }else {
            setIsAuthError(true);
            setAuthError("Please Ensure Your Password is the same as the Confirm Password")
        }
 
    }

    const checkAdmin = (e) => {
        if (e.target.style.backgroundColor === 'rgb(202, 151, 3)'){
            e.target.style.backgroundColor = '#002147'
            setIsAdmin(false);
        }
        else{
            e.target.style.backgroundColor = '#ca9703'
            setIsAdmin(true);
        }
    }

    return (
        <section className="login_section reg_section"> 

            <div className="check_admin" onClick={checkAdmin}>
                <p>Are you an admin?</p>
            </div>
            <h2>Cafe Kora Sign Up</h2>

            <form onSubmit={handleRegister} className="registration_form">
                {
                isAuthError &&
                <div className="form_error form_inputs">
                    <p>{authError}</p>
                </div> 
         
                }
                
                <label className="form_labels">First Name:</label>
                <input onChange={handleChange} type="text" className="form_inputs" name="registerFname" />
                <label className="form_labels">Last Name:</label>
                <input onChange={handleChange} type="text" className="form_inputs" name="registerLname" />
                <label className="form_labels">Phone Number:</label>
                <input onChange={handleChange} type="text" className="form_inputs" name="registerPhone" /> 
                {
                    isAdmin &&
                    <>
                    <label className="form_labels">Cafe Kora Role:</label>
                    <p className="admin_p form_inputs">Adminstrator</p>

                    {/* <select onChange={handleChange} className="form_inputs" id="select_role">
                        <option value="0">Select Cafe Kora Admin Role:</option>
                        <option value="Adminstrator">Adminstrator</option>
                        <option value="Employee">Employee</option>
                    </select> */}
                    </>
                }
 
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
                <div className="back_home_div">
                    <Link to="/">
                    <Home />Back Home
                    </Link>
                </div>
            </div>
        </section>        
    )
}
