import React from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';

const Products = ( { products } ) => {
    return products
        ? <>
            <div className = 'products'>
                <span>Products:</span>
                {
                  
                products.map(product => <SingleProduct key={product.id} product={product}/>)
                
                products.map( product => /*<SingleProduct key={product.id} product={product} />*/ "placeholder for SingleProduct")
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Products;