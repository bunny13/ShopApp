import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect } from "react-redux";
import { updateProduct, createProduct } from "../../store/actions/products";

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Color';

const styles = StyleSheet.create({
    formControl:{
        width:"100%"
    },
    label:{
        fontSize: 16,
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    form:{
        margin:20
    }
});

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');
    const [isLoading, setIsLoading] = useState(false);

    const editProduct = props.userProducts.userProducts.find(prod => prod.id === prodId);

    const [title, setTitle] = useState(editProduct ? editProduct.title : "");
    const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imageUrl : "");
    const [price, setPrice] = useState(editProduct ? editProduct.price : "");
    const [description, setDescription] = useState(editProduct ? editProduct.description : "");

    const submitHandler = useCallback( async () => {
        const prodData = {
            'id': prodId,
            'title':title,
            'imageUrl': imageUrl,
            'price': price,
            'description': description
        };
        setIsLoading(true);
        if(editProduct){
            await props.onUpdateProduct(prodData);
        }else{
            await props.onCreateProduct(prodData);
        }
        setIsLoading(false);
        props.navigation.goBack();
    }, [prodId, title, imageUrl, price, description, setIsLoading]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler})
    }, [submitHandler]);

    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:"center","alignItems":"center"}}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        value={title}
                        style={styles.input}
                        onChangeText = {(value) => {
                            setTitle(value);
                        }}
                        />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        value = {imageUrl}
                        style={styles.input}
                        onChangeText = { (value) => {
                            setImageUrl(value);
                        } 
                        }
                    />
                </View>
                {
                    editProduct ? null : <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input}
                            value={price}
                            onChangeText={(value) => {
                                setPrice(value);
                            }}
                        />
                    </View>
                }
                
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={(value) => {
                            setDescription(value);
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: navData.navigation.getParam("productId") ? "Edit Prodcuct" : "Add Product",
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" 
            iconName="md-checkmark" 
            onPress={submitFn} />
        </HeaderButtons>
    )
    };
  };

  const mapStateToProps = (state) => {
    return{
        userProducts: state.products
    }
  }

  const mapDisptachToProps = (dispatch) => {
      return{
            onUpdateProduct:(prodData) => dispatch(updateProduct(prodData)),
            onCreateProduct: (prodData) => dispatch(createProduct(prodData))
      }
  }

export default connect(mapStateToProps, mapDisptachToProps)(EditProductScreen);
