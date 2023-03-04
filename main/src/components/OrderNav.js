import React from "react";
import {useSelector} from "react-redux";
import {selectDisplayOrderNav, selectOrderParams} from "../store/order";

const OrderNav = () => {

    // Navigator state parameters
    const orderParams = useSelector(selectOrderParams)
    const orderStep = useSelector(selectOrderParams).orderStep

    let isActive = true

    const displayOrderStep = (step) => {
        //this.isActive = orderStep <= step;
        return orderParams.orderStep >= step;
    }

    return(
        <div id="navContainer">
            <div className="navStepContainer" >
                <h2>1. Tilauksen päivämäärät</h2>
                {displayOrderStep(1) && <div className="navStepInfo">
                    <p>Ajoneuvon nouto: {orderParams.orderStartDate} {orderParams.orderStartTime}</p>
                    <p>Ajoneuvon palautus: {orderParams.orderEndDate} {orderParams.orderEndTime}</p>
                </div>}
            </div>
            {displayOrderStep(1) && <div className="navStepContainer">
                <h2>2. Ajoneuvon valinta</h2>
                {displayOrderStep(3) && <div className="navStepInfo">
                    <p>Ajoneuvon tyyppi: {orderParams.orderVehicleType}</p>
                    <p>Ajoneuvon malli: {orderParams.orderVehicleModel}</p>
                </div>}
            </div>}
            {!displayOrderStep(1) && <div className="navStepContainer">
                <h2>2. Ajoneuvon valinta</h2>
            </div>}
        </div>
    )
}
export default OrderNav