import { getContrastRatio } from '@material-ui/core';
import React from 'react';
import { callApi } from '../util';

const SingleProduct = ({ product, children, getCart, cart }) => {

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
                        setMessage(`Dream car was added to the cart!`)
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
            <div>Product ID: { product.id }</div>
            <div>Product Name: { product.name }</div>
            <div>Description: { product.description }</div>
            <div>Price: { product.price }</div>
            <div>Image URL: { product.imageUrl }</div>
            <div>In Stock: { product.inStock }</div>
            <div>Category: { product.category }</div>
            <div><button onClick={handleAddtoCart}>Add To Cart</button></div>
            {
                children
            }
        </div>
        : 'Loading Single Product...'
}

export default SingleProduct;