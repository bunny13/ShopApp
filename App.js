import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import ShopNavigator from './navigation/ShopNavigator';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders:orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store = {store}>
        <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
