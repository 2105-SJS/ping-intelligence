import React, { useEffect, useState } from 'react';
import { callApi } from '../util';


const NewProduct = ( { token, product, fetchProducts } ) => 
{
    const [ edit, setEdit ] = useState( false );
    const [ id, setId ] = useState( '' );
    const [ name, setName ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ imageUrl, setImageUrl ] = useState( '' );
    const [ inStock, setInStock ] = useState( false );
    const [ category, setCategory ] = useState( '' );
    const [ message, setMessage ] = useState( '' );

    useEffect( () =>
    {
        if( product && product.productId )
        {
            setId( product.productId || -1 );
            setName( product.productName || '' );
            setDescription( product.description || '' );
            setPrice( product.price || '' );
            setImageUrl( product.imageURL || '' );
            setInStock( product.inStock || '' );
            setCategory( product.category || '' );
            setEdit( true );
            setMessage( `Editing Product id:${ product.productId }`);
        }
        else
        {
            setMessage( `Creating Product`);
            setEdit( false );
        }
    },
    [ product ] );

    const handleAdd = async (ev) => 
    {
        ev.preventDefault();
        const response = await callApi( 
        {
            url: `products${ edit ? `/${ id }` : '' }`,
            method: edit ? 'PATCH' : 'POST',
            token,
            body: 
            {
                productId: id,
                productName: name,
                description,
                price,
                imageURL: imageUrl,
                inStock,
                category
            }
        } );
        if ( response )
        {
            if ( response.productName )
            {
                setMessage( `successfully ${ edit ? "edited" : "created" } product` )
            }
            else if ( response.message)
            {
                setMessage( response.message );
            }
            else
            {
                setMessage( `Error ${ edit ? "editing" : "creating" } product` );
            }
        }
        else
        {
            setMessage( `Error ${ edit ? "editing" : "creating" } product` );
        }
        fetchProducts();
    }

    return <div>
        <div className = "newproduct">
            <h1>{ edit ? 'Edit' : 'Add' } Product</h1>
            <form onSubmit = { handleAdd }>

                <fieldset>
                    <label className = "addformlabel">Name: </label>
                    <input type = "text" placeholder = " name" value = { name } onChange = { ( event ) => setName( event.target.value ) }></input>
                </fieldset>

                <fieldset>
                    <label className = "addformlabel">Description: </label>
                    <input type = "text" placeholder = " description" value = { description } onChange = { ( event ) => setDescription( event.target.value )}></input>
                </fieldset>

                <fieldset>
                    <label className = "addformlabel">Price: </label>
                    <input type = "text" placeholder = " price" value = { price } onChange = { ( event ) => setPrice( event.target.value ) }></input>
                </fieldset>
                <fieldset>
                    <label className = "addformlabel">Image: </label>
                    <input type = "text" placeholder = " imageurl" value = {imageUrl} onChange = { ( event ) => setImageUrl( event.target.value ) }></input>
                </fieldset>
                <fieldset>
                    <label className = "addformlabel">Category: </label>
                    <input type = "text" placeholder = " category" value = { category } onChange = { ( event ) => setCategory( event.target.value ) }></input>
                </fieldset>
                <fieldset>
                    <label className = "addformlabel">In Stock: </label>
                    <select type = "text" value = { inStock } onChange = { ( event ) => setInStock( event.target.value )}>
                        <option value = "false">No</option>
                        <option value = "true">Yes</option>
                    </select>
                </fieldset>
                <p>{ message }</p>
                <button type = "submit">{ `${ edit ? "Edit" : "Add" } Product` }</button>
            </form>
        </div>
    </div>
}
export default NewProduct;