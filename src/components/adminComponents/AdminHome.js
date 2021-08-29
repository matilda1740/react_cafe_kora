import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom';

import './AdminHome.css'

import { db } from '../firebase'
import {BusinessCenter, Collections, GroupWork, Home, Inbox, Language, People, Person, Queue, ShowChart } from '@material-ui/icons';
import MainDash from './MainDash';
import ViewCustomers from './ViewCustomers';
import ViewEmployees from './ViewEmployees';
import ViewProducts from './ViewProducts';
import Update from './Update';
import { useStateValue } from '../StateProvider';

export default function AdminHome() {

    const [ {users, products}, dispatch] = useStateValue();

    const loadProducts = () => {
        dispatch({
            type: "fetch_products"
        })       
    }

    const loadUsers = async () => {
        dispatch({
            type: "fetch_users"
        })       
    }
    useEffect(() => {
        loadUsers()
        loadProducts()
    }, [])    

    return (
        <section className="admin_main_body">
            <section className="admin_sidebar">
                <div className="sidebar_top">
                    <img src="images/cafe_kora.png" alt="Logo" />
                </div> 
                
                <div className="sidebar_bottom">
                    <p className="sidebar_parts">
                        <Home className="sidebar_icons"/>
                        <Link to="/admin">Home</Link>
                    </p>

                    <p className="sidebar_parts">
                        <People className="sidebar_icons"/>
                        <Link to="/admin/customers">Customers</Link>
                    </p>

                    <p className="sidebar_parts">
                        <GroupWork className="sidebar_icons"/>
                        <Link to="/admin/team">Cafe Kora Team</Link>
                    </p>
                    <p className="sidebar_parts">
                        <Collections className="sidebar_icons"/>
                        <Link to="/admin/products">Products</Link>
                    </p>
                    <p className="sidebar_parts">
                        <Queue className="sidebar_icons"/>
                        <Link to="/admin/add_products">Add Products</Link>
                    </p>
                    <p className="sidebar_parts">
                        <ShowChart className="sidebar_icons"/>Analytics
                    </p>
                    
                    <p className="sidebar_parts">
                        <Inbox className="sidebar_icons"/>Categories
                    </p>
                    
                    <p className="sidebar_parts">
                        <BusinessCenter className="sidebar_icons"/>Employees
                    </p>
                    
                    <p className="sidebar_parts">
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
                <Route exact path="/admin">
                    <MainDash/>
                </Route>
                <Route exact path="/admin/customers">
                    <ViewCustomers/>
                </Route> 
                {/* <Route exact path="/admin/customers">
                    <Update />
                </Route>  */}
                <Route exact path="/admin/team">                            
                    <ViewEmployees/>
                </Route>  
                <Route exact path="/admin/products">
                    <ViewProducts />
                </Route>                    
                <Route exact path="/admin/add_products">
                    <Update />
                </Route>      
                <Route exact path="/admin/update_products/:id" component={Update} />
            
            </div>
        </section>
    )
}
