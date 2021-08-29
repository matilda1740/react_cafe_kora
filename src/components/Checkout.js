import React from 'react'
import { Add, Remove, CreditCard, Archive, DirectionsCar } from '@material-ui/icons'

import './Checkout.css'
import { useStateValue } from './StateProvider';

export default function Checkout() {
    const [ {cart}, dispatch] = useStateValue();

    return (
    <section className="checkout_page">
        <div className="checkout_column">
            <div className="review_order">
                <h4>1. REVIEW ORDER</h4>
                
                {
                    cart?.length &&
                    cart.map( product => (
                        <div className="product_review_div">
                            <div className="products_image_div">
                                <img className="product_img" src="images/breads/idk3.png" alt=""/>
                                <h3 className="product_title">{product.product_name}</h3>
                            </div>
                            <div className="products_desc_div">
                                <div className="quantity_controls">
                                    <p>Quantity</p>
                        
                                    <Add className="qty_icons"/>
                                    <p>{product.quantity}</p>
                                    <Remove className="qty_icons"/>                        </div>
                                <button className="btn_purchase">
                                    <p className="product_price">Ksh. {product.product_price}</p>
                                </button>
                            </div>
                    
                        </div>
                    ))
                }

            </div>

            {/* <!-- subtotal --> */}
            <div className="order_subtotal">
                <h4>2. SUBTOTAL</h4>
                <div className="order_subtotal_row">
                    <p>Subtotal</p>
                    <p>Ksh. 1450.00</p>
                </div>
                <div className="order_subtotal_row">
                    <p>Order Total</p>
                    <p>Ksh. 1450.00</p>
                </div>
            </div>

        </div>
        <div className="checkout_column">
            <div className="payment_info">
                <h4>3. SELECT PAYMENT METHOD</h4>
            
                <div className="payment_info_row">
                    <CreditCard />
                    <p>Credit Card</p>
                </div>
            
                <div className="payment_info_row">
                    <CreditCard />
                    <p>Paypal</p>
                </div>              
            </div>

            <div className="payment_info">
                <h4>4. SELECT SHIPMENT METHOD</h4>
            
                <div className="payment_info_row">
                    <Archive />                       
                    <p>Pickup</p>
                </div>
            
                <div className="payment_info_row">
                    <DirectionsCar />
                    <p>Delivery</p>
                    {/* <!-- <i class="fas fa-arrow-right"></i> --> */}
                </div>
            </div>

        </div>

        <div className="checkout_column delivery_info">
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
        </div>

    </section>

    )
}
