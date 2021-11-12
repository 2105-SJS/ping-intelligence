const express = require('express');
const { createProduct, destoryProduct, updateProduct } = require('../db');
const adminProductsRouter = express.Router();

adminProductsRouter.post( '/', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            if ( req.body )
            {
                const { productName, description, price, imageURL, inStock, category } = req.body;
                if ( productName && description && price && category )
                {
                    res.send( await createProduct(
                    {
                        productName,
                        description,
                        price,
                        imageURL,
                        inStock,
                        category
                    } ) );
                }
                else
                {
                    res.send( '{"message":"missing required field: check all required fields."}' );
                }
            }
            else
            {
                res.send( '{"message":"no body sent: must have a body with required fields in request."}' );
            }
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

adminProductsRouter.delete( '/:productId', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            res.send ( await destoryProduct( { id: params.productId } ) );
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

adminProductsRouter.patch( '/:productId', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            if ( req.body )
            {
                res.send ( await updateProduct( req.body ) );
            }
            else
            {
                res.send( '{"message":"missing data: must have a body with all fields in request."}' );
            }
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

adminProductsRouter.get( '/:productId/orders', async ( req,  res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            res.send ( await destoryProduct( { id:req.params.productId } ) );
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

adminProductsRouter.patch( '/:productId', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            res.send ( await getAllOrdersByProduct( req.params.productId ) );
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

module.exports = adminProductsRouter;