import React from "react";
import PRODUCTS from  "../../dummy-data/products";
 
const initalState =  {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const reducer = (state = initalState, action) => {
    return state;
}

export default reducer;