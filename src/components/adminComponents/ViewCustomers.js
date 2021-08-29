import React, { useEffect, useState } from 'react'
import './ViewCustomers.css'
import { db } from '../firebase'

import {Create, Delete } from '@material-ui/icons';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

export default function ViewCustomers() {

    const [ { users }, dispatch] = useStateValue();
       
    const handleDelete = (e) => {
        e.preventDefault();
        let targetID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(window.confirm("Are You Sure you want to delete this record")){
            dispatch({
                type: "delete_user",
                targetID: targetID
            }) 
        }
    }

    const handleUpdate = (e) => {
        let targetID = e.target.parentNode.parentNode.parentNode.id;
        dispatch({
            type: "update_user",
            targetID: targetID
        }) 
    }


    return (
        <>
            <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Customers 
            </h4>
            {/* <p className="welcome_ptag">Total Customers: {users?.length}</p> */}
            
        </div>
        {
            users?.length ?

        <>
        <div className="operations_section">

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map( customer => 
                        customer.type === "customer" &&
                        <tr key={customer.userID} id={customer.userID}>
                            <td>{customer.fname}</td>
                            <td>{customer.lname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.datejoined.toDate().toDateString()}</td>
                            <td><p><Delete onClick={handleDelete} className="action_icons"/>
                            <Link to={`/admin/update_products/${customer.userID}`}>
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
        </div> 
        </>
            :
            <div className="welcome_bar">
                <p className="welcome_ptag">Loading Customers...</p>            
            </div>            
        }
           

        </>
    )
}
