import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import Order from './Order';
import User from './User';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

    btn: {
        color: 'black',
        border: '1px solid black',
        backgroundColor: 'white',
        margin: '3px'
    }
})

const Cart = ( props ) =>
{
    const classes = useStyles();
    const token = props.token;
    const currentUser = props.currentUser;
    const cart = props.cart;

    const [ user, setUser ] = useState( {} );
    const [ message, setMessage ] = useState( "Complete or cancel your order here." );

    useEffect( () =>
    {
        if ( token )
        {
            callApi(          
            {
                url: `users/me`,
                method: "GET",
                token: token
            } )
            .then( ( response ) =>
            {
                if ( response && response.id )
                {
                    setUser( response );
                }
                else
                {
                    setUser( 
                    {
                        username: "Guest"
                    } );
                }
            } );
        }
        else
        {
            setUser( 
            {
                username: "Guest"
            } );
        }
    }, [ token, cart ] )

    const callUpdate=(type)=>
    {
        callApi(
        {
            url:`orders/${cart.orderId}/`,
            method: "PATCH",
            token: token,
            body:
            {
                userId: currentUser.id,
                status: type
            }
        })
        .then( ( response ) =>
        {
            if ( response )
            {
                if ( response.orderId )
                {
                    setMessage( `order for ${ user.username } successfully ${ type }` );
                }
                else if ( response.message )
                {
                    setMessage( response.message );
                }
                else
                {
                    setMessage( `error trying to ${ type === 'completed' ? 'complete' : 'cancel'  } order` );
                }
            }
        } );
    }

    return currentUser && currentUser.id ? <div className = "cart">
        <User user = { user }></User>
        <Order order = { cart }></Order>
        <h2>{ message }</h2>
        <Button size='small' className={classes.btn} onClick = { ( ( event ) => 
        {
            event.preventDefault();
            callUpdate('completed');
        } ) }>Complete Order</Button>
        <Button size='small' className={classes.btn} onClick = { ( ( event ) => 
        {
            event.preventDefault();
            callUpdate('cancelled');
        } ) }>Cancel Order</Button>
    </div>
    :'You must be logged in to view this page';
}

export default Cart;