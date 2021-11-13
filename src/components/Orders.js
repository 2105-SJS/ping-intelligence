import React, { useEffect } from 'react';
import { callApi } from '../util';
import { useEffect, useState } from 'react';
import Order from './Order';


// Display the single order component when the url matches /orders/:orderId
// Display the cart (using the single order component with the current users in progress order. Use the api call GET /orders/cart) when the url matches /cart
// add view cart button to the navbar that can be used to navigate to the /cart route 

// const Orders = ({ token, order, setOrder }) => {
const Orders = ({grabOrders, orders}) => {


    useEffect( () => 
    {
        try 
        {
            grabOrders();
        } catch ( error ) 
        {
            console.error( error );
        }
      
    }, []);

    return <>
        {orders.map (order => < Order key={order.orderId} order={order}/>)}
       
    </> 
}

export default Orders;