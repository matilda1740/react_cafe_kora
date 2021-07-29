import React, { useEffect, useState  }  from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

// import { useStateValue } from './Components/StateProvider';
import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Breads from './components/Breads';
import Pastries from './components/Pastries';
import Register from './components/Register';

export default function App(){

  return (
    <Router> 
    <section className='app'>
        <AuthProvider>

      <Header/>
        <section className="main_page_section">
        <Switch> 
          <Route 
            exact path="/" 
            render={() => (
            <HomePage/>
            )} 
          />     
          <Route exact path="/breads" component={Breads} />
          <Route exact path="/pastries" component={Pastries} />
          <Route exact path="/login" component={Login} />        
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/wishlist" component={} /> */}
          <Route exact path="*" component={Error} />

        </Switch>

        </section>
        </AuthProvider>

    </section>
    </Router>

  )
}



