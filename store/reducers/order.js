import React from "react";
import { ADD_ORDER, VIEW_ORDER } from "../actions/actionTypes";
import Order from "../../models/order";

const initalState = {
    order: []
}

const orderReducer = (state=initalState, action) => {
    switch (action.type){
        case ADD_ORDER:
            const orderData = action.orderData;
            const newOrder = new Order(
                new Date().toString(),
                orderData,
                action.totalAmt,
                new Date()
            )
            return {
                ...state,
                order: state.order.concat(newOrder)
            }
        break;
        case VIEW_ORDER:

        break;
        default:
            return state;
    }
}

export default orderReducer;
