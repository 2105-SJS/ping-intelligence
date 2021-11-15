import React, { useEffect } from 'react';
import { callApi } from '../util';
<<<<<<< HEAD
=======
import { useEffect, useState } from 'react';
import Order from './Order';

>>>>>>> bd5ba53e88d3b5e84acb0702049d07487767724c

// Display the single order component when the url matches /orders/:orderId
// Display the cart (using the single order component with the current users in progress order. Use the api call GET /orders/cart) when the url matches /cart
// add view cart button to the navbar that can be used to navigate to the /cart route 
<<<<<<< HEAD
const Orders = ({ token, order, setOrder }) => {
    const fetchOrder = async () => { 
        try { 
            const orderResp = await callApi({
                url: '/orders/cart', 
                token
            })
            if (orderResp) {
                setOrder(orderResp)
                return orderResp;
            }
        } catch (error) {
            throw error
        }
    }
=======

// const Orders = ({ token, order, setOrder }) => {
const Orders = ({grabOrders, orders}) => {

>>>>>>> bd5ba53e88d3b5e84acb0702049d07487767724c

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