import { ADD_CART, DELETE_CART } from "../actions/actionTypes";

const initalState = {
    cartProducts:{},
    totalPrice:0
}

const reducer = (state=initalState, action) => {
    switch(action.type){
        case ADD_CART:
            
            const addedProduct  = action.productDetails;
            const prodPrice = addedProduct.price;
            const prodTitle  = addedProduct.title;

            let updatedCartItem = {};
            if(state.cartProducts[addedProduct.id]){
                updatedCartItem = {
                    quantity: state.cartProducts[action.productDetails.id].quantity + 1,
                    price:prodPrice,
                    title:prodTitle,
                    sum: state.cartProducts[addedProduct.id].sum + prodPrice
                };
            }else{
                updatedCartItem = {
                    quantity: 1,
                    price:prodPrice,
                    title:prodTitle,
                    sum: prodPrice
                };
            }
            return {
                ...state,
                cartProducts: {...state.cartProducts,[action.productDetails.id]: updatedCartItem},
                totalPrice: state.totalPrice + prodPrice
            }
        case DELETE_CART:
        break;
        default:
            return state;
    }

}

export default reducer;