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

            let updatedOrNewCartItem = {};
            if(state.cartProducts[addedProduct.id]){
                updatedOrNewCartItem = {
                    quantity: state.cartProducts[action.productDetails.id].quantity + 1,
                    price:prodPrice,
                    title:prodTitle,
                    sum: state.cartProducts[addedProduct.id].sum + prodPrice,
                    id: addedProduct.id
                };
            }else{
                updatedOrNewCartItem = {
                    quantity: 1,
                    price:prodPrice,
                    title:prodTitle,
                    sum: prodPrice,
                    id: addedProduct.id
                };
            }
            return {
                ...state,
                cartProducts: {...state.cartProducts,[action.productDetails.id]: updatedOrNewCartItem},
                totalPrice: state.totalPrice + prodPrice
            }
        case DELETE_CART:
            const productDetails = state.cartProducts[action.productId];
            let updatedCartItem = {};

            if(productDetails.quantity > 1){
                updatedCartItem = {
                    quantity: state.cartProducts[productDetails.id].quantity - 1,
                    price:productDetails.price,
                    title:productDetails.title,
                    sum: state.cartProducts[productDetails.id].sum - productDetails.price,
                    id: productDetails.id
                };
                updatedCartItems = {...state.cartProducts,[productDetails.id]: updatedCartItem}
            }else{
                updatedCartItems = { ...state.cartProducts }
                delete updatedCartItems[productDetails.id]
            }
            return {
                ...state,
                cartProducts: updatedCartItems,
                totalPrice: state.totalPrice - productDetails.price
            }
          /*  const addedProduct  = action.productDetails;
            const prodPrice = addedProduct.price;
            const prodTitle  = addedProduct.title;

            if(state.cartProducts[productId]){
                updatedCartItem = {
                    quantity: state.cartProducts[action.productDetails.id].quantity - 1,
                    price:prodPrice,
                    title:prodTitle,
                    sum: state.cartProducts[addedProduct.id].sum - prodPrice,
                    id: addedProduct.id
                };
            }
            return {
                ...state,
                cartProducts: {...state.cartProducts,[action.productDetails.id]: updatedCartItem},
                totalPrice: state.totalPrice - prodPrice
            }*/
            break;
        default:
            return state;
    }

}

export default reducer;
