import React, {useEffect} from "react";
import SearchForm from "./SearchForm";
import store from "../store";
import {
    setDisplayOrderNav,
    setOrderStep
} from "../store/order";

const Home = () => {

    // Fetching vehicles listing data
    useEffect(() => {

        store.dispatch(setDisplayOrderNav(false))
        store.dispatch(setOrderStep(0))

    }, []);

    return (
        <div className="container" id="homePageBorderContainer">
            <SearchForm/>
            <div className="homePageModelContainer">
                <h1>Model Comparison</h1>
                <p>To find the right model for you, first choose the car you're interested in.</p>
                <p>Then select up to three models to review and easily compare their features.</p>
                <div className="homePageAllCardsContainer">
                    <div className="homePageSingleCardContainer">
                        <h3>Outlander</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src="//images03.nicepage.com/c461c07a441a5d220e8feb1a/e86caee8c8095f8581913c7a/Untitled-1.jpg"/>
                        <div className="homePageCardDesc">
                            <p>Starting at <b>24,000$</b></p>
                            <ul>
                                <li>
                                    5/7 seats
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                            </ul>
                            <button>Learn More</button>
                        </div>
                    </div>
                    <div className="homePageSingleCardContainer">
                        <h3 id="redBackground">Outlander</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src="//images03.nicepage.com/c461c07a441a5d220e8feb1a/e86caee8c8095f8581913c7a/Untitled-1.jpg"/>
                        <div className="homePageCardDesc">
                            <p>Starting at <b>24,000$</b></p>
                            <ul>
                                <li>
                                    5/7 seats
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                            </ul>
                            <button>Learn More</button>
                        </div>
                    </div>
                    <div className="homePageSingleCardContainer">
                        <h3>Outlander</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src="//images03.nicepage.com/c461c07a441a5d220e8feb1a/e86caee8c8095f8581913c7a/Untitled-1.jpg"/>
                        <div className="homePageCardDesc">
                            <p>Starting at <b>24,000$</b></p>
                            <ul>
                                <li>
                                    5/7 seats
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                                <li>
                                    Something else
                                </li>
                            </ul>
                            <button>Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Home