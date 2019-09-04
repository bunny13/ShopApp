import React from "react";
import { Text, View, TouchableOpacity, StyleSheet,Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        flexDirection:"row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    itemData:{
        flexDirection: "row",
        alignItems: "center"
    },
    quantity:{
        fontSize: 16,
        color: "#888"
    },
    title:{
        fontSize: 16
    },
    sum:{
        fontSize: 16
    },
    deleteButton:{
        marginLeft: 20
    }   
});

const CartItem = (props) => {   
    return (
        <View style={styles.cartItem}> 
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>
                    {props.renderData.quantity}
                </Text>
                <Text>
                    {" "}
                </Text>
                <Text style={styles.title}>
                    {props.renderData.title}
                </Text> 
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.sum}>
                    ${props.renderData.sum}
                </Text>
                <TouchableOpacity style={styles.deleteButton} onPress={props.onRemoveIcon}>
                    <Ionicons 
                        name={Platform.OS == "android" ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};


export default CartItem;