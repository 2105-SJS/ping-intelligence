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

    useEffect( () =>
    {
        if( product && product.id )
        {
            setId( product.id || -1 );
            setName( product.name || '' );
            setDescription( product.description || '' );
            setPrice( product.price || '' );
            setImageUrl( product.imageUrl || '' );
            setInStock( product.inStock || '' );
            setCategory( product.category || '' );
            setEdit( true );
        }
        else
        {
            setEdit( false );
        }
    },
    [ product ] );

    const handleAdd = async (ev) => 
    {
        ev.preventDefault();
        await callApi( 
        {
            url: `/products${ edit ? `/${ id }` : '' }`,
            method: edit ? 'PATCH' : 'POST',
            token,
            body: 
            {
                id,
                name,
                description,
                price,
                imageUrl,
                inStock,
                category
            }
        } );

        fetchProducts();
    }

    return <div>
        <div className = "newproduct">
            <h1>Add Product</h1>
            <form onSubmit = { handleAdd }>

                <fieldset>
                    <label className = "addformlabel">Id: </label>
                    <input type = "text" placeholder = " Id" value = { id } onChange = { ( event ) => setId( event.target.value ) }></input>
                </fieldset>

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
                <button type = "submit">{ `${ edit ? "Edit" : "Add" } Product` }</button>
            </form>
        </div>
    </div>
}
export default NewProduct;