import React from 'react';
import { callApi } from '../util';

const SingleProduct = ({ product, token, currentUser, fetchProducts, children }) => {

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
            <div>Product ID: { product.id }</div>
            <div>Product Name: { product.name }</div>
            <div>Description: { product.description }</div>
            <div>Price: { product.price }</div>
            <div>Image URL: { product.imageUrl }</div>
            <div>In Stock: { product.inStock }</div>
            <div>Category: { product.category }</div>
            {
                children
            }
            { currentUser && currentUser.admin ? 
                <button onClick = { deleteProduct } >Delete Product</button> 
                : null 
            }
        </div>
        : 'Loading Single Product...'
}

export default SingleProduct;