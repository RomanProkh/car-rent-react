import React from "react";
import SearchForm from "./SearchForm";
import store from "../store";
import {setDisplayOrderNav} from "../store/order";

const Home = () => {
    return (
        <div className="container" id="homePageBorderContainer">

            <SearchForm/>
        </div>

    )

}

export default Home