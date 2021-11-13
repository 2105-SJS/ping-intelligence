import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../util'

const AdminUserForm = ( props ) => 
{
    const params = useParams();

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
        currentUser && currentUser.admin === true ? 
        <form onSubmit = { async ( event ) =>
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

            <input required type = "text" placeholder = "Username" value = { username } onChange = { ( event ) =>
            {
                setUsername( event.target.value );
            }}/>

            <input required type = "text" disabled = { edit } placeholder = "Password" value = { password } onChange = { ( event ) =>
            {
                setPassword( event.target.value );
            }}/>

            <input required type = "text" placeholder = "First Name" value = { firstName } onChange = { ( event ) =>
            {
                setFirstName( event.target.value );
            }}/>

            <input required type = "text" placeholder = "Last Name" value = { lastName } onChange = { ( event ) =>
            {
                setLastName( event.target.value );
            }}/>

            <input required type = "email" pattern = ".+@.+" placeholder = "Email" value = { email } title = "Please provide a valid email address like: someName@someSite" onChange = { ( event ) =>
            {
                setEmail( event.target.value );
            }}/>

            <input type = "text" disabled = { !edit } placeholder = "Image URL" value = { imageURL } onChange = { ( event ) =>
            {
                setImageUrl( event.target.value );
            }}/>

            <div>
                <input type = "checkbox" disabled = { !edit } checked = { admin } value = { admin } onChange = { () =>
                {
                    setAdmin( !admin );
                }}/>
                <label htmlFor = "Admin">Admin</label>
            </div>
            
            <input required type = "text" pattern = "admin" disabled = { !admin } placeholder = "Type admin " value = { confirmAdmin } title = { `Please write admin to confirm making User:${ id } an admin` } onChange = { ( event ) =>
            {
                setConfirmAdmin( event.target.value );
            }}/>

            <p>{ message }</p>

            <button type = "submit" disabled = { !username || ( !edit && !password) || !firstName || !lastName || !email || ( admin && ! ( confirmAdmin === "admin" ) )  }>{ edit ? "Update" : "Create" }</button>
        </form>
        : <>You must be logged in as an admin to view this page.</>
    }</div>;
}

export default AdminUserForm;