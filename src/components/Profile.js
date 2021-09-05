import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import '../components/adminComponents/Update.css'
import './Profile.css'

export default function Profile() {

    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);

    const handleUpdate = () => {
    }
    const handleChange = input => async (e) => {
    }

    return (
        <form onSubmit={handleUpdate}  className="update_right registration_form">
            <h2 className="add_prod_title">Cafe Kora User Profile</h2>
            {isError &&
            <div className="form_error form_inputs">
                <p>{error}</p>
            </div> 
            }
            <label className="form_labels">First Name:</label>
            <input onChange={handleChange} type="text" className="form_inputs" name="registerFname" />
            <label className="form_labels">Last Name:</label>
            <input onChange={handleChange} type="text" className="form_inputs" name="registerLname" />
            <label className="form_labels">Phone Number:</label>
            <input onChange={handleChange} type="text" className="form_inputs" name="registerPhone" /> 
            <label className="form_labels">Email:</label>
            <input onChange={handleChange} type="email" className="form_inputs" name="registerEmail" />
            <label className="form_labels">Password:</label>
            <input onChange={handleChange} type="password" className="form_inputs" name="registerPass" />
            <label className="form_labels">Confirm Password:</label>
            <input onChange={handleChange} type="password" className="form_inputs" name="registerConfirmPass" password="" autoComplete="new-password" />
            
            <button type="submit" className="form_btn">Update Profile</button>                

        </form>
    )
}

