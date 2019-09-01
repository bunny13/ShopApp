import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { viewProducts } from '../../store/actions/products'; 
import { addToCart } from '../../store/actions/cart'; 
import ProductItem from '../../components/shop/ProductItem';
import IoniconsHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems : 'center',
        width:'100%'
    }
});

const ProductOverviewScreen = (props) => {
    const availableProducts = props.availableProducts;
     const listView = (renderData) => {
         return (
            <ProductItem 
                src={renderData.item.imageUrl}
                title={renderData.item.title}
                price={renderData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate('ProductDetail',{
                        productId: renderData.item.id
                    });
                }}
                onAddToCart={() => {
                   props.onAddToCart(renderData.item)
                }}
            />
         )
     }
    return (
        <FlatList 
            data = {availableProducts}
            renderItem = {listView}
            keyExtractor={item => item.id}
        />
    )
}

ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Cart" iconName="md-cart" onPress={() => navData.navigation.navigate('CartOverview')} />
            </HeaderButtons>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        availableProducts: state.product.availableProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewProducts: () => dispatch(viewProducts()),
        onAddToCart: (productId) => dispatch(addToCart(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewScreen);