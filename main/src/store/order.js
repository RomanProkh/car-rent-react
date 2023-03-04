import {createSlice} from '@reduxjs/toolkit'
import {createSelector} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

// Slice
const slice = createSlice({
    name: 'order',
    initialState: {
        displayOrderNav: false,
        orderParams: {
            orderStep: 1,
            orderStart: '',
            orderEnd: '',
            orderStartDate: '',
            orderEndDate: '',
            orderStartTime: '',
            orderEndTime: '',
            orderVehicleId: '',
            orderVehicleType: '',
            orderVehicleModel: '',
            orderFirstName: '',
            orderLastName: '',
            orderEmail: ''
        }
    },
    reducers: {

        setDisplayOrderNav: (state, action) =>{
               state.displayOrderNav = action.payload;
             },
        setOrderStep: (state, action) =>{
            state.orderParams.orderStep = action.payload;
        },
        setOrderStart: (state, action) =>{
            state.orderParams.orderStart = action.payload;
        },
        setOrderEnd: (state, action) =>{
            state.orderParams.orderEnd = action.payload;
        },
        setOrderStartDate: (state, action) =>{
            state.orderParams.orderStartDate = action.payload;
        },
        setOrderEndDate: (state, action) =>{
            state.orderParams.orderEndDate = action.payload;
        },
        setOrderStartTime: (state, action) =>{
            state.orderParams.orderStartTime = action.payload;
        },
        setOrderEndTime: (state, action) =>{
            state.orderParams.orderEndTime = action.payload;
        },
        setOrderVehicleId: (state, action) =>{
            state.orderParams.orderVehicleId = action.payload;
        },
        setOrderVehicleType: (state, action) =>{
            state.orderParams.orderVehicleType = action.payload;
        },
        setOrderVehicleModel: (state, action) =>{
            state.orderParams.orderVehicleModel = action.payload;
        },
        setOrderFirstName: (state, action) =>{
            state.orderParams.orderFirstName = action.payload;
        },
        setOrderLastName: (state, action) =>{
            state.orderParams.orderLastName = action.payload;
        },
        setOrderEmail: (state, action) =>{
            state.orderParams.orderEmail = action.payload;
        },

    },
});

// Setters
export const { setDisplayOrderNav } = slice.actions
export const { setOrderStep } = slice.actions
export const { setOrderStart } = slice.actions
export const { setOrderEnd } = slice.actions
export const { setOrderStartDate } = slice.actions
export const { setOrderEndDate } = slice.actions
export const { setOrderStartTime } = slice.actions
export const { setOrderEndTime } = slice.actions
export const { setOrderVehicleId } = slice.actions
export const { setOrderVehicleType } = slice.actions
export const { setOrderVehicleModel } = slice.actions
export const { setOrderFirstName } = slice.actions
export const { setOrderLastName } = slice.actions
export const { setOrderEmail } = slice.actions

// Selectors
export const selectDisplayOrderNav = (state) => state.order.displayOrderNav
export const selectOrderParams = (state) => state.order.orderParams
// export const selectOrderStartDate = (state) => state.order.orderParams.orderStartDate
// export const selectOrderEndDate = (state) => state.order.orderParams.orderEndDate
// export const selectOrderStartTime = (state) => state.order.orderParams.orderStartTime
// export const selectOrderVehicleType = (state) => state.order.orderParams.orderVehicleType
// export const selectOrderVehicleModel = (state) => state.order.orderParams.orderVehicleModel
// export const selectOrderFirstName = (state) => state.order.orderParams.orderFirstName
// export const selectOrderLastName = (state) => state.order.orderParams.orderLastName
// export const selectOrderEmail = (state) => state.order.orderParams.orderEmail

export default slice.reducer

        //     // Order data setters
        //     SET_ORDER_STEP: (state, action) => {
        //       state.orderStep = action.payload;
        //     },
        //     SET_ORDER_START: (state, action) => {
        //       state.order.orderStart = action.payload;
        //     },
        //     SET_ORDER_END: (state, action) => {
        //       state.order.orderEnd = action.payload;
        //     },
        //     SET_ORDER_START_DATE: (state, action) => {
        //       state.order.orderStartDate = action.payload;
        //     },
        //     SET_ORDER_END_DATE: (state, action) => {
        //       state.order.orderEndDate = action.payload;
        //     },
        //     SET_ORDER_START_TIME: (state, action) => {
        //       state.order.orderStartTime = action.payload;
        //     },
        //     SET_ORDER_END_TIME: (state, action) => {
        //       state.order.orderEndTime = action.payload;
        //     },
        //     SET_ORDER_VEHICLE_ID: (state, action) => {
        //       state.order.vehicleId = action.payload;
        //     },
        //     SET_ORDER_VEHICLE_TYPE: (state, action) => {
        //       state.order.vehicleType = action.payload;
        //     },
        //     SET_ORDER_VEHICLE_MODEL: (state, action) => {
        //       state.order.vehicleModel = action.payload;
        //     },
        //     SET_ORDER_VEHICLE_SRC: (state, action) => {
        //       state.order.vehicleSrc = action.payload;
        //     },
        //     SET_ORDER_VEHICLE_PRICE: (state, action) => {
        //       state.order.vehiclePrice = action.payload;
        //     },
        //     SET_ORDER_CUSTOMER_ID: (state, action) => {
        //       state.order.customerId = action.payload;
        //     },
        //     SET_ORDER_FIRSTNAME: (state, action) => {
        //       state.order.firstName = action.payload;
        //     },
        //     SET_ORDER_LASTNAME: (state, action) => {
        //       state.order.lastName = action.payload;
        //     },
        //     SET_ORDER_PERSONAL_ID: (state, action) => {
        //       state.order.personalId = action.payload;
        //     },
        //     SET_ORDER_EMAIL: (state, action) => {
        //       state.order.email = action.payload;
        //     },
        //     SET_ORDER_PHONE: (state, action) => {
        //       state.order.phoneNumber = action.payload;
        //     },
        //     SET_ORDER_ADDRESS: (state, action) => {
        //       state.order.homeAddress = action.payload;
        //     },
        //     SET_ORDER_CITY: (state, action) => {
        //       state.order.city = action.payload;
        //     },
        //     SET_ORDER_ZIP: (state, action) => {
        //       state.order.postalCode = action.payload;
        //     },
        //     SET_ORDER_INFO: (state, action) => {
        //       state.order.additionalInfo = action.payload;
        //     },
        //     SET_ORDER_PAYMENT: (state, action) => {
        //       state.order.payment = action.payload;
        //     },
        //     SET_ORDER_AMOUNT: (state, action) => {
        //       state.order.amount = action.payload;
        //     },


// Actions
// const { SET_DISPLAY_ORDER_NAV } = slice.actions
// export const setDisplayOrderNav = ({value}) => async dispatch => {
//     dispatch(SET_DISPLAY_ORDER_NAV({value}))
// }