import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    header:{
        // display:'flex',
        // // justifyContent:'center',
        // alignItems:'center',
        color:'white',
        // borderRadius:'10px',
        // border:'2px solid black',
        backgroundColor:'#e46400'
    },
    product:{
        fontSize:'24px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }

})

const Product = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
{
    const classes = useStyles();
    const params = useParams();
    return products
        ? <>
            <div className = {classes.header}>
                { currentUser && currentUser.admin ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
                <Typography className={classes.product}>Products:</Typography>
                {
                    products.filter( ( product ) => {
                        return product.productId===Number(params.productId);
                    } )
                    .map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }  cart = { cart } getCart = { getCart }/>)
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Product;