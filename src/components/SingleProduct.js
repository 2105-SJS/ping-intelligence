import { Grid, Typography, Card, CardContent, GridList } from '@material-ui/core';
import React, { useState } from 'react';
import { callApi } from '../util';
import NewProduct from './NewProduct';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    productTitle:{
        fontSize:'1rem',
        color:'red'
    },
    products:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'no-wrap',
        flexFlow:'column wrap',
        alignItems:'center',
        height:'350px',
        width:'200px',
        border:'2px solid black'
    },
    // please:{
    //     width:'600px',
    //     display:'flex',
    //     flexDirection:'column',
    //     flexWrap:'wrap',
    //     justifyContent:'center'
        
    // },
    // outbox:{
    //     display:'flex',
    //     flexDirection:'row',
    // }
})

const SingleProduct = ({ product, token, currentUser, fetchProducts, children }) => {

    const [ show, setShow ] = useState( false );
    const classes = useStyles();

    const deleteProduct = async () =>
    {
        await callApi(
        {
            url: `products/${ product.productId }`,
            method: 'DELETE',
            token: token
        } )
        await fetchProducts();
    }

    return product
        ? <Card container className={classes.outbox}>
            <Card className={classes.products} 
            style={{ margin: '1.2rem' }}
        >
            <Typography className={classes.productTitle}>
                {product.title}Ping Intelligence
            </Typography>
            <Typography>Product ID: { product.productId }</Typography>
            <Typography>Product Name: { product.productName }</Typography>
            <Typography>Detail: { product.description }</Typography>
            <Typography>Price: { product.price }</Typography>
            <Typography>Image URL: { product.imageURL }</Typography>
            <Typography>In Stock: { product.inStock ? 'yes' : 'no' }</Typography>
            <Typography>Category: { product.category }</Typography>
            {
                children
            }
            { currentUser && currentUser.admin ? 
                <>
                    <button onClick = { deleteProduct } >Delete Product</button>
                    <button onClick = { () =>
                    {
                        setShow( !show );
                    } }>Edit Product</button>
                    { show ? 
                    <NewProduct token = { token } product = { product } fetchProducts = { fetchProducts }></NewProduct>
                    : null }
                </> 
                : null 
            }
        </Card>
        </Card>
        : 'Loading Single Product...'
}

export default SingleProduct;