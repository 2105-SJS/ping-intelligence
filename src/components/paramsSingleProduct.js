import React from 'react';


const SingleProduct = ({ }) => {
    const params=useParams();
    const url=params[0];
    const [product, setProduct] = useState();

     const fetchProducts = async () => {
        try {
            const respObj = await callApi({
            url: `products/${url}`,
            token
            });
            if(respObj&&respObj.allProducts)
            {
                setProduct(respObj.allProducts); 
            }
        } catch (error) {
            throw error;
        }     
        
    }

    useEffect(() => {
        try {
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    return product
        ? <div
            style={{ margin: '1.2rem' }}
        >
            <h5>
                {product.title}
            </h5>
            <div>Product ID: { product.id }</div>
            <div>Product Name: { product.name }</div>
            <div>Description: { product.description }</div>
            <div>Price: { product.price }</div>
            <div>Image URL: { product.imageUrl }</div>
            <div>In Stock: { product.inStock }</div>
            <div>Category: { product.category }</div>
           
        </div>
        : 'Loading Single Product...'
}

export default SingleProduct;