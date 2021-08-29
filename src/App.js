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
import Account from './components/Account';


export default function App(){
    const [ { users, products,orders}, dispatch] = useStateValue();
    const [ allProducts, setAllProducts] = useStateValue();

    const loadUsers = async () => {
        dispatch({
            type: "fetch_users"
        })       
    }
    const loadProducts = async () => {
        dispatch({
            type: "fetch_products"
        })       
    }
    const loadOrders = async () => {
        dispatch({
            type: "fetch_orders"
        })       
    }

    const increaseQty = (product) => {
        dispatch({
        type: "increase_qty",
        item: product
        })
    }
    const decreaseQty = (product) => {
        dispatch({
        type: "decrease_qty",
        item: product
        })
    }  

    useEffect(() => {
        loadUsers()
        loadProducts().then( () => setAllProducts(products))
        loadOrders()
    }, []) 
  return (

    <Router> 
    <section className='app'>
      <AuthProvider>
        <Switch> 
          <>
          <Route path="/admin" component={AdminHome} />
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
          <Route exact path="/cart">
            <Cart increaseQty={increaseQty} decreaseQty={decreaseQty}/>
          </Route> 
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/login" component={Login} />        
          <Route exact path="/register" component={Register} /> 

          <Route path="/my_account/:id" component={Account} />  


        </section>
          </>

        </Switch>
        </AuthProvider>
    </section>
    </Router>

  )
}



