import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Breads from './components/Breads';
import Pastries from './components/Pastries';
import Register from './components/Register';
import AdminHome from './components/adminComponents/AdminHome';
import Role from './components/Role';

export default function App(){

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
          <Route exact path="/breads" component={Breads} />
          <Route exact path="/pastries" component={Pastries} />
          <Route exact path="/admin_or_customer" component={Role} />

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



