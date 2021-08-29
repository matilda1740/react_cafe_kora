import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { storage } from "./components/firebase"

import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Breads from './components/Breads';
import Pastries from './components/Pastries';
import Register from './components/Register';
import AdminHome from './components/adminComponents/AdminHome';
import Role from './components/Role';
import AddProducts from './components/adminComponents/AddProducts';
import Profile from './components/Profile';
import Update from './components/adminComponents/Update';
import { useStateValue } from './components/StateProvider';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AllProducts from './components/AllProducts';


export default function App(){
    const [ { users, products }, dispatch] = useStateValue();
    const [ allProducts, setAllProducts] = useStateValue();

    const loadProducts = async () => {
        dispatch({
            type: "fetch_products"
        })       
    }

    const loadUsers = async () => {
        dispatch({
            type: "fetch_users"
        })       
    }

    const addToCart = (targetID) => {
        dispatch({
            type: "add_to_cart",
            targetID
        })   
    }


    useEffect(() => {
        loadUsers()
        loadProducts().then( () => setAllProducts(products))
    }, []) 
  return (

    <Router> 
    <section className='app'>
      <AuthProvider>
        <Switch> 
          <>
          <Route path="/admin" component={AdminHome} />
          {/* <Route exact path="/admin/add_products" component={AddProducts} /> */}

          <section className="main_page_section">
          <Header/>

          <Route exact path="/" component={HomePage} />   
          <Route 
                  exact path="/products" 
                  render={() => ( <AllProducts products={allProducts} />
                  )} 
                />              
          <Route exact path="/breads" component={Breads} />
          <Route exact path="/pastries" component={Pastries} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />

          {/* <Route exact path="/profile" component={Profile} />   */}
          <Route exact path="/profile/:id" component={Profile} />  

          <Route exact path="/login" component={Login} />        
          <Route exact path="/register" component={Register} /> 
        </section>
          </>

        </Switch>
        </AuthProvider>
    </section>
    </Router>

  )
}



