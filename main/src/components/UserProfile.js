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
import user, {logout} from "../store/user";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";



const UserProfile = () => {

    let history = useHistory()

    const { user } = useSelector(state => state.user)

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




    // Fetching vehicles listing data
    useEffect( () => {
        console.log(user)

        if(user){
        const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
        const userEmail = JSON.parse(localStorage.getItem('user')).email

         axios.post("/api/user", {email: userEmail}, {headers: {Authorization: 'Bearer: ' + accessToken}})
                .then((res) => {
                    setUserData(res.data[0])
                    console.log(res.data[0])
                })
                .catch((err) => console.log(err));
        }

    }, [user]);

    if (!user) {
        return (
            <div>
                Olet kirjauttunut ulos!
                <button onClick={() => history.push('/SignIn')}>Kirjaudu sisään</button>
                <button onClick={() => history.push('/')}>Pääsivulle</button>
            </div>
        )
    }
    return(

        <div>
            <h2>Käyttäjän profiili</h2>
                <div>
                <p>Käyttäjänimi: {userData.username}</p>
                <p>Nimi: {userData.first_name} {userData.last_name}</p>
                <p>Sähköposti: {userData.email}</p>
                <p>Puhelinnumero: {userData.phone_number}</p>
                <p>Osoite: {userData.home_address}, {userData.postal_code} {userData.city}</p>
            </div>
        </div>
    )

}
export default UserProfile