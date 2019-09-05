import { ADD_ORDER, VIEW_ORDER } from './actionTypes';

export const addOrder = (items, totalAmt) => {
    return {
        type: ADD_ORDER,
        orderData: items,
        totalAmt: totalAmt
    }
}
