import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import Colors from '../../constants/Color';

const styles = StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowOffset: { width : 0, height: 2},
        height:300,
        overflow: "hidden",
        margin:10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5,
    },
    imageContainer: {
        width:'100%',
        height:'60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow:'hidden'
    },
    image: {
        width:'100%',
        height:'100%'    
    },
    details:{
        alignItems: 'center',
        height: '15%'
    },
    title:{
        fontSize: 18,
        marginVertical: 4
    },
    price:{
        fontSize: 14,
        color: '#888'
    },
    action:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:'25%',
        paddingHorizontal: 20
    },
    touchableCmp:{
        borderRadius:10,
        overflow:'hidden'
    }
});


const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <View style={styles.touchableCmp}>
                <TouchableOpacity onPress={props.onViewDetail}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{uri: props.src}}
                        />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>
                            {props.title}
                        </Text>
                        <Text style={styles.price}>
                            {props.price}
                        </Text>
                    </View>
                    <View style={styles.action}>
                        <Button 
                            title="Details" 
                            onPress={props.onViewDetail}
                            color={Colors.primary}
                        />
                        <Button 
                            title="Add to Card" 
                            onPress={props.onAddToCart}
                            color={Colors.primary}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductItem;