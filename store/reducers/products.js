import PRODUCTS from '../../dummy-data/products';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/actionTypes';
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_PRODUCTS:
        const loadedData = action.prodData;
        return {
            ...state,
            availableProducts:loadedData,
            userProducts:loadedData.filter(prod => prod.ownerId === 'u1')
        }

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
            product => product.id !== action.pid
          ),
      };
      case UPDATE_PRODUCT:
          return {
              ...state,
              userProducts: state.userProducts.map(prod => {
                if(prod.id === action.prodData.id) {
                    return {
                        ...prod,
                        imageUrl: action.prodData.imageUrl,
                        title: action.prodData.title,
                        description: action.prodData.description
                    }
                }
                return prod
              }),
              availableProducts: state.availableProducts.map(prod => {
                if(prod.id === action.prodData.id) {
                    return {
                        ...prod,
                        imageUrl: action.prodData.imageUrl,
                        title: action.prodData.title,
                        description: action.prodData.description
                    }
                }
                return prod
              })
          }
      case CREATE_PRODUCT:
          const newProduct = new Product(
              action.prodData.id,
              "u1",
              action.prodData.title,
              action.prodData.imageUrl,
              action.prodData.description,
              action.prodData.price
          )
          return {
              ...state,
              userProducts:state.userProducts.concat(newProduct),
              availableProducts: state.userProducts.concat(newProduct)
          }
      default:
        return state;
  }
};
