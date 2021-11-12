import React, { useState } from 'react';
import { callApi } from '../util';
import NewProduct from './NewProduct';

const SingleProduct = ({ product, token, currentUser, fetchProducts, children }) => {

    const [ show, setShow ] = useState( false );

    const deleteProduct = async () =>
    {
        callApi(
        {
            url: `products/${ product.id }`,
            method: 'DELETE',
            token: token
        } )
        .then( fetchProducts() );
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