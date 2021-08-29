import React, { useState } from 'react'
import { Add, Remove, CreditCard, Archive, DirectionsCar } from '@material-ui/icons'

import './Checkout.css'
import { useStateValue } from './StateProvider';
import { getSubTotal } from './reducer'
import { useAuth } from '../contexts/AuthContext';
import { db,  time } from './firebase'
import { getproductTotal } from '../components/reducer'

export default function Checkout() {
    const [ {cart}, dispatch] = useStateValue();
    const { currentUser } = useAuth(); 

    const orderTable = db.collection("order");
    const orderDetailsTable = db.collection("orderDetails");

    const [ isPickup, setIsPickup] = useState(false);
    const [ isDelivery, setIsDelivery] = useState(false);
    const [ shipFee, setShipFee] = useState(0);

    const handlePDSelect = selection => (e) => {
        if(selection === "pickup"){
            isPickup ? setIsPickup(false) : setIsPickup(true);
            setIsDelivery(false)
        }else if(selection === "delivery"){
            isDelivery ?  setIsDelivery(false) : setIsDelivery(true)
            setIsPickup(false)
        }
    }

    const handleShipFee = fee => () => {
        setShipFee(fee)
    }

    const sendOrderDetails = async () => {
        if(currentUser){
            try{
                // CREATE ORDER INSTANCE
                let createOrder = 
                await orderTable.add({
                    "orderID": orderTable.doc().id,
                    "orderTotal": getSubTotal(cart),
                    "orderQty": getproductTotal(cart),
                    "orderDate": time,
                    "customerID": currentUser.uid
                })
                if(createOrder){
                    
                    let currentOrder = await orderTable.doc(createOrder.id).get()
                    cart?.forEach( async item => {
                        let res = await orderDetailsTable.add({
                            "orderDetailsID": orderDetailsTable.doc().id,
                            "orderID": currentOrder.data().orderID,
                            "itemTotal": item.quantity * item.product_price,
                            "itemQty": item.quantity,
                            "productID": item.product_id
                        })  
                        // console.log(res)
                    })     
                    // SUCCESS MESSAGE .... REROUTE TO HOME ...
                }else {
                    // DISPLAY ERROR MESSAGE
                    console.log("Error")
                }
            }catch(error){
                console.log("Error Sending Order Details:  ", error)
            }
    }
    }
    
    return (
    <section className="checkout_page">
        <div className="checkout_column">
            <div className="review_order checkout_column_div">
                <h4>1. REVIEW ORDER</h4>
                
                {
                    cart?.length &&
                    cart.map( product => (
                        <div className="product_review_div">
                            <div className="products_image_div">
                                <img className="product_img" src={product.product_image} alt=""/>
                                <h3 className="product_title">{product.product_name}</h3>
                            </div>
                            <div className="products_desc_div">
                                <div className="quantity_controls">
                                    <p>Quantity</p>
                        
                                    <Add className="qty_icons"/>
                                    <p>{product.quantity}</p>
                                    <Remove className="qty_icons"/>                        </div>
                                <button className="btn_purchase_div">
                                    <p className="product_price">Ksh. {product.product_price}</p>
                                </button>
                            </div>
                    
                        </div>
                    ))
                }

            </div>

            <div className="payment_info checkout_column_div">
                <h4>2. SELECT SHIPMENT METHOD</h4>
                <div className="payment_info_row" onClick={handlePDSelect("pickup")}>
                    <Archive />                       
                    <p>Pickup</p>
                </div>
                {
                    isPickup &&
                    <>
                    <div className="payment_info_row" onClick={handleShipFee(100)}>
                        <p>CBD Pickup Station</p>
                        <p>Ksh. 100</p>
                    </div>
                    <div className="payment_info_row" onClick={handleShipFee(200)}>
                        <p>Stations Within Nairobi, outside CBD</p>
                        <p>Ksh. 200</p>
                    </div> 
                    </>                                  
                }
                <div className="payment_info_row" onClick={handlePDSelect("delivery")}>
                    <DirectionsCar />
                    <p>Delivery</p>
                </div>
                {
                    isDelivery &&
                    <>
                    <div className="payment_info_row" onClick={handleShipFee(100)}>
                        <p>Within CBD</p>
                        <p>Ksh. 100</p>
                    </div>
                    <div className="payment_info_row" onClick={handleShipFee(300)}>
                        <p>Within Nairobi, outside CBD</p>
                        <p>Ksh. 300</p>
                    </div>
                    <div className="payment_info_row" onClick={handleShipFee(400)}>
                        <p>Outside Nairobi, in Kenya</p>
                        <p>Ksh. 400</p>
                    </div>  
                    </>                                  
                }

            </div>

            <div className="order_subtotal checkout_column_div">
                <h4>3. SUBTOTAL</h4>
                <div className="order_subtotal_row">
                    <p>Subtotal</p>
                    <p>Ksh. {getSubTotal(cart)}</p>
                </div>
                <div className="order_subtotal_row">
                    <p>Shipment Fee</p>
                    <p>Ksh. {shipFee}</p>
                </div>                
                <div className="order_subtotal_row">
                    <p>Order Total</p>
                    <p>Ksh. {getSubTotal(cart) + shipFee}</p>
                </div>
            </div>

            <div className="payment_info checkout_column_div">
                <h4>4. SELECT PAYMENT METHOD</h4>
            
                <div className="payment_info_row">
                    <CreditCard />
                    <p>Credit Card</p>
                </div>
            
                <div className="payment_info_row">
                    <CreditCard />
                    <p>Paypal</p>
                </div>
            
                <div className="payment_info_row">
                    <CreditCard />
                    <p>Cash on Delivery</p>
                </div>                               
            </div>

            <button onClick={sendOrderDetails} className="form_btn checkout_btn">Complete Order</button>

{/* 
            <div className="delivery_info checkout_column_div">
                <h4>5. DELIVERY INFORMATION</h4>

                <form className="registration_form">
                    <label className="form_labels">First Name:</label>
                    <input type="text" className="form_inputs" name="registerFname" />
                    <label className="form_labels">Last Name:</label>
                    <input type="text" className="form_inputs" name="registerLname" />
                    <label className="form_labels">Email:</label>
                    <input type="email" className="form_inputs" name="registerEmail" />
                    <label className="form_labels">Phone Number:</label>
                    <input type="text" className="form_inputs" name="registerPass" />
                    <label className="form_labels">Delivery Address:</label>
                    <input type="text" className="form_inputs" name="registerConfirmPass" />
                    <label className="form_labels">Postal Code:</label>
                    <input type="text" className="form_inputs" name="registerConfirmPass" />  
                    
                    <button type="submit" className="form_btn ">PAY NOW</button>
                    
                </form>
            </div> */}
        
        </div> {/* Closes the Flex Column */}
    </section>

    )
}
