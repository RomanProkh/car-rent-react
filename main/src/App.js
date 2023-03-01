import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

import Home from "./components/Home";
import OrderNav from "./components/NavBar";
import ContactUs from "./components/ContactUs";


const App = () => {

    // Show orderNavigator
    let displayNav = false

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>
                        <Link to="/">Pääsivu</Link>
                    </nav>
                    <nav>
                        <Link to="ContactUs">Ota yhteyttä </Link>
                    </nav>
                </div>
                {displayNav && <OrderNav/>}
                <Switch>
                    {/*
                    <Route path="/">
                        <Home/>
                    </Route>
                    */}
                    <Route path="/ContactUS">
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
