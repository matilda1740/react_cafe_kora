import React from 'react'
import { useStateValue } from '../StateProvider';
import { Create, Delete } from '@material-ui/icons'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTotalTeam} from '../reducer';

export default function ViewEmployees() {

    const [ { users }, dispatch] = useStateValue();

    useEffect(() => {

    }, [])
    const handleDelete = (e) => {
        e.preventDefault();
        let targetID = e.target.parentNode.parentNode.parentNode.id;
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
        {
            users?.length ?
        <>
        <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Team
            </h4>
            <p className="welcome_ptag">Total Team Members: {getTotalTeam(users)}</p>
            
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
                users.map( team => 
                    team.type === "admin" &&
                    <tr key={team.userID} id={team.userID}>
                        <td>{team.fname}</td>
                        <td>{team.lname}</td>
                        <td>{team.email}</td>
                        <td>{team.phone}</td>
                        <td>{team.datejoined.toDate().toDateString()}</td>
                        <td><p><Delete onClick={handleDelete} className="action_icons"/>
                        <Link to={`/admin/update_products/${team.userID}`}>
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
            <p className="welcome_ptag">Loading Employees...</p>
            </div>     
        }
           

        </>

    )
}
