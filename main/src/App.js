import React, { useState} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link, NavLink
} from 'react-router-dom'

import Home from "./components/Home";
import OrderNav from "./components/OrderNav";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import CarResults from "./components/CarResults";
import Order from "./components/Order";

import{useDispatch, useSelector} from 'react-redux';
import {selectDisplayOrderNav} from "./store/order";
import {NavbarBrand} from "react-bootstrap";

const App = () => {
    const displayNav = useSelector(selectDisplayOrderNav)

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>
                        <NavbarBrand>
                            <img src={require('./logo_black.png')} id="logo"/>
                        </NavbarBrand>
                        <div>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="ContactUs">Ota yhteyttä </NavLink>
                        </div>
                        <div>
                            <NavLink to="/SignIn"
                            >Sign In</NavLink>
                            <NavLink to="/SignUP"
                            >Sign Up</NavLink>
                        </div>
                    </nav>
                    {displayNav && <OrderNav/>}
                </div>

                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/ContactUS">
                        <ContactUs/>
                    </Route>
                    <Route exact path="/car-results">
                        <CarResults/>
                    </Route>
                    <Route exact path="/order">
                        <Order/>
                    </Route>
                </Switch>
            </Router>
            <Footer/>
        </div>
    )
}

export default App