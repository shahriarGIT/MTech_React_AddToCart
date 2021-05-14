import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    products: [],

    cartItemNo: 0,
    cartItems: [],

    errorStatus: false,
    errorMsg: "",

}


export const reducer = (state = INITIAL_STATE, action) => {




    switch (action.type) {


        default:
            return state;
    }




}