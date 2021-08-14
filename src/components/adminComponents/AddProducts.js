import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../Login.css'
import { Home } from '@material-ui/icons';
import { db, storage, time } from '../firebase'
import { useStateValue } from '../StateProvider';
 
export default function AddProducts() {
    const [ { products }, dispatch] = useStateValue();

    const [error, setError] = useState();
    const [isError, setIsError] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [prodImage, setProdImage] = useState();
    const [prodDetails, setProductDetails] = useState({});

    const [progress, setProgress] = useState();
    const [addLoading, setAddLoading] = useState();

    const history = useHistory();
    const addForm = document.querySelectorAll(".add_product_form .form_inputs")
   
    // ERROR handling
    const activateErrors = (el) => {
        el.style.border ="1px solid rgb(210, 4, 45, 0.8)"
        el.style.backgroundColor ="rgb(210, 4, 45, 0.1)" 
        setIsError(true)
        setError("Please Ensure all Input Fields are Filled")
        setIsFormFilled(false)                           
    }
    const deactivateErrors = el => {
        el.style.border = ""
        el.style.backgroundColor =""
        setIsError(false)
        setError()       
    }
    const loadImage = async (event) => {
        event.preventDefault();
        const image = document.querySelector("#display_prodImage");
        if(event.target.files[0] === undefined){
            image.style.display = "none"
            image.src = "";
        }else {
            image.src = URL.createObjectURL(event.target.files[0]);
            image.style.display = "block"
            setProdImage(event.target.files[0])
        }
    }

    const handleChange = input => async (e) => {
        e.preventDefault();

        if(e.target.value === ""){
            activateErrors(e.target) 
        } else{
            e.target.style.border =""
            e.target.style.backgroundColor =""
            setIsError(false)
            setError() 
        }
        
        (input === "product_image") && loadImage(e)
        
        try{
            await setProductDetails({
                                    ...prodDetails, 
                                    [input]:e.target.value.replace("C:\\fakepath\\", "")
                            })
            
        }catch(error){
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prodDB = db.collection("product");

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
        if(counter === 5){
        try{
            storage
                .ref(`/products/${prodDetails.product_cat}/${prodDetails.product_name}`)
                .put(prodImage, {contentType: 'image/png'},)
                .on("state_changed" , 
                    (snapshot) => {
                    const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *  100
                    );
                    setProgress(prog);
                    console.log(snapshot, progress)
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    // console.log(prodDetails)
                    storage
                    .ref(`/products/${prodDetails.product_cat}/`)
                    .child(prodDetails.product_name)
                    .getDownloadURL()
                    .then((url) => {
                        prodDB.add({
                            product_id: prodDB.doc().id,
                            product_name: prodDetails.product_name,
                            product_descr : prodDetails.product_descr,
                            product_image: url,
                            product_price: prodDetails.product_price,
                            product_cat: prodDetails.product_cat,
                            dateadded: time,
                            })
                    })                  
                    .catch( error => console.log("Error Updating Firestore Products: ", error))
                        }
                ).then( () => history.push('/admin/products'))
        }catch(error){
            console.log("Error Updating Storage: ", error)
        }
        }
    }

    return (
        <section className="login_section reg_section addprod"> 

            <h2 className="add_prod_title">Cafe Kora Add Product</h2>

            <form onSubmit={handleSubmit} className="registration_form add_product_form">
                {
                    isError &&
                    <div className="form_error form_inputs">
                        <p>{error}</p>
                    </div>         
                }
                <label className="form_labels">Upload Product Image:</label>
                <img id="display_prodImage" alt="" />	

                <input onChange={handleChange("product_image")} type="file" className="form_inputs" name="product_image" accept="image/*"/>               
                <label className="form_labels">Product Name:</label>
                <input onChange={handleChange("product_name")} type="text" className="form_inputs" name="product_name" />
                <label className="form_labels">Product Description:</label>
                <input onChange={handleChange("product_descr")} type="text" className="form_inputs" name="product_descr" />
                <label className="form_labels">Product Category:</label>
                <select onChange={handleChange("product_cat")} className="form_inputs" id="product_cat">
                    <option value="">Select Category:</option>
                    <option value="breads">Bread</option>
                    <option value="pastries">Pastry</option>
                </select>
                <label className="form_labels">Product Price:</label>
                <input onChange={handleChange("product_price")} type="text" className="form_inputs" name="product_price" />
                
                <button type="submit" className="form_btn ">Add Product</button>
            </form>
            <div className="login_footer back_home_div add_footer">
                <Link to="/admin"><Home />Back Home</Link>
            </div>
        </section>             
    )
}
