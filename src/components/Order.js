import React from 'react';
import { Link, useParams } from 'react-router-dom';

<<<<<<< HEAD
const Order = ({order}) =>
{
    console.log(order)

    return order
        ? <> </> : null
    {/* <div className = "order">
        order placeholder
     </div>; */}
};
=======
const Order = (props) => {
    let { order, isCart, orders} = props;
    if(!order){ 
        const { orderId } = useParams();
        console.log(orderId)
        console.log(typeof orderId)
        console.log('>>>>', orders)
        order = orders.find(_order => _order.orderId === +orderId) 
    }
    console.log('order', order)
    console.log('foo');
      return (
          order ? 
          <div className="singleOrder">
              <header className="orderInfo">
              <div> Order #{order.orderId} </div>
              <div> Order Status: {order.status} </div>
              <div> Order Placed: {order.datePlaced} </div>
              <Link to={`/orders/${order.orderId}`}> View Order </Link>
              </header>
              <div className="products">
              Items inside cart:
              {order.products && order.products.map(({ id, name, description, category, price, quantity }) => { 
                 return(
                     <div key={id} className="product">
                     <div>Name: {name} </div>
                     <div> Category: {category} </div>
                     <div> Description: {description} </div>
                     <div> Price: {price} </div>
                     <div> Quantity: {quantity} </div>
                     {isCart && <Button className="btn btn-danger" onClick={()=>{
                         console.log('im being clicked');
                     }}>Remove</Button>}
                     </div>
                 );
              }
              )
              }
              <div>Total: ${order?.products?.reduce((acc, {price, quantity})=> acc + ( (price/100.0) * quantity), 0).toFixed(2)} </div>
              </div>
          </div>
          : <div> Loading </div>
      );
  }
>>>>>>> bd5ba53e88d3b5e84acb0702049d07487767724c

export default Order;