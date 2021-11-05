const express = require('express');
const { getOrderById, updateOrder, cancelOrder } = require('../db')
const checkoutRouter = express.Router();

checkoutRouter.patch( '/:orderId', async ( req, res, next ) =>
{
    try 
    {
        const order = await getOrderById( req.params.orderId );
        if ( order )
        {
            if ( !order.userId || order.userId === req.auth.id )
            {
                if ( req.body )
                {
                    const response = await updateOrder( req.body );
                    res.send( response );                    
                }
            }
            else
            {
                res.send(`{"message":"you do not own order with id:${req.params.orderId}"}`);
            }
        }
        else
        {
            res.send(`{"message":"order with id:${req.params.orderId} not found"}`);
        }
    }
    catch ( error )
    {
        console.log( error );
        next( error );
    }
});

checkoutRouter.delete( '/:orderId', async ( req, res, next ) =>
{
    try 
    {
        const order = await getOrderById( req.params.orderId );
        if ( order )
        {
            if ( !order.userId || order.userId === req.auth.id )
            {
                if ( req.body )
                {
                    const response = await cancelOrder( req.body );
                    res.send( response );                    
                }
            }
            else
            {
                res.send(`{"message":"you do not own order with id:${req.params.orderId}"}`);
            }
        }
        else
        {
            res.send(`{"message":"order with id:${req.params.orderId} not found"}`);
        }
    }
    catch ( error )
    {
        console.log(error);
        next( error );
    }
});

module.exports = usersRouter;