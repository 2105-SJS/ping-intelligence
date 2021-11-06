const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const { createUser, getUser, getUserByUsername, getAllUsers, updateUser, createProduct } = require('../db');
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
                    res.send('{"message":"missing required field: check all required fields."}');
                }
            }
            else
            {
                res.send('{"message":"no body sent: must have a body with required fields in request."}');
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
                res.send('{"message":"missing required field: check all required fields."}');
            }
        }
        else
        {
            res.send('{"message":"no body sent: must have a body with required fields in request."}');
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
} );

usersRouter.post( '/login', async ( req,  res, next ) =>
{
    try 
    {
        if ( req.body.username && req.body.password )
        {
            const user = await getUser(
            {
                username: req.body.username,
                password: req.body.password
            });
            if ( user && user.id )
            {
                const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                JWT_SECRET,
                {
                    expiresIn: '1w'
                });
                user.token = token;
                res.send( user );
            }
            else
            {
                res.send('{"message":"Invalid username/password"}');
            }
        }
        else
        {
            res.send('{"message":"Missing username/password"}');
        }
    }
    catch ( error )
    {
        next ( error );
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

usersRouter.patch( '/:userId/', async ( req, res, next ) =>
{
    try 
    {
        if ( req.auth && req.auth.isAdmin )
        {
            if ( req.params.userId === req.body.id )
            {
                res.send( await updateUser( req.body ) );
            }
            else
            {
                res.send('{"message":"Mismatched ids: Make sure you are using correct user and id"}');
            }
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

module.exports = usersRouter;