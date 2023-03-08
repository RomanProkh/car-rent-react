import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectDisplayElem, setDisplayElem, setDisplayOrderNav} from "../store/order";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "querystring";
import store from "../store";
import axios from "axios";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Formik} from "formik";
import * as yup from "yup";

const SignUp = () => {

    // Displaying template element selector
    const displaySelector = useSelector(selectDisplayElem)

    // Url query parameters
    const {search} = useLocation()
    const query = queryString.parse(search.substring(1))

    let history = useHistory()

    // Function displays template element by given name
    useEffect(() => {

        store.dispatch(setDisplayOrderNav(false));

        store.dispatch(setDisplayElem(query.display))

    }, [query.display]);


    // Form validation scheme
    const schema = yup.object().shape({

        userName: yup.string()
            .min(5, 'Must be at least 5 characters')
            .max(20, 'Must be less  than 20 characters')
            .required('Username is required')
            .test('Unique username', 'Username already in use', // <- key, message
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get("http://localhost:8081/api/usernames/?username=" + value)
                            .then((res) => {
                                //console.log(res)
                                if (res.data.username) resolve(false)
                                else resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "The username has already been taken.") {
                                    resolve(true);
                                }
                            })
                    })
                }
            ),
        email: yup.string()
            .min(5, 'Must be at least 5 characters')
            .max(30, 'Must be less than 30 characters')
            .required('Email is required')
            .test('Unique email', 'Email already in use', // <- key, message
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get("http://localhost:8081/api/usernames/?email=" + value)
                            .then((res) => {
                                //console.log(res)
                                if (res.data.email) resolve(false)
                                else resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "The email has already been taken.") {
                                    resolve(true);
                                }
                            })
                    })
                }
            )
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
                message: 'Email is not valid',
                name: 'email',
                excludeEmptyString: true,
            }),
        password: yup.string()
            .required()
            .min(5, 'Must be at least 5 characters')
            .max(30, 'Must be less than 30 characters'),

        // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });

    return (

        <div className="signUp">
            {displaySelector == null && <div className="">

                <h2>Rekisteröinti</h2>
                <Formik
                    validationSchema={schema}

                    initialValues={{
                        userName: '',
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        homeAddress: '',
                        city: '',
                        postalCode: ''
                    }}

                    onSubmit={(values, {setSubmitting, resetForm}) => {

                        axios.post('/api/signup/', values)
                            .then(response => {
                                console.log(response)
                                if (response.status === 202) {
                                    console.log("Response 200 OK!")
                                    resetForm({values: ''})
                                    history.push('/SignUp?display=confirm')
                                }
                            })
                            .catch(error =>
                                console.log(error))

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
                          resetForm,
                          setFieldValue
                      }) => (
                        <Form className="" name="vehicleSearch" noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Label>Tilin tiedot:</Form.Label>
                            </Form.Row>
                            <Form.Row className="mb-3 mt-2">
                                <Form.Group as={Col} md="5" controlId="formBasicEmail">
                                    <Form.Label>Sähköpostiosoite:</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="formBasicPassword">
                                    <Form.Label>Salasana:</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="formBasicUserName">
                                    <Form.Label>Käyttäjätunnus:</Form.Label>
                                    <Form.Control
                                        name="userName"
                                        type="text"
                                        value={values.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.userName && !errors.userName}
                                        isInvalid={!!errors.userName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Label>Käyttäjän henkilötiedot:</Form.Label>
                            </Form.Row>
                            <Form.Row className="mb-3 mt-3">
                                <Form.Group as={Col} md="5" controlId="formBasicFirstName">
                                    <Form.Label>Etunimi:</Form.Label>
                                    <Form.Control
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.firstName && !errors.firstName}
                                        isInvalid={!!errors.firstName}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="formBasicLastName">
                                    <Form.Label>Sukunimi:</Form.Label>
                                    <Form.Control
                                        name="lastName"
                                        type="text"
                                        value={values.orderLastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.lastName && !errors.lastName}
                                        isInvalid={!!errors.lastName}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Label>Käyttäjän yhteystiedot:</Form.Label>
                            </Form.Row>
                            <Form.Row className="mb-3 mt-3">
                                <Form.Group as={Col} md="5" controlId="formBasicPhoneNumber">
                                    <Form.Label>Puhelinnumero:</Form.Label>
                                    <Form.Control
                                        name="phoneNumber"
                                        type="text"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.phoneNumber && !errors.phoneNumber}
                                        isInvalid={!!errors.phoneNumber}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mb-3 mt-3">
                                <Form.Group as={Col} md="5" controlId="formBasicHomeAddress">
                                    <Form.Label>Katuosoite:</Form.Label>
                                    <Form.Control
                                        name="homeAddress"
                                        type="text"
                                        value={values.homeAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.homeAddress && !errors.homeAddress}
                                        isInvalid={!!errors.homeAddress}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="formBasicCity">
                                    <Form.Label>Kaupunki:</Form.Label>
                                    <Form.Control
                                        name="city"
                                        type="text"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.city && !errors.city}
                                        isInvalid={!!errors.city}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="formBasicPostalCode">
                                    <Form.Label>Postinumero:</Form.Label>
                                    <Form.Control
                                        name="postalCode"
                                        type="text"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.postalCode && !errors.postalCode}
                                        isInvalid={!!errors.postalCode}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <div id="flexButtons">
                                <Button type="reset" onClick={resetForm}>Tyhjennä</Button>
                                <Button type="submit" disabled={isSubmitting}>Rekisteröydy</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>}

            {/* ------------ Tilauksen kuittaus ------------ */}
            {displaySelector === 'confirm' && <div id="orderConfirmationContainer">
                <h1>Onnistui</h1>
                <p>Käyttäjä lisätty onnistuneesti</p>
                <button onClick={() => history.push('/')}>Pääsivulle</button>

            </div>}
        </div>
    )
}
export default SignUp