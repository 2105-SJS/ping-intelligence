import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import Order from './Order';
import User from './User';

const Cart = ( props ) =>
{
    const token = props.token;
    const currentUser = props.currentUser;
    const cart = props.cart;

    //const [ order, setOrder ] = useState( {} );
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
        // callApi(
        // {
        //     url: `orders/cart`,
        //     method: "GET",
        //     token: token
        // } )
        // .then( ( response ) => 
        // {
        //     if ( response )
        //     {
        //         setOrder( response );
        //     }
        //     else
        //     {
        //         if (cart && cart.products)
        //         {
        //             setOrder( cart );
        //         }
        //         else
        //         {
        //             setOrder( {} );
        //         }
        //     }
        // } );
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
                    if ( response.status === 'completed' )
                    {
                        //stripe submit order here
                    }
                    setMessage( `order for ${ user.username } successfully ${ type }` );
                }
                else if ( response.message )
                {
                    setMessage( response.message );
                }
                else
                {
                    setMessage( `error trying to ${ type } order` );
                }
            }
        } );
    }

    return <div className = "cart">
        <User user = { user }></User>
        <Order order = { cart }></Order>
        <h2>{ message }</h2>
        <button onClick = { ( ( event ) => 
        {
            event.preventDefault();
            callUpdate('completed');
        } ) }>Complete Order</button>
        <button onClick = { ( ( event ) => 
        {
            event.preventDefault();
            callUpdate('cancelled');
        } ) }>Cancel Order</button>
    </div>;
}

export default Cart;