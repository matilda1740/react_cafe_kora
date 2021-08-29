import { SubdirectoryArrowRight } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider';

export default function AccCart() {
    const [ { cart }] = useStateValue();

    return (
        <div className="update_right order_history_div">
            <h2 className="add_prod_title">Cart Details</h2>
            {
                cart?.length ?
                <>
                    <div className="oh_table_title">
                        <div className="row_spacing cart_row">
                            <p>Item Image</p>
                            <p>Item Name</p> 
                            <p>Quantity</p> 
                            <p>Unit Price</p> 
                        </div>   
                    </div>
                    <div className="oh_table_data">
                    {
                        cart?.map( item => 
                        (
                        <div className="row_spacing oh_row cart_row" key={item.product_id}>     
                            <img src={item.product_image} alt="cart product"/>
                            <p>{item.product_name}</p> 
                            <p>{item.quantity}</p>
                            <p>Ksh. {item.product_price}</p>
                        </div>                       
                        ))
                    }
                    </div>               
                </>
                :
                <div className="row_spacing oh_row cart_row">
                    <p className="empty_p">Your Cart is currently empty</p> 
                </div>   
            }
            <Link to="/checkout">
                <button className="btn_profile_checkout">Checkout Items
            <SubdirectoryArrowRight/></button>
            </Link>
        </div>
 
    )
}
