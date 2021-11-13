import React from 'react';
import { callApi } from '../util';



// Display the single order component when the url matches /orders/:orderId
// Display the cart (using the single order component with the current users in progress order. Use the api call GET /orders/cart) when the url matches /cart
// add view cart button to the navbar that can be used to navigate to the /cart route 


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

    useEffect( () => { 
        try { 
            fetchOrder();
        } catch (error) {
            throw error
        }
    }, []);

    return <>
        <h2 className='header'>
            Order
        </h2>
        <div className='content'>\
            {
                order.map(orders => <>
                    <div key={orders.id} className='singleOrder'>
                        {
                            orders.products.map(orderProduct => <>
                                <div><img className='cartImg' src={orderProduct.imgURL} />{orderProduct.title}...{orderProduct.price}</div>
                            </>
                            )
                        }
                    </div>

                </>)
            }
        </div>
    </>

}

export default Orders;