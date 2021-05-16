import API from '../utility/api'
import axios from 'axios'
import * as actionTypes from '../redux/actionTypes'

// This will get data and load to redux store
export const fetchProduct = () => dispatch => {
    dispatch(loading(true));

    axios.get(API)
        .then(response => {
            if (response.status === 200) {
                dispatch(loading(false));
                dispatch(loadProducts(response.data));


            }
            else {
                dispatch(loading(false));
                dispatch(errorMessage(response.status))
            }
        })
        .catch(err => {

            dispatch(loading(false));
            dispatch(errorMessage(err.message))
        })

}

// Load Products to redux store
export const loadProducts = products => {
    return {
        type: actionTypes.LOAD_PRODUCTS,
        payload: products
    }
}


// Loading 
export const loading = bool => {
    return {
        type: actionTypes.LOADING,
        payload: bool
    }

}

// Error Message
export const errorMessage = errMsg => {
    return {
        type: actionTypes.ERROR_MESSAGE,
        payload: {
            errSts: true,
            errMsg: errMsg
        }
    }
}


// Modal Toggle
export const toggleModal = () => {
    return {
        type: actionTypes.TOGGLE_MODAL
    }
}


export const addToCart = product => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: product
    }
}

export const removeFromCart = product => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: product
    }
}




