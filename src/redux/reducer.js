import CartItem from '../components/Cart/CartItem';
import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    products: [],

    cartItemNo: 0,
    cartItems: [],
    cartLength: 0,

    errorStatus: false,
    errorMessage: "",

    modalOpen: false,

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
        case actionTypes.TOGGLE_MODAL:
            return {
                ...state,
                modalOpen: !state.modalOpen
            }
        case actionTypes.ADD_TO_CART:
            let newObj = action.payload;
            if (state.cartItems.length === 0) {
                newObj.number = 1;
                return {
                    ...state,
                    cartItems: state.cartItems.concat(newObj),
                    cartLength: 1
                }
            }
            else {
                let newObj = action.payload;
                let index = state.cartItems.indexOf(newObj);
                if (index === -1) {
                    newObj.number = 1;
                    return {
                        ...state,
                        cartItems: state.cartItems.concat(newObj),
                        cartLength: state.cartLength + 1
                    }
                }
                else {
                    if (state.cartItems[index].number < 5) {
                        state.cartItems[index].number = state.cartItems[index].number + 1
                    }
                    return {
                        ...state,
                        cartItems: state.cartItems
                    }
                }
            }
        case actionTypes.REMOVE_FROM_CART:
            let exist = state.cartItems.indexOf(action.payload);
            if (exist !== -1) {
                if (state.cartItems[exist].number === 1) {
                    //state.cartItems[exist].number = 0;
                    state.cartItems.splice(exist, 1)
                    state.cartLength = state.cartItems.length;
                    console.log("from remove reducer", state.cartItems);
                    return {
                        ...state,
                        cartItems: state.cartItems
                    }
                }
                else if (state.cartItems[exist].number > 1) {
                    // state.cartItems[exist].number = state.cartItems[exist].number - 1;
                    state.cartItems[exist].number--;
                    return {
                        ...state,
                        //cartItems[exist].number = cartItems[exist].number - 1

                        cartItems: state.cartItems
                    }

                }

            }


        default:
            return state;
    }




}