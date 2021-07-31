import React from 'react'

export default function ViewEmployees({team}) {
    return (
        <>
        {
            team?.length ?
        <>
        <div className="welcome_bar">
            <h4 className="welcome_text">
                Cafe Kora Team
            </h4>
            <p className="welcome_ptag">Total Team Members: {team?.length}</p>
            
        </div>

        <div className="display_area">
            <table className="customers_table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Role Description</th>
                    <th>Date Joined</th>

                </tr>
            </thead>

            {
                team.map( team => 
                <tbody key={team.email}>
                    <tr>
                        <td>{team.fname}</td>
                        <td>{team.lname}</td>
                        <td>{team.email}</td>
                        <td>{team.phone}</td>
                        <td>{team.phone}</td>
                        <td>{team.datejoined.toDate().toDateString()}</td>
                    </tr>
                </tbody>    
                )
        
            }
            </table>
        </div> 
        </>
            :
            <p className="welcome_ptag">0 Team Members :B</p>
        }
           

        </>

    )
}