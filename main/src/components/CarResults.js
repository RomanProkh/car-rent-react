import React, {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import axios from "axios";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import store from "../store";
import {
    setDisplayOrderNav,
    selectDisplayOrderNav,
    setOrderVehicleId,
    setOrderStart,
    setOrderEnd,
    setOrderStep, setOrderStartDate, setOrderEndDate, setOrderStartTime, setOrderEndTime
} from "../store/order";
import {useDispatch, useSelector} from "react-redux";
const CarResults = () => {

    // Application state getter
    const displayNav = useSelector(selectDisplayOrderNav)


    // Url query parameters
    const { search } = useLocation()
    const query = queryString.parse(search.substring(1))

    let history = useHistory()
    const [vehicles, setVehicles] = useState([]);






    // Fetching vehicles listing data
    useEffect(() => {

        let orderStart = new Date(query.orderStartDate + "T" + query.orderStartTime.toString());
        let orderEnd = new Date(query.orderEndDate + "T" + query.orderEndTime.toString());


        // Saving parameters into store
        //this.checkDates();
        store.dispatch(setOrderStart(query.orderStart))
        store.dispatch(setOrderEnd(query.orderEnd))
        store.dispatch(setOrderStartDate(orderStart.getDate() + "-" + (orderStart.getMonth()+1) + "-" + orderStart.getFullYear()))
        store.dispatch(setOrderEndDate(orderEnd.getDate() + "-" + (orderEnd.getMonth()+1) + "-" + orderEnd.getFullYear()))
        store.dispatch(setOrderStartTime(query.orderStartTime))
        store.dispatch(setOrderEndTime(query.orderEndTime))

        // Fetching vehicle list data
        axios
            .get("/api/cars?from=" + query.orderStartDate + "&to=" + query.orderEndDate + "&type="  + query.type)
            .then((res) => {
                setVehicles(res.data)
                // this.orderStartTime = start // Refreshing order information
                // this.orderEndTime = end
            })
            .catch((err) => console.log(err));
    }, [query.orderStart, query.orderEnd, query.type]);


    // Method for checking order's date & time
    const checkDates = () => {
        let startDate = query.orderStartDate + " " + query.orderStartTime;
        let endDate = query.orderEndDate + " " + query.orderEndTime;

        if (!startDate || !endDate) {
            store.dispatch(setDisplayOrderNav(false)) // Disable order navigator bar
            history.push('/'); // Redirect to the start page
        }
    }
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
        store.dispatch(setOrderStep(1));
        store.dispatch(setOrderVehicleId(vehicleId))

        // history.push('order' + '?displayOrderNav=true&orderStartDate=' + this.$store.state.order.orderStartDate
        //     + '&orderEndDate=' + this.store.state.order.orderEndDate
        //     + '&orderStartTime=' + this.store.state.order.orderStartTime
        //     + '&orderEndTime=' + this.store.state.order.orderEndTime
        //     + '&vehicleId=' + vehicleId + '&orderStep=3');
        return true;
    }

    return (
        <div className="container">
            <div id="carList">
                <ul className="card">
                    {vehicles.map((option, index) => (
                        <li key={option.Vehicle_id}>
                            <figure>
                                <img src={require("../assets/cars/"+ option.Vehicle_src)} alt={option.Vehicle_model}/>
                                <figcaption>{option.Vehicle_model}</figcaption>
                            </figure>
                            <p>{(option.Price * getOrderDuration()).toFixed(2)} €</p>
                            <button onClick={() => makeOrder(option.Vehicle_id)}>Tilaa</button>
                        </li>))}
                </ul>
            </div>
        </div>
    )
}
export default CarResults