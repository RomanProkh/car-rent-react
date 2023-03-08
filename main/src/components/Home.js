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
                <h1>Mikä auto sopii sinulle?</h1>
                <p>On tärkeää löytää juuri sinulle sopiva auto. </p>
                <p>Meiltä löydät autot jokaiseen käyttötarkoitukseen.</p>
                <div className="homePageAllCardsContainer">
                    <div className="homePageSingleCardContainer hvr-grow">
                        <h3>Pakettiauto</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src={require("../assets/cars/ford_transit.jpg")}/>
                        <div className="homePageCardDesc">
                            <p>Alkaen <b>15€/tunti</b></p>
                            <ul>
                                <li>
                                    3 matkustajaa
                                </li>
                                <li>
                                    Tavaratila 7-15 m³
                                </li>
                                <li>
                                    B-luokan ajoneuvo
                                </li>
                            </ul>
                            <button>Lue lisää</button>
                        </div>
                    </div>
                    <div className="homePageSingleCardContainer hvr-grow">
                        <h3 id="redBackground">Henkilöauto</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src={require("../assets/cars/honda_civic.png")}/>
                        <div className="homePageCardDesc">
                            <p>Alkaen <b>7€/tunti</b></p>
                            <ul>
                                <li>
                                    5-7 matkustajaa
                                </li>
                                <li>
                                    Sopii arkikäyttöön
                                </li>
                                <li>
                                    B-luokan ajoneuvo
                                </li>
                            </ul>
                            <button>Lue lisää</button>
                        </div>
                    </div>
                    <div className="homePageSingleCardContainer hvr-grow">
                        <h3>Matkailuauto</h3>
                        <img alt="" className="u-expanded-width u-image u-image-default u-image-1"
                             src={require("../assets/cars/camper_van.png")}/>
                        <div className="homePageCardDesc">
                            <p>Alkaen <b>20€/tunti</b></p>
                            <ul>
                                <li>
                                    5-7 matkustajaa
                                </li>
                                <li>
                                    Sopii matkailuun
                                </li>
                                <li>
                                    M-luokan ajoneuvo
                                </li>
                            </ul>
                            <button>Lue lisää</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Home