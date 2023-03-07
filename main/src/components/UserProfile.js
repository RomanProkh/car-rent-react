import React, {useEffect, useState} from "react";
import axios from "axios";
import store from "../store";
import {
    setOrderAmount,
    setOrderVehicleId,
    setOrderVehicleModel,
    setOrderVehiclePrice,
    setOrderVehicleSrc,
    setOrderVehicleType
} from "../store/order";



const UserProfile = () => {

    const [userData, setUserData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_create: '',
        phone_number: '',
        home_address: '',
        postal_code: '',
        city: ''


    });
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
    const userEmail = JSON.parse(localStorage.getItem('user')).email

    // Fetching vehicles listing data
    useEffect( () => {
       // let userData = {}


         axios.post("/api/user", {email: userEmail}, {headers: {Authorization: 'Bearer: ' + accessToken}})
                .then((res) => {
                    setUserData(res.data[0])
                    console.log(res.data[0])
                })
                .catch((err) => console.log(err));


    }, []);
    return(
        <div>
            <h2>Käyttäjän profiili</h2>
            <p>Käyttäjänimi: {userData.username}</p>
            <p>Nimi: {userData.first_name} {userData.last_name}</p>
            <p>Sähköposti: {userData.email}</p>
            <p>Puhelinnumero: {userData.phone_number}</p>
            <p>Osoite: {userData.home_address}, {userData.postal_code} {userData.city}</p>
        </div>
    )

}
export default UserProfile