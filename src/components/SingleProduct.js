import { getContrastRatio } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { callApi } from '../util';
import NewProduct from './NewProduct';

const SingleProduct = ({ product, token, currentUser, fetchProducts, getCart, cart, children }) => {

    const [ show, setShow ] = useState( false );

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
                if( cart.orderId!== undefined ) 
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
        ? <div
            style={{ margin: '1.2rem' }}
        >
            <h5>
                {product.title}
            </h5>
            <div>Product ID: { product.productId }</div>
            <NavLink to = { `/products/${product.productId}` }>Product Name: { product.productName }</NavLink>
            <div>Description: { product.description }</div>
            <div>Price: { product.price }</div>
            <img src = { product.imageURL }/>
            <div>In Stock: { product.inStock ? 'yes' : 'no' }</div>
            <div>Category: { product.category }</div>
            <div><button onClick = { handleAddtoCart }>Add To Cart</button></div>
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
        </div>
        : 'Loading Single Product...'
}

export default SingleProduct;