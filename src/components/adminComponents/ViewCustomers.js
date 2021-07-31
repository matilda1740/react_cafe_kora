import React from 'react'
import './ViewCustomers.css'

export default function ViewCustomers({customers}) {
    
    return (
        <>
        {
            customers?.length ?
        <>
        <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Customers 
            </h4>
            <p className="welcome_ptag">Total Customers: {customers?.length}</p>
            
        </div>

        <div className="display_area">
            <table className="customers_table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Date Joined</th>

                </tr>
            </thead>

            {
                customers.map( customer => 
                <tbody key={customer.email}>
                    <tr>
                        <td>{customer.fname}</td>
                        <td>{customer.lname}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.datejoined.toDate().toDateString()}</td>
                    </tr>
                </tbody>    
                )
        
            }
            </table>
        </div> 
        </>
            :
            <p className="welcome_ptag">0 Customers :B</p>
        }
           

        </>
    )
}
