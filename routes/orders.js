

const updateOrder = async (ev) => {
        ev.preventDefault();
        try {
            const response = await callApi({
                url: `orders/:orderId/products`,
                method: "POST",
                body: {orderId, productId},
                token
            })
            if (response.error) {
                setError(response.error);
            };
            if (response) {
                await callApi({url: `orders/order_products`, token
                addProduct: { productId },
                setPrice: { price },
                setQuantity: { quantity };
                await updateOrderProduct;
                history.push('/user/orders/:orderId'))};
            return response;
        } catch (error) {
            console.error(error);
        }
    }};

const updateOrderByProductId = async (ev) => {
        ev.preventDefault();
        try {
            const response = await callApi({
                url: `orders/:orderId/products`,
                method: "PATCH",
                body: { productId, quantity }   
            })
            if (response.error) {
                setError(response.error);
            };
            if (response) {
                await callApi({url: `order_products`});
                setPrice({ price });
                setQuantity({ quantity });
                await updateOrderProduct;
                history.push('order/order_products/:orderProductId/products');
            };
            return response;
        } catch (error) {
            console.error(error);
        };
    };

 const deleteOrderItem = async ( orderProductId) => {
        try {
            await callApi({
                url: `order/order_products/:orderProductId${ orderProductId }`, 
                method: "DELETE",
                token            
            })
            await callApi({url: 'order/order_products/:orderProductId/products', token});
        
            history.push('/orders/order_products/:orderProductId');
        } catch (error) {
            console.error(error);
        };    
    };