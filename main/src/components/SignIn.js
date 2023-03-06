import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectDisplayElem, setDisplayElem, setDisplayOrderNav} from "../store/order";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "querystring";
import store from "../store";
import axios from "axios";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Formik} from "formik";
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
    const schema = yup.object().shape({});

    return (
        <div className="orderViewContainer">
            {displaySelector == null && <div className="">

                <h2>Käyttäjän sisäänkirjauttuminen</h2>
                <Formik
                    validationSchema={schema}

                    initialValues={{
                        email: '',
                        password: '',
                    }}

                    onSubmit={(values, { setSubmitting , resetForm}) => {

                        axios.post('http://localhost:8081/api/signin', values)
                            .then(response => {
                                //console.log(response)
                                if (response.status === 200) {
                                    console.log("Response 200 OK!")
                                    // set token in cookie
                                    // document.cookie = `token=${response.data}`

                                    let tokenKey='myToken'
                                    localStorage.setItem(tokenKey,
                                        JSON.stringify(response.data))

                                    if(response.data.accessToken !== null){
                                        console.log("User is logged in. " )
                                        console.log(response.data.accessToken)
                                        // Setting user login status prop to true
                                        //user.loggedIn(true)
                                    }else{
                                        console.log("User is not logged in")
                                        // Setting user login status prop to false
                                        //user.loggedIn(false)
                                    }

                                    resetForm()
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
                        <Form className="" name="vehicleSearch"  noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Label>Tilin tiedot:</Form.Label>
                            </Form.Row>

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

                            <Button type="reset" onClick={resetForm}>Tyhjennä</Button><Button type="submit" disabled={isSubmitting}>Kirjaudu</Button>
                        </Form>
                    )}
                </Formik>
            </div>}

            {/* ------------ Tilauksen kuittaus ------------ */}
            {displaySelector === 'confirm' && <div id="orderConfirmationContainer">
                <h1>Onnistui</h1>
                <p>Käyttäjä kirjauttunut sisäsään</p>
                <button onClick={() => history.push('/')}>Pääsivulle</button>

            </div>}
        </div>
    )
}
export default SignUp