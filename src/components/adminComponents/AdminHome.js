import React, { useState } from 'react'
import './AdminHome.css'
import { db } from '../firebase'

import {BusinessCenter, Collections, GroupWork, Home, Inbox, People, Person, ShowChart } from '@material-ui/icons';
import MainDash from './MainDash';
import { Link, Route } from 'react-router-dom';
import ViewCustomers from './ViewCustomers';
import ViewEmployees from './ViewEmployees';



export default function AdminHome() {

    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);


    const getCustomers = async () => {
        const customersRef = db.collection('customer')
        const snapshot = await customersRef.get()

        if(snapshot.empty){
            console.log("No Customer Data Found!")
        }else {
            let myArray = []
            snapshot.forEach( user => {
                myArray.push(user.data())
            })
            setUsers(myArray)
        }     
    }

    const getTeam = async () => {
        const AdminRef = db.collection('admin')
        const snapshot = await AdminRef.get()

        if(snapshot.empty){
            console.log("No Admins Data Found!")
        }else {
            let myArray = []
            snapshot.forEach( user => {
                myArray.push(user.data())
            })
            setTeam(myArray)
        }     
    }

    window.location.pathname === '/admin/customers' && 
        getCustomers();

    window.location.pathname === '/admin/team' && 
        getTeam();

    const handleSelection = (e) => {
        let action = e.target.textContent
        if(action === "Customers"){
            getCustomers();
        }else if(action === "Cafe Kora Team"){
            getTeam();
        }
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

                <p className="sidebar_parts" onClick={handleSelection}>
                    <People className="sidebar_icons"/>
                    <Link to="/admin/customers">Customers</Link>
                </p>

                <p className="sidebar_parts" onClick={handleSelection}>
                    <GroupWork className="sidebar_icons"/>
                    <Link to="/admin/team">Cafe Kora Team</Link>
                </p>
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Inbox className="sidebar_icons"/>Orders
                </p>

                <p className="sidebar_parts" onClick={handleSelection}>
                    <ShowChart className="sidebar_icons"/>Analytics
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Collections className="sidebar_icons"/>Categories
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <BusinessCenter className="sidebar_icons"/>Employees
                </p>
                
                <p className="sidebar_parts" onClick={handleSelection}>
                    <Person className="sidebar_icons"/>Profile
                </p>
            
            </div>

            </section>

            <div className="dashboard_options_cont">
                {/* PUSH DATA ACCORDING TO THE USER CLICKS */}
                <Route exact path="/admin" component={MainDash} />
                <Route exact path="/admin/customers">
                    <ViewCustomers customers={users}/>
                </Route> 
                <Route exact path="/admin/team">
                    <ViewEmployees team={team}/>
                </Route>                 
            </div>
        </section>
    )
}
