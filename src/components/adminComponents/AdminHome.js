import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom';

import './AdminHome.css'

import { db } from '../firebase'
import { displayUser } from '../../actions/entry';
import {BusinessCenter, Collections, GroupWork, Home, Inbox, Language, People, Person, ShowChart } from '@material-ui/icons';
import MainDash from './MainDash';
import ViewCustomers from './ViewCustomers';
import ViewEmployees from './ViewEmployees';

/*
    1. DELETE USERS
    2. UPDATE USER INFO
    3. SORT USERS
    4. SEARCH USERS
*/
export default function AdminHome() {

    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);

    const getUsers = async () => {
        const customersRef = db.collection('user')
        const snapshot = 
        await customersRef
            .onSnapshot((snapshot) => {
                snapshot.docs.forEach( user => {
                    // ChECK IF USER EXISTS IN STATE
                    const userExists = users.find( person => person.userID === user.data().userID)  
                    const adminExists = team.find( person => person.userID === user.data().userID)                           
                    if(!userExists && !adminExists){
                        user.data().type === 'customer' ?
                            setUsers(prevState => [...prevState, user.data()])
                            :
                            user.data().type === 'admin' &&
                            setTeam(prevState => [...prevState, user.data()])
                    }
                })
                
            }, error =>{
                console.log(error)
            })


    }

    const handleSelection = (e) => {

    }
    return (
        <section className="admin_main_body">
            <section className="admin_sidebar">
            <div className="sidebar_top">
                <img src="images/cafe_kora.png" alt="Logo" />
            </div> 
            
            <div className="sidebar_bottom">
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Home className="sidebar_icons"/>
                    <Link to="/admin">Home</Link>
                </p>

                <p className="sidebar_parts" onClick={getUsers}>
                    <People className="sidebar_icons"/>
                    <Link to="/admin/customers">Customers</Link>
                </p>

                <p className="sidebar_parts" onClick={getUsers}>
                    <GroupWork className="sidebar_icons"/>
                    <Link to="/admin/team">Cafe Kora Team</Link>
                </p>
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Collections className="sidebar_icons"/>
                    <Link to="/admin/products">Products</Link>
                </p>

                <p className="sidebar_parts" onClick={handleSelection}>
                    <ShowChart className="sidebar_icons"/>Analytics
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Inbox className="sidebar_icons"/>Categories
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <BusinessCenter className="sidebar_icons"/>Employees
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Person className="sidebar_icons"/>Profile
                </p>

                <p className="sidebar_parts">
                    <Language className="sidebar_icons"/>
                    <Link to="/">Website Home</Link>
                </p>          
            </div>

            </section>

            <div className="dashboard_options_cont">
                {/* PUSH DATA ACCORDING TO THE USER CLICKS */}
                <Route exact path="/admin" component={MainDash} />
                <Route exact path="/admin/customers">
                    {/* <ViewCustomers customers={displayUser}/> */}

                    <ViewCustomers onClick={getUsers} customers={users}/>
                </Route> 
                <Route exact path="/admin/team">
                    {/* <ViewEmployees /> */}

                    <ViewEmployees onClick={getUsers} team={team}/>
                </Route>                 
            </div>
        </section>
    )
}
