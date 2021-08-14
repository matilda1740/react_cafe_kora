import { Create, Delete, Home } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import '../components/adminComponents/Update.css'

export default function Profile({match}) {

    console.log(match)
    const [ { users, products }] = useStateValue();
    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);
    const [uploadImage, setUploadImage] = useState();
    const [isUpdate, setIsUpdate] = useState(false);

    const history = useHistory();


    const handleUpdate = () => {

    }

    const loadImage = (event) => {
        event.preventDefault();
        const image = document.querySelector("#display_userImage");
        if(event.target.files[0] !== undefined){
            image.src = URL.createObjectURL(event.target.files[0]);
            image.style.display = "block"
            setUploadImage(event.target.files[0])
        }else {
            image.src = "/images/avatar_placeholder.png";
        }
    }
    const handleChange = input => async (e) => {
        (input === "product_image") && loadImage(e)
    }    
    return (
        <section className="update_section"> 

            <h2 className="add_prod_title">Cafe Kora User Profile</h2>

            <form onSubmit={handleUpdate} className="update_column">

                <div className="update_left registration_form">
                    <label className="form_labels">Upload Profile Picture:</label>
                    <img id="display_userImage" src="/images/avatar_placeholder.png" alt="Upload" />	

                    <input onChange={handleChange("product_image")} type="file" className="form_inputs" name="product_image" accept="image/*"/> 
                </div>

                <div className="update_right registration_form">
                    {
                    isError &&
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
                    
                    <button type="submit" className="form_btn">Update User</button>
                </div>
                

            </form>
            <div className="login_footer back_home_div add_footer">
                <Link to="/"><Home />Back Home</Link>
            </div>
        </section>        

    )
}

