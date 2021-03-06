import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Color';
import { deleteProduct } from '../../store/actions/products';
import { connect } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = props.userProducts.userProducts;

  console.log("Testing");
  console.log(userProducts);

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct',{
        productId: id
    });
}

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          src={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button 
            color={Colors.primary} 
            title="Edit" 
            onPress={() => {
              editProductHandler(itemData.item.id)
            }} 
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              props.onDeleteProducts(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Add" 
          iconName="md-create" 
          onPress={() => navData.navigation.navigate('EditProduct')} />
      </HeaderButtons>
  )
  };
};

const mapStateToProps = (state) => {
  return {
    userProducts: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProducts: (productId) => dispatch(deleteProduct(productId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProductsScreen);
