import React from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import IoniconsHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Order from "../../models/order";
import OrderItem from '../../components/shop/OrderItem';


const OrderScreen = (props) => {
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

export default connect(mapStateToProps)(OrderScreen);
