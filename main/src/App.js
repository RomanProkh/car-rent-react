import React, { useState} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

import Home from "./components/Home";
import OrderNav from "./components/OrderNav";
import ContactUs from "./components/ContactUs";
import CarResults from "./components/CarResults";
import Order from "./components/Order";

import{useDispatch, useSelector} from 'react-redux';
import {selectDisplayOrderNav} from "./store/order";

const App = () => {
    const displayNav = useSelector(selectDisplayOrderNav)

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="ContactUs">Ota yhteyttä </Link>
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
        </div>
    )
}

export default App