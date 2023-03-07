import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";
import order from './order'
import user from "./user";

const reducer = combineReducers({
    // add reducers here
    order, user
})

const store = configureStore({
    reducer,
})

export default store