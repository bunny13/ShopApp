import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { connect } from 'react-redux';
import Color from "../../constants/Color";
import { Platform } from "@unimodules/core";
import CartItem from "../../components/shop/CartItem";
import { deleteToCart } from "../../store/actions/cart";

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
    const availableProducts = Object.values(props.cartProducts);
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${props.totalPrice}</Text>
                </Text>
                <Button color={Color.accent} title="Order Now" />
            </View>
            <FlatList 
                data = {availableProducts}
                keyExtractor = {item => item.id}       
                renderItem = {({item}) => {
                    return (
                        <CartItem 
                            renderData = {item}
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
        onRemoveIcon: (productId) => dispatch(deleteToCart(productId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);
