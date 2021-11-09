import React from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';
import SingleProduct  from './SingleProduct';


const Products = ( { products } ) => {
    return products
        ? <>
            <div className = 'products'>
                <span>Products:</span>
                {
                  
                products.map(product => <SingleProduct key={product.id} product={product}/>)
                
    
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Products;