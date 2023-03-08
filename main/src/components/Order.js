import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    //  selectDisplayOrderNav,
    selectOrderParams, setDisplayOrderNav, setOrderAmount, setOrderCity, setOrderEmail,
    setOrderEnd,
    setOrderEndDate,
    setOrderEndTime, setOrderFirstName, setOrderLastName, setOrderPayment, setOrderPhoneNumber, setOrderPostalCode,
    setOrderStart,
    setOrderStartDate,
    setOrderStartTime,
    setOrderStep, setOrderHomeAddress,
    setOrderVehicleId,
    setOrderVehicleModel, setOrderVehiclePrice,
    setOrderVehicleSrc,
    setOrderVehicleType
} from "../store/order";
import {useHistory, useLocation} from "react-router-dom";
import queryString from "querystring";
import store from "../store";
import axios from "axios";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useFormik, Field, Formik} from "formik";
import * as Yup from "yup";

const Order = () => {

    // Application state getter
    const orderParams = useSelector(selectOrderParams)


    // Url query parameters
    const {search} = useLocation()
    const query = queryString.parse(search.substring(1))

    let history = useHistory()

    const [vehicle, setVehicle] = useState([]);

    // Fetching vehicles listing data
    useEffect(() => {

        store.dispatch(setOrderStep(query.orderStep))
        store.dispatch(setDisplayOrderNav(false));

        if (query.orderStep !== '5') {
            let orderStart = new Date(query.orderStartDate.toString() + "T" + query.orderStartTime.toString());
            let orderEnd = new Date(query.orderEndDate.toString() + "T" + query.orderEndTime.toString());

            // Method returns vehicle's data by id
            const vehicleData = async (vehicleId) => {
                await axios
                    .get("/api/car/" + vehicleId)
                    .then((res) => {

                        setVehicle(res.data);
                        store.dispatch(setOrderVehicleSrc(res.data[0].Vehicle_src))
                        store.dispatch(setOrderVehicleId(res.data[0].Vehicle_id))
                        store.dispatch(setOrderVehicleType(res.data[0].Type_name))
                        store.dispatch(setOrderVehicleModel(res.data[0].Vehicle_model))

                        store.dispatch(setOrderVehiclePrice(res.data[0].Price))
                        store.dispatch(setOrderAmount(res.data[0].Price * getOrderDuration()))

                    })
                    .catch((err) => console.log(err));
            }

            vehicleData(query.vehicleId).catch(console.error)

            // Saving parameters into store
            //this.checkDates();
            store.dispatch(setDisplayOrderNav(true));
            store.dispatch(setOrderStart(orderStart.toString()))
            store.dispatch(setOrderEnd(orderEnd.toString()))
            store.dispatch(setOrderStartDate(query.orderStartDate))
            store.dispatch(setOrderEndDate(query.orderEndDate))
            store.dispatch(setOrderStartTime(query.orderStartTime))
            store.dispatch(setOrderEndTime(query.orderEndTime))
            store.dispatch(setOrderVehicleId(query.vehicleId))
            store.dispatch(setOrderFirstName(query.orderFirstName))
            store.dispatch(setOrderLastName(query.orderLastName))
            store.dispatch(setOrderEmail(query.orderEmail))
            store.dispatch(setOrderPhoneNumber(query.orderPhoneNumber))
            store.dispatch(setOrderHomeAddress(query.orderHomeAddress))
            store.dispatch(setOrderCity(query.orderCity))
            store.dispatch(setOrderPostalCode(query.orderPostalCode))
            store.dispatch(setOrderPayment(query.orderPayment))


        }

        // if(query.orderStep === '4'){
        //     getOrderSummary();
        // }

    }, [query.orderStart, query.orderEnd, query.type, query.orderStartDate, query.orderEndDate, query.orderStartTime, query.orderEndTime, query.vehicleId, query.orderStep]);

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
            if(query.orderStep !== '5') history.push('/');
        }
        return orderTime / 3600000;
    }

    // Method placing new order to database and sending confirmation email to a given e-mail
    const sendOrder = async (order) => {

        let date = new Date();
        let today = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        await axios.post('/api/orders/', {

            First_name: order.orderFirstName,
            Last_name: order.orderLastName,
            Email: order.orderEmail,
            Phone_Number: order.orderPhoneNumber,
            Home_address: order.orderHomeAddress,
            City: order.orderCity,
            Postal_code: order.orderPostalCode,
            Payment: order.orderPayment,
            Vehicle_id: orderParams.orderVehicleId,
            Date_create: today,
            Order_start: orderParams.orderStartDate + " " + orderParams.orderStartTime,
            Order_end: orderParams.orderEndDate + " " + orderParams.orderEndTime,
            Amount: orderParams.orderAmount
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("Response 200 OK!");
                    // Redirect to order confirmation
                    // history.push('/order?displayOrderNav=0&orderStep=5');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        // Sending e-mail
        // emailjs.sendForm('contact_service', 'contact_form', this.$refs.form, 'Uz8pDtV00tzV72fx7')
        //     .then((result) => {
        //         console.log('SUCCESS!', result.text);
        //     }, (error) => {
        //         console.log('FAILED...', error.text);
        //     });


    }

    // Form validation

    const yup = require("yup");
        const schema = yup.object().shape({

            orderFirstName: Yup.string().required("Lisää etunimi"),
            orderLastName: Yup.string().required("Lisää sukunimi"),
            orderPhoneNumber: Yup.number().required("Lisää puhelinnumero"),
            orderEmail: Yup.string().required("Lisää sähköpostiosoite"),
            orderHomeAddress: Yup.string().required("Lisää katuosoite"),
            orderCity: Yup.string().required("Lisää kaupunki"),
            orderPostalCode: Yup.number().required("Lisää postinumero"),
});

return (
        <div className="orderViewContainer">

        {/* ------------ Vaihe 2. Ajoneuvon valinta ------------ */}
    {orderParams.orderStep === '3' && <div id="vehicleInfoContainer">
        <span className="vehicleImageContainer">
        {vehicle.map((option, index) => (
                <figure key={option.Vehicle_id}>
            <img src={require("../assets/cars/" + option.Vehicle_src)} alt={option.Vehicle_model}/>
        {/*<figcaption>{option.Vehicle_model}</figcaption>*/}
    </figure>))}
    </span>
    <span className="vehicleDataContainer">
        <h2>{orderParams.orderVehicleModel}</h2>
        <p>{orderParams.orderVehicleType}</p>
        <p>{(orderParams.orderVehiclePrice * getOrderDuration()).toFixed(2)} €</p>
    </span>
    </div>}

        {/* ------------Vaihe 3. Tilaajan tiedot ------------ */}
        {orderParams.orderStep === '3' && <div id="orderFormContainer">
            <h2>Tilaajan tiedot</h2>
        <Formik
            validationSchema={schema}

            initialValues={{
            displayOrderNav: '',
                orderStep: '',
                orderStartDate: '',
                orderEndDate: '',
                orderStartTime: '',
                orderEndTime: '',
                vehicleId: '',
                orderAmount: '',
                orderFirstName: '',
                orderLastName: '',
                orderPhoneNumber: '',
                orderEmail: '',
                orderHomeAddress: '',
                orderCity: '',
                orderPostalCode: '',
                orderAdditionalInfo: '',
                orderPayment: ''
        }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
            sendOrder(values).then(r => history.push('/order?displayOrderNav=0&orderStep=5'))

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
                <Form className="" name="vehicleSearch" action="/order" noValidate onSubmit={handleSubmit}>
                <Form.Control name="displayOrderNav" type="hidden" value="true"/>
                <Form.Control name="orderStep" type="hidden" value="4"/>
                <Form.Control name="orderStartDate" type="hidden" value={orderParams.orderStartDate}/>
            <Form.Control name="orderEndDate" type="hidden" value={orderParams.orderEndDate}/>
            <Form.Control name="orderStartTime" type="hidden" value={orderParams.orderStartTime}/>
            <Form.Control name="orderEndTime" type="hidden" value={orderParams.orderEndTime}/>
            <Form.Control name="vehicleId" type="hidden" value={orderParams.orderVehicleId}/>
            <Form.Control name="orderAmount" type="hidden" value={orderParams.orderAmount}/>

            <Form.Row>
            <Form.Label>Asiakkaan henkilötiedot:</Form.Label>
            </Form.Row>
            <Form.Row className="mb-3 mt-3">
            <Form.Group as={Col} md="5" controlId="formBasicOrderFirsName">
                <Form.Label>Etunimi:</Form.Label>
            <Form.Control
                id="orderFirstName"
                name="orderFirstName"
                type="text"
                value={formik.values.orderFirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              /*  {formik.touched.orderFirstName && formik.errors.orderFirstName ? <p>{formik.errors.orderFirstName}</p> : null} */
                isValid={touched.orderFirstName && !errors.orderFirstName}
                isInvalid={!!errors.orderFirstName}
                />
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formBasicOrderLastName">
                <Form.Label>Sukunimi:</Form.Label>
            <Form.Control
                id="orderLastName"
                name="orderLastName"
                type="text"
                value={formik.values.orderLastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                /*  {formik.touched.orderLastName && formik.errors.orderLastName ? <p>{formik.errors.orderLastName}</p> : null} */
                  isValid={touched.orderLastName && !errors.orderLastName}
                  isInvalid={!!errors.orderLastName}
                  />
                  </Form.Group>
                  </Form.Row>
                  <Form.Row>
                  <Form.Label>Asiakkaan yhteystiedot:</Form.Label>
              </Form.Row>
              <Form.Row className="mb-3 mt-3">
              <Form.Group as={Col} md="5" controlId="formBasicOrderPhoneNumber">
                  <Form.Label>Puhelinnumero:</Form.Label>
              <Form.Control
                  id="orderPhoneNumber"
                  name="orderPhoneNumber"
                  type="text"
                  value={formik.values.orderPhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /*  {formik.touched.orderPhoneNumber && formik.errors.orderPhoneNumber ? <p>{formik.errors.name}</p> : null} */
                  isValid={touched.orderPhoneNumber && !errors.orderPhoneNumber}
                  isInvalid={!!errors.orderPhoneNumber}
                  />
                  </Form.Group>
                  <Form.Group as={Col} md="5" controlId="formBasicOrderEmail">
                  <Form.Label>Sähköpostiosoite:</Form.Label>
              <Form.Control
                  id="orderEmail"
                  name="orderEmail"
                  type="text"
                  value={formik.values.orderEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /*  {formik.touched.orderEmail && formik.errors.orderEmail ? <p>{formik.errors.orderEmail}</p> : null} */
                  isValid={touched.orderEmail && !errors.orderEmail}
                  isInvalid={!!errors.orderEmail}
                  />
                  </Form.Group>
                  </Form.Row>
                  <Form.Row className="mb-3 mt-3">
              <Form.Group as={Col} md="5" controlId="formBasicOrderHomeAddress">
                  <Form.Label>Katuosoite:</Form.Label>
              <Form.Control
                  id="orderHomeAddress"
                  name="orderHomeAddress"
                  type="text"
                  value={formik.values.orderHomeAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /*  {formik.touched.orderHomeAddress && formik.errors.orderHomeAddress ? <p>{formik.errors.orderHomeAddress}</p> : null} */
                  isValid={touched.orderHomeAddress && !errors.orderHomeAddress}
                  isInvalid={!!errors.orderHomeAddress}
                  />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="formBasicOrderCity">
                  <Form.Label>Kaupunki:</Form.Label>
              <Form.Control
                  id="orderCity"
                  name="orderCity"
                  type="text"
                  value={formik.values.orderCity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /*  {formik.touched.orderHomeAddress && formik.errors.orderHomeAddress ? <p>{formik.errors.orderHomeAddress}</p> : null} */
                  isValid={touched.orderCity && !errors.orderCity}
                  isInvalid={!!errors.orderCity}
                  />
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="formBasicOrderPostalCode">
                  <Form.Label>Postinumero:</Form.Label>
              <Form.Control
                  id="orderPostalCode"
                  name="orderPostalCode"
                  type="text"
                  value={formik.values.orderPostalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /*  {formik.touched.orderHomeAddress && formik.errors.orderHomeAddress ? <p>{formik.errors.orderHomeAddress}</p> : null} */
                  isValid={touched.orderPostalCode && !errors.orderPostalCode}
                  isInvalid={!!errors.orderPostalCode}
                  />
                  </Form.Group>
                  </Form.Row>
                  <Form.Row>
                  <Form.Label>Maksutapa:</Form.Label>
              </Form.Row>
              <Form.Row className="mb-5 mt-5">
              <Form.Group as={Col} md="5" controlId="formBasicOrderPayment">
                  <Form.Label>
                  <Field type="radio" name="orderPayment" value="tilisiirto"/>Tilisiirto
                  </Form.Label>
                  <Form.Label>
                  <Field type="radio" name="orderPayment" value="pankkikortti"/>Pankkikortti
                  </Form.Label>
                  <Form.Label>
                  <Field type="radio" name="orderPayment" value="kateinen"/>Käteinen
                  </Form.Label>
                  </Form.Group>
                  </Form.Row>
                  <Button type="submit" disabled={isSubmitting}>Seuraava</Button>
                  </Form>
              )}
          </Formik>
          </div>}

              {/* ------------Vaihe 4. Tilauksen yhteenveto ------------ */}
            {orderParams.orderStep === '4' && <div id="orderInfoContainer">
                <h1>Tilauksen yhteenveto</h1>
            <div id="orderInfo">
                <h4>Tilauksen tiedot</h4>
            <p>Tilauksen alku: {orderParams.orderStart}</p>
            <p>Tilauksen loppu: {orderParams.orderEnd}</p>
            <p>Tilauksen summa: {orderParams.orderAmount} €</p>
            <p>Tilauksen auton ID: {orderParams.orderVehicleId}</p>
            </div>
            <div id="customerInfo">
                <h4>Tilaajan tiedot</h4>
            <p>Nimi: {orderParams.orderFirstName} {orderParams.orderLastName}</p>
            <p>Sähköpostiosoite: {orderParams.orderEmail}</p>
            <p>Puhelinnumero: {orderParams.orderPhoneNumber}</p>
            <p>Lähiosoite: {orderParams.orderHomeAddress}</p>
            <p>Postitoimipaikka: {orderParams.orderCity}</p>
            <p>Maksutapa: {orderParams.orderPayment}</p>
            </div>
            <button onClick={sendOrder}>Lähetä tilaus</button>
            </div>}
                {/* ------------ Tilauksen kuittaus ------------ */}
                {query.orderStep === '5' && <div id="orderConfirmationContainer">
                    <h1>Order confirmation</h1>

                <button onClick={() => history.push('/')}>Pääsivulle</button>

                </div>}
                    {/* ------------ Order confirmation email form ------------ */}

                    {/*<form ref="form">*/}
                    {/*    <input type="hidden" name="contact_number">*/}
                    {/*        <input type="hidden" name="user_email" value="car.rent.websowellus@gmail.com"/>*/}
                    {/*</form>*/}
                </div>

                )
    }
        export default Order
