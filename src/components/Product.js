import React from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';

const Products = ({products}) => {
    console.log(products)
    return products
        ? <>
            <div className='products'>
                <span>Products:</span>
                {
                products.map(product => /*<SingleProduct key={product.id} product={product} />*/ "placeholder for SingleProduct")
                }
            </div>
        </>
        : 'Loading Products...'
};

export default Products;