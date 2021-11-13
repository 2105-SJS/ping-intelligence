import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';

const ProductsAll = ( { products, token, currentUser, fetchProducts } ) => 
{
    return products
        ? <>
            <div className = 'products'>
                { currentUser && currentUser.admin ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
              
                {
                    products.map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }/>)
                }
            </div>
        </>
        : 'Loading Product...'
};

export default ProductsAll;