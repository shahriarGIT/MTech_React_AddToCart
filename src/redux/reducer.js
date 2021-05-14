import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    products: [],

    cartItemNo: 0,
    cartItems: [],

    errorStatus: false,
    errorMessage: "",

    loading: false

}


export const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case actionTypes.LOAD_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionTypes.ERROR_MESSAGE:
            return {
                ...state,
                errorStatus: action.payload.errSts,
                errorMsg: action.payload.errMsg
            }
        default:
            return state;
    }




}