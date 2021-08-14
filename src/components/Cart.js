import { Add, Remove } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import { useStateValue } from './StateProvider';

export default function Cart() {

    const [ {cart}, dispatch] = useStateValue();
    console.log("Cart Products: ", cart)

    const increaseQty = (e) => {
        

    }
    const decreaseQty = (e) => {

    }
    return (
        <section className="products_page">
            {
                cart?.length ?

                <>
                <>
                {
                cart.map( product => (

                <div className="products_div cart_product_div" key={product.product_id} >
                    <div className="products_image_div cart_products_image_div">
                        <img className="product_img" src={product.product_image} alt="Product"/>
                    </div>
                    <div className="products_desc_div cart_products_desc_div">
                        <h3 className="product_title">{product.product_name}</h3>
                        <div className="cart_quantity_div">
                            <p>Quantity</p>
                            <div className="cart_qty_operations">
                                <Add className="qty_icons" onClick={increaseQty}/>
                                <p>{product.quantity}</p>
                                <Remove className="qty_icons" onClick={decreaseQty}/>
                            </div>
                        </div>
                        <div className="cart_product_total">
                            <p>Ksh. {product.product_price}</p>
                        </div>
                    </div>
                </div>
                ))
                }
                </>
                <div className="cart_routes">
                    <button className="btn">Continue Shopping</button>
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

