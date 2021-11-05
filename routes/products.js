const express=require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const {JWT_SECRET}=process.env;
const {createUser,getUser,getUserByUsername}=require('../db')
const usersRouter=express.Router();

const createProduct = async (ev) => {
        ev.preventDefault();
        try {
            const response = await callApi({
                url: `products/`,
                method: "POST",
                body: { productId, productName, description, price, imageUrl, inStock, category }
                token
            })
            if (response.error) {
                setError(response.error);
            };
            if (response) {
                await callApi({url: `products`, token
                addProduct: { productId },
                setProductName: { productName },
                setDescription: { description },
                setPrice: { price },
                setImageUrl: { imageUrl },
                setInStock: { inStock },
                setCategory: { category }

                await createProduct;
                history.push('/products/product/:productId'))};
            return response;
        } catch (error) {
            console.error(error);
        }
    }};

     const deleteProducts = async ( productId ) => {
        try {
            await callApi({
                url: `products/:productId${ productId }`, 
                method: "DELETE",
                token            
            })
            await callApi({url: 'products/:productId', token});
            history.push('/product/:productId);
        } catch (error) {
            console.error(error);
        };    
    };