import React from "react";
import {useSelector} from "react-redux";
import { selectOrderParams} from "../store/order";

const OrderNav = () => {


    // Navigator state parameters
    const orderParams = useSelector(selectOrderParams)
    // const orderStep = useSelector(selectOrderParams).orderStep
    //
    // let isActive = true


// const displayOrderStep = (step) => {
//     //this.isActive = orderStep <= step;
//     return orderParams.orderStep >= step;
// }
    // Convert Date format
    let s = new Date(orderParams.orderStart)
    let e = new Date(orderParams.orderEnd)
    let startDate = s.getDate() + "-" + (s.getMonth()+1) + "-" + s.getFullYear()
    let endDate = e.getDate() + "-" + (e.getMonth()+1) + "-" + e.getFullYear()

    return(
        <div id="navContainer">
            <div className="navStepContainer" >
                <h2>1. Tilauksen päivämäärät</h2>
                {orderParams.orderStep >= 1 && <div className="navStepInfo">
                    <p>Ajoneuvon nouto: {startDate} {orderParams.orderStartTime}</p>
                    <p>Ajoneuvon palautus: {endDate} {orderParams.orderEndTime}</p>
                </div>}
            </div>
            {orderParams.orderStep >= 2 &&  <div className="navStepContainer">
                <h2 style={{ color: orderParams.orderStep === '2' ? 'red': 'black'}}>2. Ajoneuvon valinta</h2>
                {orderParams.orderStep >= 3  && <div className="navStepInfo">
                    <p>Ajoneuvon tyyppi: {orderParams.orderVehicleType}</p>
                    <p>Ajoneuvon malli: {orderParams.orderVehicleModel}</p>
                </div>}
            </div>}
            {!orderParams.orderStep >= 1 && <div className="navStepContainer">
                <h2>2. Ajoneuvon valinta</h2>
            </div>}
            {orderParams.orderStep >= 1 &&<div className="navStepContainer">
                <h2 style={{ color: orderParams.orderStep === '3' ? 'red': 'black'}}>3. Tilaajan tiedot</h2>
                {orderParams.orderStep >= 4  && <div className="navStepInfo">
                    <p>Tilaajan nimi: {orderParams.orderFirstName} {orderParams.orderLastName}</p>
                    <p>Tilaajan e-mail: {orderParams.orderEmail}</p>
                </div>}
            </div>}
            {!orderParams.orderStep >= 1 && <div className="navStepContainer">
                <h2>3. Tilaajan tiedot</h2>
            </div>}
            {orderParams.orderStep >= 1 && <div className="navStepContainer">
                <h2 style={{ color: orderParams.orderStep === '4' ? 'red': 'black'}}>4. Tilauksen yhteenveto</h2>
                {orderParams.orderStep >= 4 && <div className="navStepInfo">
                </div>}
            </div>}
            {!orderParams.orderStep >= 4 && <div className="navStepContainer">
                <h2>4. Tilauksen yhteenveto</h2>
            </div>}
        </div>
    )
}
export default OrderNav