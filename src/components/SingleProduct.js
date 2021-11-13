import { CardContent, CardMedia } from '@material-ui/core';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { callApi } from '../util';
import NewProduct from './NewProduct';
import { Typography, Button, Card, CardActionArea, CardActions} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    carcard:{
        border:'2px solid black'
    },
    button:{
        backgroundColor:'#10ef58'
    },
    carcard:{
        border:'2px solid black'
    }
  })

const SingleProduct = ({ product, token, currentUser, fetchProducts, getCart, cart, children }) => {

    const [ show, setShow ] = useState( false );
    const classes=useStyles();

    const deleteProduct = async () =>
    {
        await callApi(
        {
            url: `products/${ product.productId }`,
            method: 'DELETE',
            token: token
        } );
        await fetchProducts();
    }

    const handleAddtoCart = async () => {
        try {
            if (product && cart) {
                const productId = Number(product.productId)
                if( cart.orderId === undefined ) 
                {
                    await callApi(
                    {
                        url: `orders/`,
                        method: 'POST',
                        token,
                        body:
                        {
                            userId: currentUser.id,
                            status: 'created'
                        }
                    } );
                    await getCart();
                }
                const response = await callApi(
                {
                    url: `order_products/${ cart.orderId }/products`,
                    method: 'POST',
                    token,
                    body:
                    {
                        quantity: 1,
                        productId: productId
                    }
                } );
                if (response) {
                    //setMessage(`Dream car was added to the cart!`)
                    await getCart();
                    return response;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    return product
        ? <Card className={classes.carcard}
            style={{ margin: '1.2rem' }}
        >
            <CardActionArea>
                <h5>
                    {product.title}
                </h5>
                <CardMedia
                    component="img"
                    height="150"
                    image= {product.imageURL}
                    alt="carimg"
                    />
                {/* // <img src = { product.imageURL }/> */}
                <CardContent className = {classes.text}>
                {/* <Typography>Product ID: { product.productId }</Typography> */}
                <Typography>
                <NavLink to = { `/products/${product.productId}` }>{ product.productName }</NavLink>
                </Typography>
                <Typography>Description: { product.description }</Typography>
                <Typography>Price: { product.price }</Typography>
                <Typography>In Stock: { product.inStock ? 'yes' : 'no' }</Typography>
                <Typography>Category: { product.category }</Typography>
                {/* <CardActions>
                    <Button size="small" className={classes.button} onClick = { handleAddtoCart }>Add To Cart</Button>
                </CardActions> */}
                </CardContent>
                {
                    children
                }
            </CardActionArea>
            <CardActions>
                <Button size="small" className={classes.button} onClick = { handleAddtoCart }>Add To Cart</Button>
            </CardActions>
            { currentUser && currentUser.admin ? 
                <>
                    <Button size ="small" color="green" onClick = { deleteProduct } >Delete Product</Button>
                    <Button onClick = { () =>
                    {
                        setShow( !show );
                    } }>Edit Product</Button>
                    { show ? 
                    <NewProduct token = { token } product = { product } fetchProducts = { fetchProducts }></NewProduct>
                    : null }
                </> 
                : null 
            }
        </Card>
        : 'Loading Single Product...'
}

export default SingleProduct;