import { Room } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db, storage, time } from './firebase'

export default function AccOrder({currentUser, currOrders}) {

    const orderDetailsRef = db.collection('orderDetails')
    const productsRef = db.collection('product')

    let temp2 = [];
    // const [orderNo, setOrderNo] = useState(0);
    const [ordersD, setOrdersD] = useState();
    const [activeID, setActiveID] = useState("");

    const displayODs = targetId => async () => {
        try{
            await orderDetailsRef
                    .where("orderID", "==", `${targetId}`)
                    .get()
                    .then( snapshot => {
                        snapshot.forEach(item => {
                        let qty = item.data().itemQty
                        productsRef
                                .where("product_id", "==" , `${item.data().productID}`)
                                .get()
                                .then( snapshot => snapshot.forEach( item => {
                                    temp2.push({...item.data(), quantity: qty})
                                    setOrdersD(temp2)
                                } 
                                ))
                        })
                    })
                       
        }catch(error){
            console.log("Error Displayong Order History: ", error)
        }

        (activeID === "" || activeID !== targetId) ? setActiveID(targetId): setActiveID("")
        
        // console.log(activeID, currOrders,ordersD)
    } 
    
    return (
        <div className="update_right order_history_div">
            <h2 className="add_prod_title">Order History</h2>
            <div className="oh_table_title">
                <div className="row_spacing">
                    <p>Order ID</p>
                    <p>Order Date</p> 
                    <p>Order Amount</p> 
                    <p>Order Quantity</p> 
                    {/* <p><Room/>Delivery Address</p>  */}
                </div>   
            </div>
            {
                currOrders?.length ?         
                <div className="oh_table_data">
                    {
                        currOrders?.map( item => (
                        <>
                        <div className="row_spacing oh_row cart_row" key={item.orderID} onClick={displayODs(item.orderID)}>     
                            <p>{item.orderID}</p>
                            <p>{item.orderDate.toDate().toDateString()}</p> 
                            <p>Ksh. {item.orderTotal}</p>
                            <p>{item.orderQty}</p>
                        </div>
                        { 
                        activeID === item.orderID &&
                        <div className="order_details_div">
                            <div className="oh_table_title">
                                <div className="row_spacing cart_row">
                                    <p>Item Image</p>
                                    <p>Item Name</p> 
                                    <p>Quantity<span className="side_no_badge">{ordersD?.length}</span></p> 
                                    <p>Unit Price</p> 
                                </div>   
                            </div>                            
                            {
                                ordersD?.map( product => (
                                    <> 
                                    <div className="row_spacing oh_row cart_row" key={product.product_id}>     
                                        <img src={product.product_image} alt="ordered product"/>
                                        <p>{product.product_name}</p> 
                                        <p>{product.quantity}</p>
                                        <p>Ksh. {product.product_price}</p>
                                    </div>

                                    </>
                                ))
                            }
                        </div> 
                        }                        
                        </>
                        ))
                    }
                </div>
                    :
                    <div className="row_spacing oh_row cart_row">
                        <p className="empty_p">You haven't placed any orders yet</p> 
                    </div> 
            }


                {/* ON CLICK DISPLAY THIS DIV */}

   
                    {/* ITERATE THESE ROWS */}

        </div>
    )
}
