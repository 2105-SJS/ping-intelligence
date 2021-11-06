const express = require('express');
const { getProductById } = require('../db');
const order_productRouter = express.Router();
const { getOrderProductsById, addProductToOrder, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const { getOrderById } = require('../db/orders');
const { requireUser } = require('./utils');



order_productRouter.use((req, res, next) => {
    console.log("A request is being made to /order_products");

    next();
});

order_productRouter.post('/order:Id/products', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.Id
        const orderProducts = await getOrderProductsById(id);
        const { quantity } = req.body;
        const { price } = req.body;
        
<<<<<<< HEAD
        if( orderProducts ) {
            const product = await getProductById(orderProducts.productsId);
            const { productId } = product;
            if( !productId ) 
                throw Error("Unsuccessful in adding prodcut")
            } else {
                const addingProduct = await addProductToOrder({ orderId, productId, price, quantity }) 
                res.send(addingProduct);
            } 
=======
        
>>>>>>> dev
    } catch (error) {
        throw error
    }
})

<<<<<<< HEAD
order_productRouter.patch('/:order_productId', requireUser, async (req, res, next) => {
    try {
        const { orderProductsId } = req.params;
        const { quantity } = req.body;
        const orderProducts = await getOrderProductsById(orderProductsId);
        const products = await getProductById (orderProducts.productsId)
        const { price } = products;
        const updatedPrice = Number(price) * quantity;
        const isCreator = async () => {
            const order = await getOrderById(orderProducts.productId)
            if (order) {
                if (order.userId === req.user.Id) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        if (!orderProducts || orderProducts && !isCreator()) {
                throw Error("Unsuccessful update")
            } else {
                const updatedOrderProduct = await updateOrderProduct ({ id, price, quantity })
                res.send(updatedOrderProduct);
            }
        } catch (error) {
            throw error
        }
    })
=======
// order_productRouter.patch('/:order_productId', requireUser, async (req, res, next) => {
//     try {
//         const orderProducts = await getOrderProductsById(orderProductsId);
//         const products = await getProductById (orderProducts.productsId)
//         const { orderProductsId } = req.params;
//         const { quantity } = req.body;
//         const { price }

//     } catch (error) {
//         throw error
//     }

// })
>>>>>>> dev

order_productRouter.delete('/Id', requireUser, async (req, res, next) => {
    try {
        const { Id } = req.params
        const userid = req.user.id
        console.log('userid: ', userid)
        const orderProducts = await getOrderProductsById(Id)
        if ( orderProducts ) {
            const { orderId } = orderProducts;
            const order = await getOrderById(orderId);
            if ( orderProducts && order === userId ) {
                const deleteProductId = await destroyOrderProduct(Id);
                if ( deleteProductId ) {
                    res.send({
                        name: 'Successful Deletion',
                        message: 'The product was deleted from your order'
                    })
                } else {
                    res.send({
                        name: 'Error Deleting Product',
                        message: 'There was an error while trying to delete the product from your order'
                    })
                }
            }
        }
    } catch (error) {
        throw error;
    }
});


module.exports = order_productRouter;