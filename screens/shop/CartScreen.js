import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { connect } from 'react-redux';
import Color from "../../constants/Color";

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
    },
    cartItem:{
        flexDirection:"row"
    }
});

const cartItems = (({renderData}) => {
    console.log("heere");
    console.log(renderData);
    return(
        <View > 
            <Text>
                {renderData.quantity}
            </Text>
            <Text>
                {renderData.title}
            </Text>
            <Text>
                ${renderData.sum}
            </Text>
            <View>
                <Button title="Delete" />
            </View>
        </View>
    )
}); 

const CartScreen = (props) => {
    const availableProducts = props.cartProducts;
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${props.totalPrice}</Text>
                </Text>
                <Button color={Color.accent} title="Order Now" />
            </View>
            <View style={styles.cartItem}>
                <FlatList 
                    data = {Object.keys(availableProducts)}
                    renderItem = {cartItems}  
                    keyExtractor = {item => item.id}            
                />                
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        cartProducts:state.cart.cartProducts,
        totalPrice:state.cart.totalPrice
    }
}

export default connect(mapStateToProps)(CartScreen);