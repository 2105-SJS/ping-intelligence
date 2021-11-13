import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';

const Products = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
{
    const params = useParams();
    return products
        ? <>
            <div className = 'products'>
                { currentUser && currentUser.admin ? 
                <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
                <span>Products:</span>
                {
                    products.filter( ( product ) => {
                        return product.productId===params.productId;
                    } )
                    .map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }  cart = { cart } getCart = { getCart }/>)
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Product;