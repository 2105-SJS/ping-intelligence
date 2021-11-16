import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Button, Card, CardActionArea, CardActions, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
// import Image from 'material-ui-image'

const useStyles = makeStyles({
    products: {
        width: '100px',
        height: '200px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '5px solid black',
        minHeight: '700px',
        marginLeft: '22rem',
        padding: '5px'
    },
    singleOrder: {
        minWidth: '70vw'
    },
    items: {
        minHeight: '165px',
        border: '2px solid black',
        display: 'flex',
        margin: '10px',
        padding: '8px'
        // width: '500px'
    },
    btn: {
        color: 'red',
        border: '1px solid black'
    }
})

const Order = (props) => {
    const classes = useStyles();

    let { order, isCart, orders } = props;
    if (!order) {
        const { orderId } = useParams();
        order = orders.find(_order => _order.orderId === +orderId)
    }
    // console.log('order', order)
    // console.log('foo');
    return (
        order ?
            <>
                <header className="orderInfo">
                    <div> Order #{order.orderId} </div>
                    <div> Order Status: {order.status} </div>
                    <div> Order Placed: {order.datePlaced} </div>
                    <Link to={`/orders/${order.orderId}`}> View Order </Link>
                </header>
                <div>
                    Items inside cart:
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="singleOrder">
                        
                        {order.products && order.products.map(({ id, productName, description, category, price, quantity }) => {
                            return <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                                {/* <Card className={classes.products}>  */}
                                <Card className={classes.items}>
                                    {/* <img src={product.imageUrl}/> */}
                                    <Typography key={id} className="product">
                                        <Typography> {productName} </Typography>
                                        <Typography> Category: {category} </Typography>
                                        <Typography> Description: {description} </Typography>
                                        <Typography> Price: ${price} </Typography>
                                        <Typography> Quantity: {quantity} </Typography>
                                        {isCart && <Button size='small' className={classes.btn} onClick={() => {
                                            console.log('im being clicked');
                                        }}>Remove</Button>}
                                    </Typography>
                                </Card>
                            </Grid>;
                        }
                        )
                        }
                    </Grid >
                </div>
            </>
            : <div> Loading </div>

    );
}

export default Order;