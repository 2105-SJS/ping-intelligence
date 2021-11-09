import React from 'react';

const SingleProduct = ({ product }) => {
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
           
        </div>
        : 'Loading Single Product...'
}

export default SingleProduct;