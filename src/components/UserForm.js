import React, { useState, useEffect } from 'react';
import { callApi } from '../util';
import { Typography, TextField, Button, Grid, Card, Container} from '@material-ui/core';
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
    },
    register:{
        fontSize:'20px'
    },
    hidepassword:{
        fontSize:'20px'
    },
    remember:{
        fontSize:'20px'
    },
    button:{
        color:'blue'
    },
    blank:{
        paddingTop:'5rem'
    }
    
})

const UserForm = ( props ) => 
{
    const setToken = props.setToken;
    const setCurrentUser = props.setCurrentUser;
    const classes = useStyles();

    const [ register, setRegister ] = useState( false );
    const [ username, setUsername ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ firstName, setFirstName ] = useState( "" );
    const [ lastName, setLastName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ message, setMessage ] = useState( "" );
    const [ hidden, setHidden ] = useState( true );
    const [ remember, setRemember ] = useState( true );
    
    //message manager
    useEffect( () =>
    {
        if ( confirmPassword && register )
        {
            if ( confirmPassword !== password )
            {
                let output = "Password match o=matching character, x=wrong character, _=missing character, *=extra character:";
                for ( let i = 0; i < password.length || i < confirmPassword.length; i++)
                {
                    if ( i < password.length )
                    {
                        if ( i < confirmPassword.length )
                        {
                            if ( password.charAt(i) === confirmPassword.charAt(i) )
                            {
                                output += "o";
                            }
                            else
                            {
                                output += "x";
                            }
                        }
                        else
                        {
                            output += "_";
                        }
                    }
                    else
                    {
                        output += "*";
                    }
                }
                setMessage( output );
            }
            else
            {
                setMessage( "Passwords match!" );
            }
        }
        else
        {
            setMessage( "Enter all active fields to " + ( register ? "register" : "login" ) + "." );
        }
    }, [ password, confirmPassword, register ] );

    return  <>
    <Container className={classes.blank}></Container>
    <Container className={classes.page} onSubmit = { async ( event ) =>
    {
        event.preventDefault();
        callApi(
        {
            url: `users/${ register ? "register" : "login" }`,
            method: "POST",
            body:
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password
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
                        name: response.username
                    });
                    if ( remember )
                    {
                        localStorage.setItem( "token", response.token );
                        localStorage.setItem( "username", response.username );
                        localStorage.setItem( "id", response.id );
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
        <Typography className ={classes.register}>
            <input type = "checkbox" checked = { register } value = { register }  onChange = { () =>
            {
                setRegister(!register);
            }}/>
            <label htmlFor = "Register"> Register</label>
        </Typography>
        <TextField required type = "text" placeholder = "Username" value = { username } onChange = { ( event ) =>
        {
            setUsername( event.target.value );
        }}/>

        <TextField required type = { hidden ? "password" : "text" } placeholder = "Password" value = { password } onChange = { ( event ) =>
        {
            setPassword( event.target.value );
        }}/>

        <TextField required type = "password" disabled = { !register } placeholder = "Confirm Password" value = { confirmPassword } onChange = { ( event ) =>
        {
            setConfirmPassword( event.target.value );
        }}/>

        <Typography className ={classes.hidepassword}>
            <input type = "checkbox" checked = { hidden } value = { hidden }  onChange = { () =>
            {
                setHidden ( !hidden );
            }}/>
            <label htmlFor = "Hide Password"> Hide Password</label>
        </Typography>
        <TextField required type = "text" disabled = { !register } placeholder = "First Name" value = { firstName } onChange = { ( event ) =>
        {
            setFirstName( event.target.value );
        }}/>

        <TextField required type = "text" disabled = { !register } placeholder = "Last Name" value = { lastName } onChange = { ( event ) =>
        {
            setLastName( event.target.value );
        }}/>

        <TextField required type = "email" pattern = ".+@.+" disabled = { !register } placeholder = "Email" value = { email } title = "Please provide a valid email address like: someName@someSite" onChange = { ( event ) =>
        {
            setEmail( event.target.value );
        }}/>

        <Typography className={classes.remember}>
            <input type = "checkbox" checked = { remember } value = { remember }  onChange = { () =>
            {
                setRemember( !remember );
            }}/>
            <label htmlFor = "Remember Me"> Remember Me</label>
        </Typography>

        <Typography>{ message }</Typography>

        <Button className={classes.button} type = "submit" disabled = { !username || !password || ( register && ( password !== confirmPassword || !firstName || !lastName|| !email ) ) }>{ register ? "Register" : "Login" }</Button>
    </Container></>
}

export default UserForm;