import React, { useEffect } from 'react';
import Order from './Order';

// const Product 
// get orderId from url params
// useEffect, fetch order data by id 
// store order data in state
// map over order data


const Orders = ({grabOrders, orders, products, cart}) => {


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
    console.log('>>>> cart', cart)
    return <>
        {orders.map (order => < Order key={order.orderId} order={order} products={products} cart={cart} />)}
    </>    
}

export default Orders;