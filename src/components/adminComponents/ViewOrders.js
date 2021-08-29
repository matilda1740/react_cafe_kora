import { Link } from '@material-ui/core'
import { Create, Delete } from '@material-ui/icons'
import React from 'react'
import { useStateValue } from '../StateProvider';

export default function ViewOrders() {
    const [ { orders }, dispatch] = useStateValue();
    return (
        <>
            <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Orders Catalog 
            </h4>
            <p className="welcome_ptag">Total Orders: {orders?.length
            }</p>
            
        </div>
        {orders?.length ?
        <>

        <div className="operations_section">
            {/* 
                SORT OPERATION
                ACCORDING TO CATEGORY, ALPGABETICAL ORDER, DATE ADDED, PRICE, SEARCH 
             */}
        </div>
        <div className="display_area">

            <table className="customers_table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Date Ordered</th>
                        <th>Order Quantity</th>
                        <th>Order Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orders.map( order => 
                        order.orderID &&
                        <tr key={order.orderID} id={order.orderID}>
                            <td>{order.orderID}</td>
                            <td>{order.customerID}</td>
                            <td>{order.orderDate.toDate().toDateString()}</td>
                            <td>{order.orderQty}</td>
                            <td>{order.orderTotal}</td>
                            <td><p><Delete className="action_icons"/>
                            <Link to={`/admin/update_products/${order.product_id}`}>
                            <Create className="action_icons" />                                
                            </Link>
                            </p>
                            </td>
                        </tr>
                    )
                }
                </tbody>    
            </table>

            <div className="pagination_div">

            </div>

        </div> 
        </>
            :
            <div className="welcome_bar">
                <p className="welcome_ptag">Loading Orders...</p>            
            </div>            
        }
           

        </>

    )
}
