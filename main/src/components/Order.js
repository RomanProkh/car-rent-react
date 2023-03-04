import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    selectDisplayOrderNav,
    selectOrderParams, setDisplayOrderNav,
    setOrderEnd,
    setOrderEndDate,
    setOrderEndTime,
    setOrderStart,
    setOrderStartDate,
    setOrderStartTime,
    setOrderStep,
    setOrderVehicleId,
    setOrderVehicleModel, setOrderVehiclePrice,
    setOrderVehicleSrc,
    setOrderVehicleType
} from "../store/order";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "querystring";
import store from "../store";
import axios from "axios";
const Order = () =>{

    // Application state getter
    const orderParams = useSelector(selectOrderParams)


    // Url query parameters
    const { search } = useLocation()
    const query = queryString.parse(search.substring(1))

    let history = useHistory()



    const [vehicle, setVehicle] = useState([]);







    // Fetching vehicles listing data
    useEffect(() => {

        let orderStart = new Date(query.orderStartDate.toString() + "T" + query.orderStartTime.toString());
        let orderEnd = new Date(query.orderEndDate.toString() + "T" + query.orderEndTime.toString());

        // Method returns vehicle's data by id
        const vehicleData = async (vehicleId) => {
            console.log(orderParams.orderVehicleId)
            await axios
                .get("/api/car/" + vehicleId)
                .then((res) => {
                    setVehicle(res.data);
                    store.dispatch(setOrderVehicleSrc(res.data[0].Vehicle_src))
                    store.dispatch(setOrderVehicleId(res.data[0].Vehicle_id))
                    store.dispatch(setOrderVehicleType(res.data[0].Type_name))
                    store.dispatch(setOrderVehicleModel(res.data[0].Vehicle_model))

                    store.dispatch(setOrderVehiclePrice(res.data[0].Price))
                    //this.order.amount =  this.car[0].Price*this.getOrderDuration();

                })
                .catch((err) => console.log(err));
        }
            vehicleData(query.vehicleId).catch(console.error)
            // Fetching vehicle list data



        //let vehicle = vehicleData(1);

        // Saving parameters into store
        //this.checkDates();

        console.log(query.orderStartDate)

        store.dispatch(setDisplayOrderNav(true));
        store.dispatch(setOrderStart(orderStart.toString()))
        store.dispatch(setOrderEnd(orderEnd.toString()))
        store.dispatch(setOrderStartDate(query.orderStartDate))
        store.dispatch(setOrderEndDate(query.orderEndDate))
        store.dispatch(setOrderStartTime(query.orderStartTime))
        store.dispatch(setOrderEndTime(query.orderEndTime))
        store.dispatch(setOrderVehicleId(query.vehicleId))

        store.dispatch(setOrderStep(query.orderStep))


    }, [query.orderStart, query.orderEnd, query.type]);


    return (
        <div className="container">
            <div id="vehicleInfoContainer">
                <span className="vehicleImageContainer">
                    {vehicle.map((option, index) => (
                        <figure>
                            <img src={require("../assets/cars/" + option.Vehicle_src)} alt={option.Vehicle_model}/>
                            <figcaption>{option.Vehicle_model}</figcaption>
                        </figure>))}
                </span>
                <span className="vehicleDataContainer">
                    <h2>{orderParams.orderVehicleModel}</h2>
                    <p>{orderParams.orderVehicleType}{orderParams.orderVehicleSrc}</p>
                    {/*<p>{(option.Price * orderDuration).toFixed(2)} €</p>*/}
                </span>
            </div>
        </div>
    )
}
export default Order