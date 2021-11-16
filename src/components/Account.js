import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import User from './User';
import { Typography, TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    page:{
        width:'500px',
        height:'100px',
        display:'flex',
        flexFlow:'column',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'white',
        borderRadius:'10px',
        border:'5px solid black',
        minHeight:'200px',
        marginLeft:'27rem',
        marginTop:'15rem'
    } 
})

const Account = ( props ) =>
{
    const classes = useStyles();
    const token = props.token;

    const [ user, setUser ] = useState( {} );

    useEffect( () =>
    {
        callApi(          
        {
            url: `users/me`,
            method: "GET",
            token: token
        } )
        .then( ( response ) =>
        {
            if ( response && response.id )
            {
                setUser( response );
            }
            else
            {
                setUser( {} );
            }
        } )
    }, [ token ] );

    return <>
    <Typography className={classes.page}>
        { user && user.id ? <User user = { user } ></User>:<>You must be logged in to view this page.</>}
    </Typography>
    </>
    
}

export default Account;