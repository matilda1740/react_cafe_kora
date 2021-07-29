import React from 'react'

export default function Checkout() {
    return (
    <section className="checkout_page">
        <div className="checkout_column">
            <div className="review_order">
                <h4>1. REVIEW ORDER</h4>
                
                <div className="product_review_div">
                    <div className="products_image_div">
                        <img className="product_img" src="images/breads/idk3.png" alt=""/>
                        <h3 className="product_title">Sourdough</h3>
                    </div>
                    <div className="products_desc_div">
                        <div className="quantity_controls">
                            <p>Quantity</p>
                
                            <i className="fas fa-minus"></i>
                            <p>2</p>
                            <i className="fas fa-plus"></i>
                        </div>
                        <button className="btn_purchase">
                            <p className="product_price">Ksh. 900.00 </p>
                        </button>
                    </div>
                
                    <div className="products_image_div">
                        <img className="product_img" src="images/pastries/nobg_chocolatecroissant.png" alt=""/>
                        <h3 className="product_title">Chocolate Croissants</h3>
                    </div>
                    <div className="products_desc_div">
                        <div className="quantity_controls">
                            <p>Quantity</p>
                
                            <i className="fas fa-minus"></i>
                            <p>1</p>
                            <i className="fas fa-plus"></i>
                        </div>
                        <button className="btn_purchase">
                            <p className="product_price">Ksh. 550.00 </p>
                        </button>
                    </div>
                </div>
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
                    <i className="fas fa-credit-card"></i>
                    <p>Credit Card</p>
                    <i className="fas fa-arrow-right"></i>
                </div>
            
                <div className="payment_info_row">
                    <i className="fab fa-paypal"></i>
                    <p>Paypal</p>
                    <i className="fas fa-arrow-right"></i>
                </div>              
            </div>

            <div className="payment_info">
                <h4>4. SELECT SHIPMENT METHOD</h4>
            
                <div className="payment_info_row">
                    <i className="fas fa-archive"></i>                        
                    <p>Pickup</p>
                </div>
            
                <div className="payment_info_row">
                    <i className="fas fa-car"></i>
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
