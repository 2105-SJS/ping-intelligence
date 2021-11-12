import React from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';

const Products = ( { products, token, currentUser, fetchProducts } ) => 
{
    return products
        ? <>
            <div className = 'products'>
                { currentUser && currentUser.admin ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
                <span>Products:</span>
                {
                    products.map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }/>)
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Products;