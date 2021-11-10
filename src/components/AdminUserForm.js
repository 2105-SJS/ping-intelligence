import React, { useState, useEffect } from 'react';
import { callApi } from '../util'

const AdminUserForm = ( props ) => 
{
    const params = useParams();
    const id = Number(params[0]);
    
    const token = props.token;
    const currentUser = props.currentUser;

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
        if ( id )
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
                    setUsername( response.username );
                    setFirstName( response.firstName );
                    setLastName( response.lastName );
                    setEmail( response.email );
                    setImageUrl( response.imageURL );
                    setAdmin( response.admin );
                    setMessage( `Editing user Id:${id} Username:${username}` );
                }
                else
                {
                    setMessage( `Unable to find user with Id:${id}` );
                }
            } );    
        }
        else
        {
            setEdit( false );
            setMessage( "Add new User" );
        }
    }, [] );

    return currentUser && currentUser.admin ? 
        <form onSubmit = { async ( event ) =>
        {
            event.preventDefault();
            callApi(
            {
                url: `users/${ register ? "register" : "login" }`,
                method: ( edit ? "UPDATE" : "POST" ),
                body:
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    imageURL: imageURL,
                    admin: admin
                }
            }
            ).then( ( response ) =>
            {
                if ( response )
                {
                    if ( response.token )
                    {
                        setToken( response.token );
                        setMessage( "You are logged in." );
                        setCurrentUser(
                        {
                            id: response.id,
                            name: response.username,
                            admin: response.admin
                        });
                        if ( remember )
                        {
                            localStorage.setItem( "token", response.token );
                            localStorage.setItem( "username", response.username );
                            localStorage.setItem( "id", response.id );
                            localStorage.setItem( "admin", response.admin )
                        }
                    }
                    else
                    {
                        setMessage( response.message );
                    }
                }
                else
                {
                    setMessage("error " + ( register ? "registering":"logging in" ) + "." );
                }
            });
        }}>
            <div>
                <input type = "checkbox" checked = { register } value = { register }  onChange = { () =>
                {
                    setRegister(!register);
                }}/>
                <label htmlFor = "Register">Register</label>
            </div>
            <input required type = "text" placeholder = "Username" value = { username } onChange = { ( event ) =>
            {
                setUsername( event.target.value );
            }}/>

            <input required type = { hidden ? "password" : "text" } placeholder = "Password" value = { password } onChange = { ( event ) =>
            {
                setPassword( event.target.value );
            }}/>

            <input required type = "password" disabled = { !register } placeholder = "Confirm Password" value = { confirmPassword } onChange = { ( event ) =>
            {
                setConfirmPassword( event.target.value );
            }}/>

            <div>
                <input type = "checkbox" checked = { hidden } value = { hidden }  onChange = { () =>
                {
                    setHidden ( !hidden );
                }}/>
                <label htmlFor = "Hide Password">Hide Password</label>
            </div>
            <input required type = "text" disabled = { !register } placeholder = "First Name" value = { firstName } onChange = { ( event ) =>
            {
                setFirstName( event.target.value );
            }}/>

            <input required type = "text" disabled = { !register } placeholder = "Last Name" value = { lastName } onChange = { ( event ) =>
            {
                setLastName( event.target.value );
            }}/>

            <input required type = "email" pattern = ".+@.+" disabled = { !register } placeholder = "Email" value = { email } title = "Please provide a valid email address like: someName@someSite" onChange = { ( event ) =>
            {
                setEmail( event.target.value );
            }}/>
            <div>
                <input type = "checkbox" checked = { remember } value = { remember }  onChange = { () =>
                {
                    setRemember( !remember );
                }}/>
                <label htmlFor = "Remember Me">Remember Me</label>
            </div>

            <p>{ message }</p>

            <button type = "submit" disabled = { !username || !password || ( register && ( password !== confirmPassword || !firstName || !lastName|| !email ) ) }>{ register ? "Register" : "Login" }</button>
        </form>
    : <>You must be logged in as an admin to view this page.</>
}

export default AdminUserForm;