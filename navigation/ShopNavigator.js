import { createStackNavigator, createAppContainer }  from 'react-navigation';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Color';

const ShopNavigator = createStackNavigator({
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

export default createAppContainer(ShopNavigator);