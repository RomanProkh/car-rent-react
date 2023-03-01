import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

import Home from "./components/Home";
import OrderNav from "./components/NavBar";
import ContactUs from "./components/ContactUs";
import SearchForm from "./components/SearchForm";


const App = () => {

    // Show orderNavigator
    let displayNav = false

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>

                        <Link to="/">Home</Link>
                        <Link to="ContactUs">Ota yhteyttä </Link>
                    </nav>
                </div>
                {displayNav && <OrderNav/>}
                <Switch>
                    <Route exact path="/">
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
