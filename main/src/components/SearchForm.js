import React, {useEffect, useState} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from 'yup';
import store from "../store";
import {
    selectOrderParams,
    setOrderEndDate,
    setOrderEndTime,
    setOrderStartDate,
    setOrderStartTime, setOrderVehicleTypeId
} from "../store/order";
import {useSelector} from "react-redux";
import {DATE} from "mysql/lib/protocol/constants/types";

const SearchForm = () => {

    const orderParams = useSelector(selectOrderParams)

    const [vehicleTypes, setVehicleTypes] = useState([]);

    // Fetching existing vehicle type names data


    useEffect(() => {
        axios
            .get("http://localhost:8081/api/vehicle_type")
            .then((res) => setVehicleTypes(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Vehicle search form validation
    // const checkForm = (event) => {
    //
    //     let now = Date.now();
    //
    //     // Setting form errors
    //     setFormErrors({
    //         missingOrderStartDate: orderParam.orderStartDate === '' ? 'Anna tilauksen alkupäivämäärä' : null,
    //         missingOrderStartTime: orderParam.orderStartTime === '' ? 'Anna tilauksen alkuaika' : null,
    //         missingOrderEndDate: orderParam.orderEndDate === '' ? 'Anna tilauksen loppupäivämäärä' : null,
    //         missingOrderEndTime: orderParam.orderEndTime === '' ? 'Anna tilauksen loppuaika' : null,
    //         toEarlyStartTime: (orderParam.orderStartDate !== '' && orderParam.orderStartTime !== '' )&&(Date.parse(orderParam.orderStartDate + " " + orderParam.orderStartTime) < now) ? 'Alkuaika ei voi olla pienempi kun nyt' : null
    //
    //     })
    //     event.preventDefault();
    //
    // }

    // const submitForm = (event) => {
    //     // Validating form
    //     if (formErrors.missingOrderStartDate == null
    //         && formErrors.missingOrderStartTime == null && formErrors.missingOrderEndDate == null
    //         && formErrors.missingOrderEndTime == null && formErrors.toEarlyStartTime === null) {
    //         console.log("No form errors found")
    //         return true;
    //     }
    //
    //     event.preventDefault();
    // }

    // Form validation scheme
    const schema = yup.object().shape({

        // username: yup.string()
        //     .min(5, 'Must be at least 5 characters')
        //     .max(20, 'Must be less  than 20 characters')
        //     .required('Username is required')
        //     .test('Unique username', 'Username already in use', // <- key, message
        //         function (value) {
        //             return new Promise((resolve, reject) => {
        //                 axios.get("http://localhost:8081/api/usernames/?username=" + value)
        //                     .then((res) => {
        //                         //console.log(res)
        //                         if(res.data.username) resolve(false)
        //                         else resolve(true)
        //                     })
        //                     .catch((error) => {
        //                         if (error.response.data.content === "The username has already been taken.") {
        //                             resolve(true);
        //                         }
        //                     })
        //             })
        //         }
        //     ),
        // email: yup.string()
        //     .min(5, 'Must be at least 5 characters')
        //     .max(30, 'Must be less than 30 characters')
        //     .required('Email is required')
        //     .test('Unique email', 'Email already in use', // <- key, message
        //         function (value) {
        //             return new Promise((resolve, reject) => {
        //                 axios.get("http://localhost:8081/api/usernames/?email=" + value)
        //                     .then((res) => {
        //                         //console.log(res)
        //                         if(res.data.email) resolve(false)
        //                         else resolve(true)
        //                     })
        //                     .catch((error) => {
        //                         if (error.response.data.content === "The email has already been taken.") {
        //                             resolve(true);
        //                         }
        //                     })
        //             })
        //         }
        //     )
        //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        //         message: 'Email is not valid',
        //         name: 'email',
        //         excludeEmptyString: true,
        //     }),
        // password: yup.string()
        //     .required()
        //     .min(5, 'Must be at least 5 characters')
        //     .max(30, 'Must be less than 30 characters'),

        // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });

    const currentDate = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-0${new Date().getDate()}`;

    const isTimeBigger = (timeToCompare) => {
        const currentTime = new Date().getHours();
        const newTime = timeToCompare.split(":")[0];
        console.log('currentTime: ' + currentTime + ' orderTime: ' + newTime)
        if (currentTime >= newTime) {
            return true;
        } else {
            return false;
        }
    }


    return (
        /* Vehicle search form by type, date and time */
        <div id="searchFormContainer">
            <h2>Syötä päivämääräväli</h2>
            <Formik
                initialValues={{
                    type: orderParams.orderVehicleTypeId,
                    orderStartDate: orderParams.orderStartDate,
                    orderEndDate: orderParams.orderEndDate,
                    orderStartTime: orderParams.orderStartTime,
                    orderEndTime: orderParams.orderEndTime
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    document.forms["vehicleSearch"].submit()
                    setSubmitting(false);
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors,
                      isSubmitting,
                      resetForm
                  }) => (
                    <Form className="searchForm" name="vehicleSearch" action="/car-results" onSubmit={handleSubmit}>
                        <Form.Control name="displayOrderNav" type="hidden" value="true"/>
                        <Form.Control name="orderStep" type="hidden" value="2"/>

                        <Form.Group className="mb-3" controlId="formBasicVehicleType">
                            <Form.Label>Ajoneuvon tyyppi:</Form.Label>
                            <Form.Control as="select"
                                          name="type"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          isValid={!errors.vehicleType}
                                          isInvalid={!!errors.vehicleType}>
                                {vehicleTypes.map((option, index) => (
                                    <option key={option.Type_id} value={option.Type_id}>{option.Type_name}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.vehicleType}</Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mb-3 mt-3">
                            <Form.Group as={Col} md="6" controlId="formBasicOrderStartDate">
                                <Form.Label>Ajoneuvon noutopäivä:</Form.Label>
                                <Form.Control
                                    name="orderStartDate"
                                    type="date"
                                    min={currentDate}
                                    value={values.orderStartDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.orderStartDate && !errors.orderStartDate}
                                    isInvalid={!!errors.orderStartDate}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="formBasicOrderStartTime">
                                <Form.Label>Ajoneuvon noutoaika</Form.Label>
                                <Form.Control as="select"
                                              name="orderStartTime"
                                              value={values.orderStartTime}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.orderStartTime && !errors.orderStartTime}
                                              isInvalid={!!errors.orderStartTime||values.orderStartDate === currentDate
                                              && isTimeBigger(values.orderStartTime)}>
                                    <option disabled value="">Valitse aika</option>
                                    <option>00:00</option>
                                    <option>1:00</option>
                                    <option>2:00</option>
                                    <option>3:00</option>
                                    <option>4:00</option>
                                    <option>5:00</option>
                                    <option>6:00</option>
                                    <option>7:00</option>
                                    <option>8:00</option>
                                    <option>9:00</option>
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
                                </Form.Control>
                                <Form.Control.Feedback
                                    type="invalid">{errors.orderStartDate}{errors.orderStartTime}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 mt-3">
                            <Form.Group as={Col} md="6" controlId="formBasicOrderEndDate">
                                <Form.Label>Ajoneuvon palautuspäivä:</Form.Label>
                                <Form.Control
                                    name="orderEndDate"
                                    type="date"
                                    value={values.orderEndDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.orderEndDate && !errors.orderEndDate}
                                    isInvalid={!!errors.orderEndDate||values.orderStartDate > values.orderEndDate && touched.orderEndDate}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="formBasicOrderEndTime">
                                <Form.Label>Ajoneuvon palautusaika</Form.Label>
                                <Form.Control as="select"
                                              name="orderEndTime"
                                              value={values.orderEndTime}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              isValid={touched.orderEndTime && !errors.orderEndTime}
                                              isInvalid={!!errors.orderEndTime||values.orderStartTime >=
                                              values.orderEndTime && touched.orderEndTime && values.orderStartDate === values.orderEndDate
                                              || values.orderStartDate > values.orderEndDate && touched.orderEndDate}>
                                    <option disabled value="">Valitse aika</option>
                                    <option>00:00</option>
                                    <option>1:00</option>
                                    <option>2:00</option>
                                    <option>3:00</option>
                                    <option>4:00</option>
                                    <option>5:00</option>
                                    <option>6:00</option>
                                    <option>7:00</option>
                                    <option>8:00</option>
                                    <option>9:00</option>
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
                                </Form.Control>
                                <Form.Control.Feedback
                                    type="invalid">{errors.orderEndDate}{errors.orderEndTime}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" className="hvr-grow" type="submit"
                                disabled={isSubmitting ||!isValid}>Tee
                            tilaus</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchForm