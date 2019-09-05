import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { connect } from 'react-redux';
import Color from "../../constants/Color";
import { Platform } from "@unimodules/core";
import CartItem from "../../components/shop/CartItem";
import { deleteToCart, clearCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const styles=StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowOffset: { width : 0, height: 2},
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5,
    },
    summaryText: {
        fontSize: 18
    },
    amount:{
        color: Color.primary
    }
});

const CartScreen = (props) => {
    const cartTotalAmount = props.totalPrice;
    const transformedCartItems = [];
    if(props.cartProducts !== undefined){
        for (const key in props.cartProducts) {
            transformedCartItems.push({
              id: key,
              title: props.cartProducts[key].title,
              price: props.cartProducts[key].price,
              quantity: props.cartProducts[key].quantity,
              sum: props.cartProducts[key].sum
            });
          }
    }  
    const cartItems = transformedCartItems.sort((a, b) =>
        a.productId > b.productId ? 1 : -1
    );
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
                </Text>
                <Button color={Color.accent} title="Order Now" onPress={() => {
                    props.onClearCart()
                    props.onOrderNow(cartItems, cartTotalAmount)
                    }}/>
            </View>
            <FlatList 
                data = {cartItems}
                keyExtractor = {item => item.id}       
                renderItem = {({item}) => {
                    return (
                        <CartItem 
                            renderData = {item}
                            deletable = {true}
                            onRemoveIcon = {() => {
                                props.onRemoveIcon(item.id);
                            }}
                        />
                    )
                }}       
            /> 
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        cartProducts:state.cart.cartProducts,
        totalPrice:state.cart.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onRemoveIcon: (productId) => dispatch(deleteToCart(productId)),
        onOrderNow: (orderData, totalAmt) => dispatch(addOrder(orderData, totalAmt)),
        onClearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);
