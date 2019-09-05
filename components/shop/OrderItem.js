import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";


const styles = StyleSheet.create({
    orderContainer:{
        margin: 20,
        padding: 10,
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowOffset: { width : 0, height: 2},
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    summary:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 10
    }

});

const OrderItem = (props) => {
    const [showOrderList, setOrderList] = useState(false);
    return (
        <View style={styles.orderContainer}>
            <View style={styles.summary} >
                <Text>{props.totalAmt.toFixed(2)}</Text>
                <Text>{props.orderedDate}</Text>
            </View>
            <Button color={Color.primary} title="Show Details" onPress={() => setOrderList(true)}/>
            { showOrderList && <View>
                {props.items.map(item => {
                    return (
                        <CartItem 
                            key = {item.id}
                            renderData = {item}
                        />
                    )}
                )}
                </View>
            }
        </View>
    )
}

export default OrderItem;
