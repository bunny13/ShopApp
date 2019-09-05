import React from "react";
import { createStackNavigator, createDrawerNavigator, createAppContainer }  from 'react-navigation';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Color';
import { Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProductNavigator = createStackNavigator({
    ProductsOverview : {
        screen: ProductOverviewScreen,
        navigationOptions:{
            title:"All Products"
        }
    },
    ProductDetail:{
        screen: ProductDetailsScreen
    },
    CartOverview:{
        screen: CartScreen,
        navigationOptions:{
            title:"All Products"
        }
    }
},  {
        defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

const OrderNavigator = createStackNavigator({
        Orders: {
            screen: OrderScreen,
            navigationOptions:{
                title:"Your Orders"
            }
        },
    },{
        defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    }
});

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
            />
        )
        },
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: Colors.primary
            },
            headerTintColor: 'white'
        }
    }
    );

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrderNavigator,
    Admin:AdminNavigator
},{
    contentOptions: {
        activeTintColor: Colors.primary,
  }
})

export default createAppContainer(ShopNavigator);
