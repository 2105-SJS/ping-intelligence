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
                await callApi({url: `order_products`, token});
                addProduct: { productId },
                setPrice: { price },
                setQuantity: { quantity };
                await updateOrderProduct;
                history.push('/user/orders/:orderId');
            };
            return response;
        } catch (error) {
            console.error(error);
        };
    };

const updateOrderByProductId = async (ev) => {
        ev.preventDefault();
        try {
            const response = await callApi({
                url: `orders/:orderId/products`,
                method: "PATCH",
                body: { productId, quantity },
                token
            })
            if (response.error) {
                setError(response.error);
            };
            if (response) {
                await callApi({url: `order_products`, token});
                setPrice({ price });
                setQuantity({ quantity });
                await updateOrderProduct;
                history.push('order/order_products/:orderProductId');
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
            await callApi({url: 'order/order_products/:orderProductId', token});
        
            history.push('/orders/order_products/:orderProductId');
        } catch (error) {
            console.error(error);
        };    
    };