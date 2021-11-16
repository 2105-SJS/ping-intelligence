import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    product:{
        fontSize:'35px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'white'
    },
    page:{
        display:'flex',
        flexFlow:'column',
        alignItems:'center'
    }

})

const ProductsAll = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
{
    const classes =useStyles()
    return products
        ? 
            <div className = {classes.page}>
            <Typography className={classes.product}>Tycoon Cars</Typography>
                { currentUser && currentUser.admin === true ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
              
                <Grid container>
                {
                    products.map((product) => (
                    <Grid key={product.productId} item xs={12} sm={6} md={4} lg={3}>
                    <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }  cart = { cart } getCart = { getCart }/>
                    </Grid>))
                }
                </Grid>
            </div>
        : 'Loading Product...'
};

export default ProductsAll;