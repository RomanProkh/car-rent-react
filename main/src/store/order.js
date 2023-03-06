import {createSlice} from '@reduxjs/toolkit'
//import {createSelector} from "@reduxjs/toolkit";
//import {useSelector} from "react-redux";

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
            orderVehicleSrc: '',
            orderVehiclePrice: '',
            orderAmount: '',
            orderFirstName: '',
            orderLastName: '',
            orderEmail: '',
            orderPhoneNumber: '',
            orderHomeAddress: '',
            orderPostalCode: '',
            orderPayment: ''

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
        setOrderVehicleSrc: (state, action) =>{
            state.orderParams.orderVehicleSrc = action.payload;
        },
        setOrderVehiclePrice: (state, action) =>{
            state.orderParams.orderVehiclePrice = action.payload;
        },
        setOrderAmount: (state, action) =>{
            state.orderParams.orderAmount = action.payload;
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
        setOrderPhoneNumber: (state, action) =>{
            state.orderParams.orderPhoneNumber = action.payload;
        },
        setOrderHomeAddress: (state, action) =>{
            state.orderParams.orderHomeAddress = action.payload;
        },
        setOrderCity: (state, action) =>{
            state.orderParams.orderCity = action.payload;
        },
        setOrderPostalCode: (state, action) =>{
            state.orderParams.orderPostalCode = action.payload;
        },
        setOrderPayment: (state, action) =>{
            state.orderParams.orderPayment = action.payload;
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
export const { setOrderVehicleSrc } = slice.actions
export const { setOrderVehiclePrice } = slice.actions
export const { setOrderAmount } = slice.actions
export const { setOrderFirstName } = slice.actions
export const { setOrderLastName } = slice.actions
export const { setOrderEmail } = slice.actions
export const { setOrderPhoneNumber } = slice.actions
export const { setOrderHomeAddress } = slice.actions
export const { setOrderPostalCode } = slice.actions
export const { setOrderPayment } = slice.actions
export const { setOrderCity } = slice.actions

// Selectors
export const selectDisplayOrderNav = (state) => state.order.displayOrderNav
export const selectOrderParams = (state) => state.order.orderParams

export default slice.reducer