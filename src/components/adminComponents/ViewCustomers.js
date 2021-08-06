import React from 'react'
import './ViewCustomers.css'
import { db } from '../firebase'

import {Delete } from '@material-ui/icons';

export default function ViewCustomers({ customers }) {
 
    // console.log(customers)
    const customersRef = db.collection('user')
    
    // customersRef.onSnapshot((snapshot) => {
    //             snapshot.docChanges().map( change => {
    //                 console.log(change)
    //             })
    //         })
    // LISTEN TO DATABASE CHANGES
    const updateCustomers = async () => {
        // const snapshot = 
        //     await customersRef.onSnapshot((snapshot) => {
        //         snapshot.docChanges().map( change => {
        //             console.log(change)
        //         })
        //     })
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        let delUserID = e.target.parentNode.parentNode.parentNode.id;

        if(window.confirm("Are You Sure you want to delete this record")){
            try{ 
                const snapshot = await customersRef.where("userID", "==", `${delUserID}`).get();
                
                if(snapshot.empty){
                    console.log("No Customer Data Found!")
                }else {
                    snapshot.forEach( user => {
                        customersRef.doc(user.id).delete() //_working
                        console.log(user.data().fname, "Deleted From DB")                    
                    })
                }           
            }catch(error){
                console.log("Error: ", error)
            }
        }


    }


    return (
        <>
            <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Customers 
            </h4>
            <p className="welcome_ptag">Total Customers: {customers?.length}</p>
            
        </div>
        {

            customers?.length ?
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
                    customers.map( customer => 
                        <tr key={customer.userID} id={customer.userID}>
                            <td>{customer.fname}</td>
                            <td>{customer.lname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.datejoined.toDate().toDateString()}</td>
                            <td>
                            <Delete onClick={handleDelete}/>
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
