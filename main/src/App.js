import React from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, NavLink
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
                            <img src={require('./logo_black.png')} alt="logo" id="logo"/>
                        </NavbarBrand>
                        <div>
                            <NavLink to="Home" className="hvr-sweep-to-right"
                            >Home</NavLink>
                            <NavLink to="ContactUs" className="hvr-sweep-to-right"
                            >Ota yhteyttä </NavLink>
                        </div>
                        <div>
                            <NavLink to="/SignIn" className="hvr-buzz-out"
                            >Sign In</NavLink>
                            <NavLink to="/SignUP" className="hvr-buzz-out"
                            >Sign Up</NavLink>
                        </div>
                    </nav>
                    {displayNav && <OrderNav/>}
                </div>

                <Switch>
                    <Route exact path="/Home">
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
