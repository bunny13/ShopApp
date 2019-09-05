import React from "react";
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import PRODUCTS from '../../dummy-data/products';
import Color from '../../constants/Color';
import { connect } from "react-redux";

const styles= StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    actions:{
        marginVertical: 10,
        alignItems: 'center'
    },
    price:{
        fontSize: 20,
        color: '#888',
        marginVertical:20,
        textAlign: 'center'
    },
    desc:{
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10
    }
});

const ProductDetailsScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = props.availableProducts.find(product => product.id === productId);
    return (
        <ScrollView> 
            <Image style={styles.image}
                source={{uri: selectedProduct.imageUrl}}
            />
            <View style={styles.actions}>
                <Button
                    title="Add to Cart"
                    color={Color.primary}
                />
            </View>
            <Text style={styles.price}>
                {selectedProduct.price}
            </Text>
            <Text style={styles.desc}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    )
}

ProductDetailsScreen.navigationOptions = (navigationData) => {
    const prodTitle = navigationData.navigation.getParam('productTitle');
    return {
        headerTitle: prodTitle
    }
}

const mapStateToProps = (state) => {
    return {
        availableProducts: state.products.availableProducts
    }
}

export default connect(mapStateToProps)(ProductDetailsScreen);
