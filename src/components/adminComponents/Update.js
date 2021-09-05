import { Cancel, Create, Delete, Home } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import './Update.css'
import { CancelOutlined, CheckCircleOutline } from '@material-ui/icons'

export default function Update({match}) {

    const [ { products, productUpdateStatus}, dispatch] = useStateValue();

    const [currentP,setCurrentP ] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [prodImage, setProdImage] = useState();
    const [prodDetails, setProductDetails] = useState({});

    const history = useHistory();
    const addForm = document.querySelectorAll(".add_product_form .form_inputs")
    // UPDATE ALERTS
    // const alertDiv = document.querySelector(".")
    const [ successAlert, setSuccessAlert] = useState(false);
    const [ failureAlert, setFailureAlert] = useState(false);
    const [ alertMsg, setAlertMsg] = useState("Product Added Successfully!");
    const alertStyle = { display: successAlert ? `flex`  : `none`}

    useEffect(() => {
        if(match){
        products.map( prod => prod.product_id === match.params.id && setCurrentP(prod) )
        }
        // console.log(currentP)

        if(currentP){
            setIsUpdate(true);
        }
    }, [currentP])


    // ERROR HANDLING
    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);

    const activateErrors = (el) => {
        el.style.border ="1px solid rgb(210, 4, 45, 0.4)"
        el.style.backgroundColor ="rgb(244, 194, 194, 0.9)" 
        setIsError(true)
        setError("Please Ensure all Input Fields are Filled")
        // setIsFormFilled(false)                           
    }
    const deactivateErrors = el => {
        el.style.border = ""
        el.style.backgroundColor =""
        setIsError(false)
        setError("")       
    }
    const loadImage = (event) => {
        event.preventDefault();
        const image = document.querySelector("#display_userImage");
        if(event.target.files[0] !== undefined){
            image.src = URL.createObjectURL(event.target.files[0]);
            image.style.display = "block"
            setProdImage(event.target.files[0])
        }else {
            image.src = "/images/avatar_placeholder.png";
        }
    }
    const handleChange = input => async (e) => {
        e.preventDefault();
        (input === "product_image") && loadImage(e)      

        if(e.target.value === ""){
            activateErrors(e.target) 
        } else{
            deactivateErrors(e.target)
        }
        try{
            await setProductDetails({
                                    ...prodDetails, 
                                    [input]:e.target.value.replace("C:\\fakepath\\", "")
                            })
            
        }catch(error){
            console.log(error)
        }
    } 

    const addProduct = async () => {
        dispatch({
            type: "add_product",
            updateData: prodDetails,
            image: prodImage                
        })
    }
    const updateProduct = async () => {
        dispatch({
            type: "update_product_info",
            targetID: match.params.id,
            updateData: prodDetails,
            image: prodImage                
        })        

    }

    const displaySuccess = () => {
        setSuccessAlert(true)
        setAlertMsg("Product Added Successfully!")
        setTimeout(() => {
            setSuccessAlert(false)
            setAlertMsg("")   
            history.push("/admin")
        }, 4000);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let counter = 0
        addForm.forEach( el => {
            if(el.value === ""){
                activateErrors(el)
            }else {
                deactivateErrors(el)
                counter += 1
            }
            return counter
        })
        if (isUpdate){
             updateProduct().then( () => displaySuccess()) 
        } else {
            (counter === 5) && addProduct().then( () => displaySuccess()) 
        }
    }
    
    return (
        <section className="update_section up_prod"> 

            <div className="user_alerts success" style={{ display: alertStyle.display }}>
                <p>{alertMsg}</p>
                <CheckCircleOutline />
                {/* <CancelOutlined /> */}

            </div>

            <h2 className="add_prod_title">Cafe Kora {isUpdate ? "Update Product" : "Add Product"} </h2>

            <form onSubmit={handleSubmit} className="update_column add_product_form">

                <div className="update_left registration_form">
                    <label className="form_labels">Upload Product Photo:</label>
                    <img id="display_userImage" src={isUpdate ? currentP.product_image : "/images/avatar_placeholder.png" } alt="Upload" />	
        
                    <input 
                    onChange={handleChange("product_image")} placeholder={isUpdate ? currentP.product_name : ""} 
                        type="file" className="form_inputs" name="product_image" accept="image/*"/> 
                </div>

                <div className="update_right registration_form">
                    {
                    isError &&
                    <div className="form_error form_inputs">
                        <p>{error}</p>
                    </div> 
            
                    }
                    <label className="form_labels">Product Name:</label>
                    <input 
                    onChange={handleChange("product_name")}
                    placeholder={isUpdate ? currentP.product_name : ""}
                    type="text" className="form_inputs" name="product_name"/>
                    <label className="form_labels">Product Description:</label>
                    <input 
                    onChange={handleChange("product_descr")}
                    placeholder={isUpdate ? currentP.product_descr : ""}
                        type="text" className="form_inputs" name="product_descr" />
                    <label className="form_labels">Product Category:</label>
                    <select onChange={handleChange("product_cat")} className="form_inputs" id="product_cat">
                        <option value="" disabled defaultValue>{isUpdate ? currentP.product_cat : "Select Category:"}</option>
                        <option value="breads">Bread</option>
                        <option value="pastries">Pastry</option>
                    </select>
                    <label className="form_labels">Product Price:</label>
                    <input 
                    onChange={handleChange("product_price")} 
                    placeholder={isUpdate ? currentP.product_price : ""}
                    type="text" className="form_inputs" name="product_price" />
                    
                    <button type="submit" className="form_btn">{isUpdate ? "Update " : "Add "}Product</button>

                </div>
                

            </form>
                <div className="login_footer back_home_div add_footer">
                    <Link to="/admin/products"><Cancel />Cancel</Link>
                    <Link to="/admin"><Home />Back to Admin Home</Link>

                </div>
        </section>        
    )
}

