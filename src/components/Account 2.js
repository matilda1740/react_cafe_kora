import React, { useEffect, useState } from 'react'
import { Create, Delete, Home, PersonPin, Room, ShoppingCart, SubdirectoryArrowRight } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import Profile from './Profile';
import AccOrder from './AccOrder';
import AccCart from './AccCart';
import { useStateValue } from './StateProvider';
import { getproductTotal } from './reducer';
import { useAuth } from '../contexts/AuthContext';
import { db } from './firebase'

export default function Account() {
    const { currentUser } = useAuth(); 

    const [currOrders, setCurrOrders] = useState();
    const orderRef = db.collection('order')
    let temp = [];

    const orderHistory = async () => {
        try{
            await 
                orderRef
                    .where("customerID", "==", `${currentUser.uid}`)
                    .get()
                    .then( snapshot => snapshot.forEach( item => {
                        return temp.push({...item.data()})
                    }))
        }catch(error){
            console.log("Error Displayong Order History: ", error)
        }
        return temp
    }
    const [ { cart} ,dispatch] = useStateValue();

    const [uploadImage, setUploadImage] = useState();

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
    useEffect( () => {
        orderHistory()
            .then(() => {
                setCurrOrders(temp)
                // setOrderNo(temp?.length)
            } )
    }, [temp])

    return (
        <section className="update_section profile_section"> 
            <div className="update_column">
                <div className="profile_left">
                    <div className="profile_photo_div">
                        <img id="display_userImage" src="/images/avatar_placeholder.png" alt="Upload" />	
                        <input onChange={handleChange("product_image")} type="file" className="form_inputs" name="product_image" accept="image/*"/> 
                    </div>
            
                    <div className="sidebar_bottom">
                        <p className="sidebar_parts">
                            <PersonPin className="sidebar_icons"/>
                            <Link to="/admin">Profile</Link>
                        </p>
                        <p className="sidebar_parts">
                            <ShoppingCart className="sidebar_icons"/>
                            <Link to="/admin">Order History</Link>
                            <span className="side_no_badge">{currOrders?.length}</span>
                        </p>
                        <p className="sidebar_parts">
                            <ShoppingCart className="sidebar_icons"/>
                            <Link to="/admin">Cart</Link>
                            <span className="side_no_badge">{getproductTotal(cart)}</span>

                        </p>
                    </div>                
                </div>
                {/* SERVE ALL THE OTHER PAGES ON THE RIGHT */}
                {/* <Profile /> */}
                <AccOrder currentUser={currentUser} currOrders={currOrders}/>
                {/* <AccCart /> */}
            </div>
        </section>        

    )
}
