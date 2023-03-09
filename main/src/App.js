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
import {Button, NavbarBrand} from "react-bootstrap";
import {logout} from "./store/user";
import store from "./store";
import UserProfile from "./components/UserProfile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => {

    const displayNav = useSelector(selectDisplayOrderNav)
    const { user } = useSelector(state => state.user)

    return (
        <div className="container">
            <Router>
                <div>
                    <nav>
                        <NavbarBrand>
                            <img src={require('./logo_black.png')} alt="logo" id="logo"/>
                        </NavbarBrand>
                        <div>
                            <NavLink to="/" className="hvr-sweep-to-right"
                            >Home</NavLink>
                            <NavLink to="ContactUs" className="hvr-sweep-to-right"
                            >Ota yhteyttä </NavLink>
                        </div>
                        <div>
                            {user && <NavLink to="/UserProfile" className="hvr-buzz-out">Profiili</NavLink>}
                            {user && <Button onClick={()=> store.dispatch(logout())}>Kirjaudu ulos</Button>}
                            {!user && <NavLink to="/SignIn" className="hvr-buzz-out">Kirjaudu</NavLink>}
                            {!user && <NavLink to="/SignUp" className="hvr-buzz-out">Rekisteröinti</NavLink>}
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
                    <Route exact path="/SignUp">
                        <SignUp/>
                    </Route>
                    <Route exact path="/UserProfile">
                        <UserProfile/>
                    </Route>
                    <Route exact path="/SignIn">
                        <SignIn/>
                    </Route>
                </Switch>
            </Router>
            <Footer/>
        </div>
    )
}

export default App
