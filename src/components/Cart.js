import { Add, Remove } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import { useStateValue } from './StateProvider';
import { getSubTotal } from './reducer'

export default function Cart({increaseQty, decreaseQty}) {
    const [ {cart}, dispatch] = useStateValue();
    return (
        <section className="products_page cart_products_page">
            {
                cart?.length ?
                <>
                <>
                {
                cart.map( product => (

                <div className="products_div cart_product_div" key={product.product_id} id={product.product_id}>
                    <div className="products_image_div cart_products_image_div">
                        <img className="product_img" src={product.product_image} alt="Product"/>
                    </div>
                    <div className="products_desc_div cart_products_desc_div">
                        <h3 className="product_title">{product.product_name}</h3>
                        <div className="cart_quantity_div">
                            <p>Quantity</p>
                            <div className="cart_qty_operations">
                                <Add className="qty_icons" onClick={() => increaseQty(product)}/>
                                <span>{product.quantity}</span>
                                <Remove className="qty_icons" onClick={() => decreaseQty(product)}/>
                            </div>
                        </div>
                        <div className="cart_product_total">
                            <p>Ksh. {product.product_price * product.quantity}</p>
                        </div>
                    </div>
                </div>
                ))
                }
                </>
                <div className="subtotal_div">
                    <p>Order Total: </p>
                    <p>Ksh. {getSubTotal(cart)}</p>
                </div>                 
                <div className="cart_routes">
                    <Link to="/breads">
                    <button className="btn">Continue Shopping</button>
                    </Link>
                    <Link to="/checkout">
                    <button className="btn">Proceed to Checkout</button>
                    </Link>

                </div> 
                </>
                : 
                <>
                <p>Empty Cart ;(</p>
                </>
            }

           
        </section>
    )
}

