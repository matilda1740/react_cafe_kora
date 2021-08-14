import React from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { Create, Delete } from '@material-ui/icons';

export default function ViewProducts() {
    const [ { products }, dispatch] = useStateValue();

    // console.log(products)
    const deleteProduct = e => {
        let targetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        dispatch({
            type: "delete_product",
            targetID: targetID
        })   
    }


    // const createPages = () => {
    //     // Get number of rows in table
    //     const myTable = document.querySelector(".customers_table")
    //     if(myTable !== null){
    //         const noOfRows = document.querySelector(".customers_table").rows.length
    //         console.log(noOfRows)
    //     } 
    // }

    // if( products.length > 0){
    //     createPages()
    // }
    return (
        <>
            <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Product Catalog 
            </h4>
            <p className="welcome_ptag">Total Products: {products?.length}</p>
            
        </div>
        {

            products?.length ?
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
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Category</th>
                        <th>Product Price</th>
                        <th>Date Added</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map( item => 
                        item.product_id &&
                        <tr key={item.product_id} id={item.product_id}>
                            <td>{item.product_name}</td>
                            <td>{item.product_descr}</td>
                            <td>{item.product_cat}</td>
                            <td>{item.product_price}</td>
                            <td>{item.dateadded.toDate().toDateString()}</td>
                            <td><p><Delete onClick={deleteProduct} className="action_icons"/>
                            <Link to={`/admin/update_products/${item.product_id}`}>
                                <Create
                                className="action_icons"
                                />                                
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
                <p className="welcome_ptag">Loading Products...</p>            
            </div>            
        }
           

        </>
    )
}
