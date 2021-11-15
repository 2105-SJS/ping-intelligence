import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'red',
        borderRadius:'10px',
        border:'5px solid black'
    }

})

const Product = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
{
    const classes = useStyles();
    const params = useParams();
    return products
        ? <>
            <div className = 'products'>
                { currentUser && currentUser.admin ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
                <div className={classes.header}>Products:</div>
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