import React, {useState} from 'react';
import {callApi} from '../util';

productRouter.use((req, res, next) => {
    console.log("A request is being made to /products");

    next();
});
const NewProduct = ({ token, setProduct }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [inStock, setInStock] = useState(false);
    const [category, setCategory] = useState('');

    const handleAdd = async (ev) => {
        ev.preventDefault();
        const postResponse = await callApi({
            url: '/products',
            method: 'POST',
            token,
            body: {
                post: {
                    id,
                    name,
                    description,
                    price,
                    imageUrl,
                    inStock,
                    category
                }
            }
        });

        const productResponse = await callApi({ url: '/products', token });

        setProduct(productResponse.data.products);
    }

    return <div>
        <div className="newpost">
            <h1>Add Product</h1>
            <form onSubmit={handleAdd}>

                <fieldset>
                    <label className="addformlabel">Id: </label>
                    <input type="text" placeholder=" Id" value={id} onChange={(event) => setId(event.target.value)}></input>
                </fieldset>

                <fieldset>
                    <label className="addformlabel">Name: </label>
                    <input type="text" placeholder=" name" value={name} onChange={(event) => setName(event.target.value)}></input>
                </fieldset>

                <fieldset>
                    <label className="addformlabel">Description: </label>
                    <input type="text" placeholder=" description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                </fieldset>

                <fieldset>
                    <label className="addformlabel">Price: </label>
                    <input type="text" placeholder=" price" value={price} onChange={(event) => setPrice(event.target.value)}></input>
                </fieldset>
                <fieldset>
                    <label className="addformlabel">Image: </label>
                    <input type="text" placeholder=" imageurl" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></input>
                </fieldset>
                  <fieldset>
                    <label className="addformlabel">Category: </label>
                    <input type="text" placeholder=" category" value={category} onChange={(event) => setCategory(event.target.value)}></input>
                </fieldset>
                <fieldset>
                    <label className="addformlabel">In Stock: </label>
                    <select type="text" value={inStock} onChange={(event) => setInStock(event.target.value)}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </fieldset>
                <button type="submit">Add Product</button>
            </form>
        </div>
    </div>
}
module.exports = productsRouter;