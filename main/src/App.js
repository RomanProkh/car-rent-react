import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link, NavLink
} from 'react-router-dom'

import Home from "./components/Home";
import OrderNav from "./components/NavBar";
import ContactUs from "./components/ContactUs";
import SearchForm from "./components/SearchForm";
import {NavbarBrand} from "react-bootstrap";


const App = () => {

    // Show orderNavigator
    let displayNav = false

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>
                        <NavbarBrand>
                            <img src={require('./logo.png')} id="logo"/>
                        </NavbarBrand>
                        <div>
                            <NavLink to="Home"
                            >Home</NavLink>
                            <NavLink to="ContactUs"
                            >Ota yhteyttä </NavLink>
                        </div>
                        <div>
                            <NavLink to="/SignIn"
                            >Sign In</NavLink>
                            <NavLink to="/SignUP"
                            >Sign Up</NavLink>
                        </div>
                    </nav>
                </div>
                {displayNav && <OrderNav/>}
                <Switch>
                    <Route exact path="/Home">
                        <Home/>
                    </Route>
                    <Route exact path="/ContactUS">
                        <ContactUs/>
                    </Route>
                </Switch>
                <div>
                    <i>Esimerkkivalikko </i>
                    <i>perustuu HY:n fullstackopen-kurssimateriaaliin</i>
                </div>
            </Router>
        </div>
    )
}

export default App
