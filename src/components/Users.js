import React from 'react';
import UserForm from './UserForm';
import { Typography, Button} from '@material-ui/core';
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
    },
    button:{
        backgroundColor:'#ff0100',
        color:'white'
    } 
})

const Users = (props) => 
{
    const classes=useStyles();
    const setToken = props.setToken;
    const currentUser = props.currentUser;
    const setCurrentUser = props.setCurrentUser;

    return currentUser && currentUser.id ? 
    <>
        <Typography className={classes.page}>
        <h2>Logged in as { currentUser.name }</h2>
        <Button size="small" className = {classes.button} onClick = { ( event ) =>
        {
            event.preventDefault();
            setToken( "" );
            setCurrentUser( {} );
            localStorage.removeItem( "id" )
            localStorage.removeItem( "username" );
            localStorage.removeItem( "token" );
            localStorage.removeItem( "admin" );
        }
        }>Logout</Button>
        </Typography>
    </>:<UserForm setToken = { setToken } setCurrentUser = { setCurrentUser }></UserForm>
}

export default Users;