// import React from 'react';
// import { callApi } from '../util';
// import { Link } from 'react-router-dom';
// import SingleProduct from './SingleProduct';
// import NewProduct from './NewProduct';
// import { Grid, Typography, Card, GridListTile, GridList } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles({
//     cars:{
//         display:'flex',
//         justifyContent:'center',
//         fontSize:'2rem',
//         color:'white'
//     },
//     grid:{
//         display:'flex',
//         flexDirection:'row',
//         flexWrap:'wrap',
//         border:'2px solid black',
//     },
//     product:{
//         display:'flex',
//         flexDirection:'row',
//         flexWrap:'wrap'

//     }
// })

// const Products = ( { products, token, currentUser, fetchProducts } ) => 
// {
//     const classes = useStyles()
//     return products
//         ? <>
//         <Grid container justify="center" className={classes.grid} >
//             <Grid className = 'products'>
//                 { currentUser && currentUser.admin ? 
//                 <NewProduct token = { token } fetchProducts = { fetchProducts }></NewProduct> : null }
//                 <Typography className={classes.cars}>Cars</Typography>
//                 {
//                     products.map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }/>)
//                 }
//             </Grid>
//             </Grid>
//         </>
//         : 'Loading Product...'
// };

// export default Products;
import React from 'react';
import SingleProduct from './SingleProduct';
import NewProduct from './NewProduct';
import { useParams } from 'react-router';


const Product = ( { products, token, currentUser, fetchProducts, cart, getCart } ) => 
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
                        return product.productId===Number(params.productId);
                    } )
                    .map(product => <SingleProduct key = { product.productId } product = { product } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }  cart = { cart } getCart = { getCart }/>)
                }
            </div>
        </>
        : 'Loading Product...'
};

export default Product;