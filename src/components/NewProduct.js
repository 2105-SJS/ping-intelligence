import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import { Typography, TextField, Button, Grid, Card, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

<<<<<<< HEAD
const useStyles = makeStyles({
    page:{
        width:'600px',
        height:'300px',
        display:'flex',
        flexFlow:'column',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'white',
        borderRadius:'10px',
        border:'5px solid black',
        minHeight:'450px',
        marginLeft:'22rem'
    },
    entire:{
        paddingTop:'3rem'
    },
    add:{
        border:'2px solid black',
        color:'white',
        backgroundColor:'#e46400',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:'25px',
        color:'#e46400'

    }   
})

=======
>>>>>>> dev
const NewProduct = ( { token, product, fetchProducts } ) => 
{
    const classes = useStyles();
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

    return <div className={classes.entire}>
        <div className ={classes.page}>
            <div className={classes.title}>
            <Typography className={classes.title}>{ edit ? 'Edit' : 'Create' } Product</Typography>
            </div>
            <form onSubmit = { handleAdd }>

                <fieldset>
                    <Typography className = "addformlabel">Name: </Typography>
                    <TextField type = "text" placeholder = " name" value = { name } onChange = { ( event ) => setName( event.target.value ) }></TextField>
                </fieldset>

                <fieldset>
                    <Typography className = "addformlabel">Description: </Typography>
                    <TextField type = "text" placeholder = " description" value = { description } onChange = { ( event ) => setDescription( event.target.value )}></TextField>
                </fieldset>

                <fieldset>
                    <Typography className = "addformlabel">Price: </Typography>
                    <TextField type = "text" placeholder = " price" value = { price } onChange = { ( event ) => setPrice( event.target.value ) }></TextField>
                </fieldset>
                <fieldset>
                    <Typography className = "addformlabel">Image: </Typography>
                    <TextField type = "text" placeholder = " imageurl" value = {imageUrl} onChange = { ( event ) => setImageUrl( event.target.value ) }></TextField>
                </fieldset>
                <fieldset>
                    <Typography className = "addformlabel">Category: </Typography>
                    <TextField type = "text" placeholder = " category" value = { category } onChange = { ( event ) => setCategory( event.target.value ) }></TextField>
                </fieldset>
                <fieldset>
                    <Typography className = "addformlabel">In Stock: </Typography>
                    <select type = "text" value = { inStock } onChange = { ( event ) => setInStock( event.target.value )}>
                        <option value = "false">No</option>
                        <option value = "true">Yes</option>
                    </select>
                </fieldset>
                <p>{ message }</p>
                <Button className={classes.add} color='red' type = "submit">{ `${ edit ? "Edit" : "Add" } Product` }</Button>
            </form>
        </div>
    </div>
}
export default NewProduct;
