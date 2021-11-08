const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const { createUser, getUser, getUserByUsername, getAllUsers, updateUser, createProduct, destoryProduct, updateProduct } = require('../db');
const productsRouter = express.Router();

productsRouter.post( '/', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            if ( req.body )
            {
                const { productName, description, price, imageURL, inStock, catagory } = req.body;
                
                if ( productName, description, price, inStock, catagory )
                {
                    res.send( await createProduct(
                    {
                        productName,
                        description,
                        price,
                        imageURL,
                        inStock,
                        catagory
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

productsRouter.delete( '/:productId', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            res.send ( await destoryProduct( { id:params.productId } ) );
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

productsRouter.patch( '/:productId', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            if ( req.body &&
                req.body.productName &&
                req.body.description &&
                req.body.price &&
                req.body.imageURL && 
                req.body.inStock && 
                req.body.catagory )
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

productsRouter.get( '/:productId/orders', async ( req,  res, next ) =>
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

productsRouter.patch( '/:productId', async ( req, res, next ) =>
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

usersRouter.get( '/me', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth )
        {
            res.send ( await getUserByUsername( req.auth.username ) );
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        next( error );
    }
} );

usersRouter.get( '/', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            res.send ( await getAllUsers() );
        }
        else
        {
            next( 'Invalid Credentials' );
        }
    }
    catch ( error )
    {
        next( error );
    }
} );

module.exports = productsRouter;