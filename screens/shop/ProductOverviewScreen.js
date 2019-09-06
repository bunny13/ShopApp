import React,{ useEffect, useState, useCallback } from "react";
import { FlatList, View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { viewProducts } from '../../store/actions/products'; 
import { addToCart } from '../../store/actions/cart'; 
import ProductItem from '../../components/shop/ProductItem';
import IoniconsHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Color';

const ProductOverviewScreen = (props) => {
    const [isLoading, setisLoading] = useState(false);
    const [isRefresh, setIsRefreshing] = useState(false);
    const availableProducts = props.availableProducts;

    const loadingScreenAgain = useCallback(async () => {
        setIsRefreshing(true);
        await props.onViewProducts();
        setIsRefreshing(false);
        console.log("I am here");
    }, [setisLoading]);

    useEffect(() => {
        const reloadComponent = props.navigation.addListener('willFocus', loadingScreenAgain);
        return () => {
            reloadComponent.remove()
        }
    }, [loadingScreenAgain]);

    useEffect(() => {
        setisLoading(true);
        loadingScreenAgain().then(() => {
            setisLoading(false);
        });
    }, []);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',{
            productId: id,
            productTitle: title
        });
    }

    if(isLoading){
        return (
            <View style={{
                'flex': 1,
                'justifyContent': 'center',
                'alignItems': 'center'
            }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if(!isLoading && availableProducts.length === 0){
        return (
            <View style={{
                'flex': 1,
                'justifyContent': 'center',
                'alignItems': 'center'
            }}>
                <Text>No Products! Start adding some :-)</Text>
            </View>
        )
    }

     const listView = (renderData) => {
         return (
            <ProductItem 
                src={renderData.item.imageUrl}
                title={renderData.item.title}
                price={renderData.item.price}
                onSelect={() => {
                    selectItemHandler(renderData.item.id, renderData.item.title)
                }}
                
            >
                <Button 
                    title="Details" 
                    onPress={() => {
                        selectItemHandler(renderData.item.id)
                    }}
                    color={Colors.primary}
                />
                <Button 
                    title="Add to Card" 
                    onPress={props.onAddToCart}
                    color={Colors.primary}
                    onPress={() => {
                        props.onAddToCart(renderData.item)
                     }}
                />
            </ProductItem>
         )
     }
    return (
        <FlatList 
            data = {availableProducts}
            refreshing = {isRefresh}
            onRefresh = {loadingScreenAgain}
            renderItem = {listView}
            keyExtractor={item => item.id}
        />
    )
}

ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Menu" iconName="md-menu" onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title="Cart" iconName="md-cart" onPress={() => navData.navigation.navigate('CartOverview')} />
            </HeaderButtons>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        availableProducts: state.products.availableProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewProducts: () => dispatch(viewProducts()),
        onAddToCart: (productId) => dispatch(addToCart(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewScreen);
