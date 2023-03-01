import React, {useEffect, useState} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from 'yup';

const SearchForm = () => {

    // Vehicle search form handlers & setters
    const [validated, setValidated] = useState(false);


    // let [formErrors, setFormErrors] = useState({
    //     missingOrderStartDate: '',
    //     missingOrderStartTime: '',
    //     missingOrderEndDate: '',
    //     missingOrderEndTime: '',
    //     toEarlyStartTime: ''
    // });

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



    return (
        /* Vehicle search form by type, date and time */
        <div id="searchFormContainer">
            <h2>Syötä päivämääräväli</h2>
            <Formik
                validationSchema={schema}

                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                onSubmit={(values, { setSubmitting , resetForm}) => {

                    console.log(values)
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
                    <Form name="vehicleSearch" action="/car-results" noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicVehicleType">
                            <Form.Label>Ajoneuvon tyyppi:</Form.Label>
                            <Form.Control as="select"
                                          name="vehicleType"
                                          onChange = {handleChange}
                                          onBlur = {handleBlur}
                                          isValid = {!errors.vehicleType}
                                          isInvalid={!!errors.vehicleType}>
                                {vehicleTypes.map((option, index) => (
                                    <option key={option.Type_id} value={option.Type_id}>{option.Type_name}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.vehicleType}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicOrderStart">
                            <Form.Label>Ajoneuvon nouto:</Form.Label>
                            <Form.Control
                                name="orderStart"
                                type="datetime-local"
                                value = {values.orderStart}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                isValid = {touched.orderStart && !errors.orderStart}
                                isInvalid={!!errors.orderStart}
                                //size="lg"
                            />
                            <Form.Control.Feedback type="invalid">{errors.orderStart}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicOrderStart">
                            <Form.Label>Ajoneuvon palautus:</Form.Label>
                            <Form.Control
                                name="orderEnd"
                                type="datetime-local"
                                value = {values.orderEnd}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                isValid = {touched.orderEnd && !errors.orderEnd}
                                isInvalid={!!errors.orderEnd}
                                //size="lg"
                            />
                            <Form.Control.Feedback type="invalid">{errors.orderEnd}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchForm