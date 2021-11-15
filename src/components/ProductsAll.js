import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';
import { Grid } from '@material-ui/core';

const ProductsAll = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
{
    return products
        ? <>
            <div className = 'products'>
                { currentUser && currentUser.admin === true ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
              
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }  cart = { cart } getCart = { getCart }/>
                    </Grid>))
                }
                </Grid>
            </div>
        </>
        : 'Loading Product...'
};

export default ProductsAll;