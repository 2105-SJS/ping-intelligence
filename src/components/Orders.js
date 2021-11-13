import React from 'react';
import { callApi } from '../util';
import { useEffect } from 'react';
import Order from './Order';


// Display the single order component when the url matches /orders/:orderId
// Display the cart (using the single order component with the current users in progress order. Use the api call GET /orders/cart) when the url matches /cart
// add view cart button to the navbar that can be used to navigate to the /cart route 

const Orders = ({ token, order, setOrder }) => {
    return order 
        ? <>
            <div className='order'> 
                <h2> Order </h2>
                { order.map(order => <Order key={order.id} order={order} /> )}
            </div>
    </>
    : null
}

export default Orders;