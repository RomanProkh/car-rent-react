import React, {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import axios from "axios";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import store from "../store";
import {setDisplayOrderNav, selectDisplayOrderNav} from "../store/order";
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
        console.log(query.orderStart)
        axios
            .get("/api/cars?from=" + query.orderStart + "&to=" + query.orderEnd + "&type="  + query.type)
            .then((res) => {
                setVehicles(res.data)
                // this.orderStartTime = start // Refreshing order information
                // this.orderEndTime = end
            })
            .catch((err) => console.log(err));
    }, [query.orderStart, query.orderEnd, query.type]);

    // Method calculates&returns the orders duration
    // If dates are incorrect redirects to start page
    const getOrderDuration = () => {

        let orderStart = query.orderStart.toString();
        let orderEnd = query.orderEnd.toString();

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
        store.dispatch(setDisplayOrderNav(true));

        console.log(vehicleId)
        // this.store.commit('SET_ORDER_VEHICLE_ID', vehicleId);
        //
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