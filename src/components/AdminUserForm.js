import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../util'
import { Typography, TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    page:{
        width:'500px',
        height:'500px',
        display:'flex',
        flexFlow:'column',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'white',
        borderRadius:'10px',
        border:'5px solid black',
        minHeight:'700px',
        marginLeft:'22rem'
    },
    admin:{
        fontSize:'20px'
    },
    button:{
        color:'blue'
    },
    blank:{
        paddingTop:'2rem'
    },
    blanklow:{
        paddingTop:'2rem'
    }
    
})

const AdminUserForm = ( props ) => 
{
    const params = useParams();
    const classes = useStyles();

    const token = props.token;
    const currentUser = props.currentUser;

    const [ id, setId ] = useState( -1 );
    const [ edit, setEdit ] = useState( true );
    const [ username, setUsername ] = useState( "" );
    const [ firstName, setFirstName ] = useState( "" );
    const [ lastName, setLastName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ imageURL, setImageUrl ] = useState( "" );
    const [ admin, setAdmin ] = useState( false );
    const [ confirmAdmin, setConfirmAdmin ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ message, setMessage ] = useState( "" );
    
    useEffect( () =>
    {
        setId( Number( params.userId ) || -1 );
    }, [ params.userId ] );

    useEffect( () =>
    {
        if ( id !== -1 )
        {
            callApi( 
            {
                url: `users/${ id }/`,
                method: "GET",
                token: token,
            } )
            .then( ( response ) =>
            {
                if ( response && response.id )
                {
                    setEdit( true );
                    setUsername( response.username || "" );
                    setFirstName( response.firstName || "" );
                    setLastName( response.lastName || "" );
                    setEmail( response.email || "" );
                    setImageUrl( response.imageURL || "" );
                    setAdmin( response.admin || false );
                    setMessage( `Editing user Id:${ id } Username:${ response.username }` );
                }
                else
                {
                    setMessage( `Unable to find user with Id:${ id }` );
                }
            } );    
        }
        else
        {
            setEdit( false );
            setMessage( "Add new User" );
        }
    }, [ id, token ] );

    return <div className = "AdminUserForm" > 
    { 
        currentUser && currentUser.admin === true ? <>
        <Container className={ classes.blank }></Container>
        <Container>
            <form className={classes.page} onSubmit = { async ( event ) =>
            {
                event.preventDefault();
                callApi(
                {
                    url: `users/${ edit ? id : "register" }`,
                    method: ( edit ? "PATCH" : "POST" ),
                    token: token,
                    body:
                    {
                        ...( edit && { id: id } ),
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        username: username,
                        ...( !edit && { password: password } ),
                        imageURL: imageURL,
                        isAdmin: admin
                    }
                } )
                .then( ( response ) =>
                {
                    if ( response )
                    {
                        if ( response.id )
                        {
                            setMessage( `Successfully ${ ( edit ? `edited` : `created` ) } User: ${ response.username }` );
                        }
                        else
                        {
                            setMessage( response.message );
                        }
                    }
                    else
                    {
                        setMessage( `Error ${ edit ? "editing" : "creating" } User.` );
                    }
                } );
            }}>

                <TextField required type = "text" placeholder = "Username" value = { username } onChange = { ( event ) =>
                {
                    setUsername( event.target.value );
                }}/>

                <TextField required type = "text" disabled = { edit } placeholder = "Password" value = { password } onChange = { ( event ) =>
                {
                    setPassword( event.target.value );
                }}/>

                <TextField required type = "text" placeholder = "First Name" value = { firstName } onChange = { ( event ) =>
                {
                    setFirstName( event.target.value );
                }}/>

                <TextField required type = "text" placeholder = "Last Name" value = { lastName } onChange = { ( event ) =>
                {
                    setLastName( event.target.value );
                }}/>

                <TextField required type = "email" pattern = ".+@.+" placeholder = "Email" value = { email } title = "Please provide a valid email address like: someName@someSite" onChange = { ( event ) =>
                {
                    setEmail( event.target.value );
                }}/>

                <TextField type = "text" disabled = { !edit } placeholder = "Image URL" value = { imageURL } onChange = { ( event ) =>
                {
                    setImageUrl( event.target.value );
                }}/>

                <Typography className = { classes.admin }>
                    <input type = "checkbox" disabled = { !edit } checked = { admin } value = { admin } onChange = { () =>
                    {
                        setAdmin( !admin );
                    }}/>
                    <label htmlFor = "Admin">Admin</label>
                </Typography>
                
                <TextField required type = "text" pattern = "admin" disabled = { !admin } placeholder = "Type admin " value = { confirmAdmin } title = { `Please write admin to confirm making User:${ id } an admin` } onChange = { ( event ) =>
                {
                    setConfirmAdmin( event.target.value );
                }}/>

                <Typography>{ message }</Typography>

                <Button className={classes.button} type = "submit" disabled = { !username || ( !edit && !password) || !firstName || !lastName || !email || ( admin && ! ( confirmAdmin === "admin" ) )  }>{ edit ? "Update" : "Create" }</Button>
            </form>
        <Container className={classes.blanklow}></Container>
    </Container>
    </>
        : <Typography>You must be logged in as an admin to view this page.</Typography>
    }</div>;
}

export default AdminUserForm;