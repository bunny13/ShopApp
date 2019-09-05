import { VIEW_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from './actionTypes';
import Product from '../../models/product';

export const viewProducts = () => {
    return async dispatch => {
        var response = await fetch("https://rn-guide-854b4.firebaseio.com/products.json");

        var responseData = await response.json();
        const loadedProducts = [];
        
        for(const key in responseData){
            loadedProducts.push(new Product(key,"u1",responseData[key].prodData.title,responseData[key].prodData.imageUrl,responseData[key].prodData.description, responseData[key].prodData.price));
        }

        dispatch({
            type: SET_PRODUCTS,
            prodData: loadedProducts
        })
    }
} 

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = prodData => {
    return async dispatch => {
        //Async Code
        const response = await fetch("https://rn-guide-854b4.firebaseio.com/products.json",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                prodData
            })
        });

        const resData = await response.json();
        prodData.id = resData.name;

        dispatch({
            type: CREATE_PRODUCT,
            prodData: prodData
        })
    }
}

export const updateProduct = prodData => {
    return {
        type: UPDATE_PRODUCT,
        prodData: prodData
    }
}
