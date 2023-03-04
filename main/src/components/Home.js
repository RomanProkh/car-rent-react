import React from "react";
import SearchForm from "./SearchForm";
import store from "../store";
import {setDisplayOrderNav} from "../store/order";

const Home = () => {

    // Application state
    store.dispatch(setDisplayOrderNav(false));

    return(
        <div className="container">
            <SearchForm />
        </div>
    )
}

export default Home