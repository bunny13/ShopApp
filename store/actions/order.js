import { ADD_ORDER, VIEW_ORDER } from './actionTypes';
import Order from '../../models/order';

export const fetchOrder = () => {
    return async dispatch => {

        var responseData = await fetch(`https://rn-guide-854b4.firebaseio.com/orders.json`);
        var resData = await responseData.json();
        const loadedOrders = [];
        
        for(const key in resData){
            loadedOrders.push(new Order(key,resData[key].items,resData[key].totalAmt, resData[key].date));
        }
        
        dispatch({
            type: VIEW_ORDER,
            order: loadedOrders
        })
    }
}

export const addOrder = (items, totalAmt) => {
    return async dispatch => {

        var responseData = await fetch(`https://rn-guide-854b4.firebaseio.com/orders.json`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                items,
                totalAmt,
                date: new Date().toISOString()
            })
        });
        var responseData = await responseData.json();
        items.id = responseData.name;
        
        dispatch({
            type: ADD_ORDER,
            orderData: items,
            totalAmt: totalAmt
        })
    }
}
