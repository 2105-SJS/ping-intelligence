import { getContrastRatio } from '@material-ui/core';
import { callApi } from '../util';
import React, { useState } from 'react';
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

    const handleAddtoCart = async (event) => {
        event.preventDefault();
        try {
            if (product && cart) {
                const productId = Number(product.id)
                const {id} = cart;
                if(id) {
                    const response = await callApi({
                        url: `orders/${id}/products`,
                        method: 'POST',
                        token,
                        body: {quantity: 1, productId: productId}
                    })
                    if (response) {
                        //setMessage(`Dream car was added to the cart!`)
                        await getCart();
                        return response;
                    }
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
            <div>Product Name: { product.productName }</div>
            <div>Description: { product.description }</div>
            <div>Price: { product.price }</div>
            <div>Image URL: { product.imageURL }</div>
            <div>In Stock: { product.inStock ? 'yes' : 'no' }</div>
            <div>Category: { product.category }</div>
            <div><button onClick={handleAddtoCart}>Add To Cart</button></div>
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