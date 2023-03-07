import React, {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import axios from "axios";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import store from "../store";
import {
    setDisplayOrderNav,
    setOrderVehicleId,
    setOrderStart,
    setOrderEnd,
    setOrderStep, setOrderStartDate, setOrderEndDate, setOrderStartTime, setOrderEndTime, selectOrderParams
} from "../store/order";
import { useSelector} from "react-redux";
const CarResults = () => {

    // Application state getter
    const orderParams = useSelector(selectOrderParams)


    // Url query parameters
    const { search } = useLocation()
    const query = queryString.parse(search.substring(1))

    let history = useHistory()
    const [vehicles, setVehicles] = useState([]);

    // Fetching vehicles listing data
    useEffect(() => {

        let orderStart = new Date(query.orderStartDate + "T" + query.orderStartTime);
        let orderEnd = new Date(query.orderEndDate + "T" + query.orderEndTime);

        // Saving parameters into store

        store.dispatch(setOrderStart(orderStart.toString()))
        store.dispatch(setOrderEnd(orderEnd.toString()))
        store.dispatch(setOrderStartDate(query.orderStartDate))
        store.dispatch(setOrderEndDate(query.orderEndDate))
        store.dispatch(setOrderStartTime(query.orderStartTime))
        store.dispatch(setOrderEndTime(query.orderEndTime))

        store.dispatch(setDisplayOrderNav(true))
        store.dispatch(setOrderStep(query.orderStep))

        // Method for checking order's date & time

        // Fetching vehicle list data
        const vehicleData = async () =>{
        axios
            .get("/api/cars?from=" + query.orderStartDate + " " + query.orderStartTime + "&to=" + query.orderEndDate + " " + query.orderEndTime + "&type="  + query.type)
            .then((res) => {
                setVehicles(res.data)
                // this.orderStartTime = start // Refreshing order information
                // this.orderEndTime = end
            })
            .catch((err) => console.log(err));
        }
        vehicleData().catch(console.error)
    }, [query.orderStart, query.orderEnd, query.type, query.orderStartDate, query.orderEndDate, query.orderStartTime, query.orderEndTime, history]);



    // Method calculates&returns the orders duration
    // If dates are incorrect redirects to start page
    const getOrderDuration = () => {

        let orderStart = query.orderStartDate + "T" + query.orderStartTime;
        let orderEnd = query.orderEndDate + "T" + query.orderEndTime;

        let orderTime;
        if ((Date.parse(orderEnd) - Date.parse(orderStart)) > 0) {
            orderTime = Date.parse(orderEnd) - Date.parse(orderStart);
            //console.log(orderTime)
        } else {
            history.push('/');
        }
        return orderTime / 3600000;
    }


    // Method starts order process
    const makeOrder = (vehicleId) =>{

        // Saving order parameters into application store
        store.dispatch(setDisplayOrderNav(true));
        store.dispatch(setOrderStep(3));
        store.dispatch(setOrderVehicleId(vehicleId))

        history.push('/order?displayOrderNav=true&orderStartDate=' + orderParams.orderStartDate
            + '&orderEndDate=' + orderParams.orderEndDate
            + '&orderStartTime=' + orderParams.orderStartTime
            + '&orderEndTime=' + orderParams.orderEndTime
            + '&vehicleId=' + vehicleId + '&orderStep=3');
        return true;
    }

    return (
        <div className="container">
            <div className="carList">
                <ul className="card">
                    {vehicles.map((option, index) => (
                        <div className="homePageSingleCardContainer hvr-grow" onClick={() => makeOrder(option.Vehicle_id)}>
                            <h4>{option.Vehicle_model}</h4>
                            <img src={require("../assets/cars/" + option.Vehicle_src)} alt={option.Vehicle_model}/>
                            <div className="homePageCardDesc">
                                <p>{option.Vehicle_descr}</p>
                                <ul id="special">
                                    <li>
                                        Hinta/tunti <b>{option.Price} €</b>
                                    </li>
                                    <li>
                                        Kokonaishinta <b>{(option.Price * getOrderDuration()).toFixed(2)} €</b>
                                    </li>
                                </ul>
                            </div>
                            <button>Tilaa</button>
                        </div>))}
                </ul>
            </div>
        </div>
    )
}
export default CarResults