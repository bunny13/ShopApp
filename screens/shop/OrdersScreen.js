import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import IoniconsHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Order from "../../models/order";
import { fetchOrder } from "../../store/actions/order";
import OrderItem from '../../components/shop/OrderItem';
import Color from '../../constants/Color';


const OrderScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const reloadComponent = props.navigation.addListener('willFocus', loadOrders);
        return () => {
            reloadComponent.remove()
        }
    }, [loadOrders]);

    const loadOrders = useCallback(async () => {
        console.log("I am inside callback");
        setIsLoading(true);
        await props.onViewOrders();
        setIsLoading(false);
    }, [setIsLoading])

    useEffect(() => {
        loadOrders();
    }, []);

    if (isLoading){
        return (
            <View style={{flex:1, justifyContent: "center", alignContent:"center"}}>
                <ActivityIndicator size="large" color={Color.primary}/>
            </View>
        )
    }
    return (
        <FlatList 
            data = {props.order}
            keyExtractor = {item => item.id}       
            renderItem = {({item}) => {
                return (
                    <OrderItem
                        totalAmt = {item.totalAmt}
                        orderedDate = {item.getDate}
                        items = {item.items}
                    />
                )
            }}       
        /> 
    )
}

OrderScreen.navigationOptions = (navData) => {
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
        order: state.orders.order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewOrders : () => dispatch(fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
