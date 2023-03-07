import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const initialUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        user: initialUser,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logoutSuccess: (state, action) =>  {
            state.user = null;
            localStorage.removeItem('user')
        },
    },
});
export default slice.reducer
// Actions
export const { loginSuccess, logoutSuccess } = slice.actions
export const login = ({ email, password }) => async dispatch => {
    console.log(email, password)
    try {
        axios.post('http://localhost:8081/api/signin/', { email, password })
            .then(response => {
                //console.log(response)
                if (response.status === 200) {
                    console.log("Response 200 OK!")
                    // set token in cookie
                    // document.cookie = `token=${response.data}`
                    dispatch(loginSuccess(response.data));
                    //console.log(response.data)

                    if (response.data.accessToken !== null) {
                        console.log("User is logged in. ")
                        //console.log(response.data.accessToken)
                        // Setting user login status prop to true
                        //user.loggedIn(true)
                    } else {
                        console.log("User is not logged in")
                        // Setting user login status prop to false
                        //user.loggedIn(false)
                    }


                }
            })
            .catch(error =>
                console.log(error))

    } catch (e) {
        return console.error(e.message);
    }
}
export const logout = () => async dispatch => {
    try {
        // const res = await api.post('/api/auth/logout/')

        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e.message);
    }
}