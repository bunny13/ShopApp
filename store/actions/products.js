import { VIEW_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from './actionTypes';
import Product from '../../models/product';

export const viewProducts = () => {
    return async dispatch => {
        var response = await fetch("https://rn-guide-854b4.firebaseio.com/products.json");

        var responseData = await response.json();
        const loadedProducts = [];
        
        for(const key in responseData){
            loadedProducts.push(new Product(key,"u1",responseData[key].title,responseData[key].imageUrl,responseData[key].description, responseData[key].price));
        }

        dispatch({
            type: SET_PRODUCTS,
            prodData: loadedProducts
        })
    }
} 

export const deleteProduct = productId => {
  return async (dispatch) => {

       const response = await fetch(`https://rn-guide-854b4.firebaseio.com/products/${productId}.json`,{
           method:'DELETE'
       });

        dispatch({ 
            type: DELETE_PRODUCT, 
            pid: productId 
        })
    }
};

export const createProduct = prodData => {
    const imageUrl = prodData.imageUrl;
    const title = prodData.title;
    const price = prodData.price;
    const description = prodData.description;
    return async dispatch => {
        //Async Code
        const response = await fetch("https://rn-guide-854b4.firebaseio.com/products.json",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                title,
                imageUrl,
                price,
                description
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
    console.log(prodData);
    return async (dispatch) => {
        var responseData = await fetch(`https://rn-guide-854b4.firebaseio.com/products/${prodData.id}.json`,{
            method: "PUT",
            headers :{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(
                prodData
            )
        });

        var resData = await responseData.json();

        dispatch({
            type: UPDATE_PRODUCT,
            prodData: prodData
        })
    }
}
