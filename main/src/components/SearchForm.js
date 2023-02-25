import React, {useEffect, useState} from "react";
import axios from "axios";

const SearchForm = () => {

    // Vehicle search form handlers & setters

    let [formErrors, setFormErrors] = useState({
        missingOrderStartDate: '',
        missingOrderStartTime: '',
        missingOrderEndDate: '',
        missingOrderEndTime: '',
        toEarlyStartTime: ''
    });

    const [vehicleTypes, setVehicleTypes] = useState([]);

    const [orderParam, setOrderParam] = useState({
        orderStartDate: '',
        orderEndDate: '',
        orderStartTime: '',
        orderEndTime: ''

    });
    const handleChange = (event) => {
        setOrderParam({...orderParam, [event.target.name]: event.target.value});
    }


    // Fetching existing vehicle type names data


    useEffect(()=> {
        axios
            .get("http://localhost:8081/api/vehicle_type")
            .then((res) => setVehicleTypes(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Vehicle search form validation
    const checkForm = (event) => {

        let now = Date.now();

        // Setting form errors
        setFormErrors({
            missingOrderStartDate: orderParam.orderStartDate === '' ? 'Anna tilauksen alkupäivämäärä' : null,
            missingOrderStartTime: orderParam.orderStartTime === '' ? 'Anna tilauksen alkuaika' : null,
            missingOrderEndDate: orderParam.orderEndDate === '' ? 'Anna tilauksen loppupäivämäärä' : null,
            missingOrderEndTime: orderParam.orderEndTime === '' ? 'Anna tilauksen loppuaika' : null,
            toEarlyStartTime: (orderParam.orderStartDate !== '' && orderParam.orderStartTime !== '' )&&(Date.parse(orderParam.orderStartDate + " " + orderParam.orderStartTime) < now) ? 'Alkuaika ei voi olla pienempi kun nyt' : null

        })
        event.preventDefault();

    }

    const submitForm = (event) => {
        // Validating form
        if (formErrors.missingOrderStartDate == null
            && formErrors.missingOrderStartTime == null && formErrors.missingOrderEndDate == null
            && formErrors.missingOrderEndTime == null && formErrors.toEarlyStartTime === null) {
            console.log("No form errors found")
            return true;
        }

        event.preventDefault();
    }


    return (
        /* Vehicle search form by type, date and time */
        <div id="searchFormContainer">
            <h2>Syötä päivämääräväli</h2>
            <form onSubmit={checkForm}
                  action="/car-results"
                  method="get"
                  noValidate={true}>
                <div>
                    <div className="formRow">
                        <label htmlFor ="vehicleType">Ajoneuvon tyyppi:</label>
                        <select name="vehicleType">


                            {vehicleTypes.map((option, index) => (

                                <option key={option.Type_id} value={option.Type_id}>{option.Type_name}</option>

                            ))}

                        </select>
                        <div className="formErrorContainer"></div>
                    </div>
                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor ="orderStartDate">Alkupäivämäärä:</label>
                            <input
                                type="date"
                                value={orderParam.orderStartDate}
                                onChange={handleChange}

                                name="orderStartDate"/>
                            <div>
                                {formErrors.missingOrderStartDate}{formErrors.toEarlyStartTime}
                            </div>

                        </div>
                        <div className="formColumn">
                            <label htmlFor ="orderStartTime">Alkuaika:</label>
                            <select
                                value={orderParam.orderStartTime}
                                onChange={handleChange}
                                name="orderStartTime">
                                <option disabled value="">Valitse aika</option>
                                <option>00:00</option>
                                <option>01:00</option>
                                <option>02:00</option>
                                <option>03:00</option>
                                <option>04:00</option>
                                <option>05:00</option>
                                <option>06:00</option>
                                <option>07:00</option>
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                                <option>23:00</option>
                            </select>
                            <div>
                                {formErrors.missingOrderStartTime}
                            </div>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="formColumn">
                            <label htmlFor ="orderEndDate">Loppupäivämäärä:</label>
                            <input
                                type="date"
                                value={orderParam.orderEndDate}
                                onChange={handleChange}
                                id="orderEndDate"
                                name="orderEndDate"/>
                            <div className="formErrorContainer">
                                {formErrors.missingOrderEndDate}
                            </div>
                        </div>
                        <div className="formColumn">
                            <label htmlFor ="orderStartDate">Loppuaika:</label>
                            <select
                                value={orderParam.orderEndTime}
                                onChange={handleChange}
                                name="orderEndTime">
                                <option disabled value="">Valitse aika</option>
                                <option>00:00</option>
                                <option>01:00</option>
                                <option>02:00</option>
                                <option>03:00</option>
                                <option>04:00</option>
                                <option>05:00</option>
                                <option>06:00</option>
                                <option>07:00</option>
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                                <option>23:00</option>
                            </select>
                            <div className="formErrorContainer">
                                {formErrors.missingOrderEndTime}
                            </div>
                        </div>
                    </div>
                    <div className="formRow">
                        <input type="submit" value="Etsi autoja"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm