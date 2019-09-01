import { ADD_CART, DELETE_CART } from './actionTypes';

export const addToCart = (productDetails) => {
    return {
        type: ADD_CART,
        productDetails: productDetails
    }
}

export const deleteToCart = (productId) => {
    return {
        type: DELETE_CART,
        productId: productId
    }
}

