import React from 'react';
import { callApi } from '../util';
import { Link } from 'react-router-dom';


const ProductsAll = ( { products } ) => 
{
    return products
        ? <>
            <div className = 'products'>
                <span>Products:</span>
                {
                    products.map(products => <ProductsAll key={products} products={products}/>)
                }
            </div>
        </>
        : 'Loading Products...'
};

export default ProductsAll;