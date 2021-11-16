import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
{
    userCard:{
        border:'2px solid black',
        padding: '5px'
    }
} );

const User = ( props ) => 
{
    const user = props.user;
    const currentUser = props.currentUser;

    const classes = useStyles();

    return <Card className = { classes.userCard } style = { { margin: '1.2rem' } } >
        <CardActionArea>
            <Typography>
                <h2>{ currentUser && currentUser.admin === true ?
                <NavLink to = { `/users/${ user.id }/` }>Username:{ user.username }</NavLink> :
                <> Username:{ user.username } </> }</h2>
            </Typography>
            <Typography>
                {user.firstName ? <h3>First Name:{ user.firstName }</h3> : null}
            </Typography>
            <Typography>
                {user.lastName ? <h3>Last Name:{ user.lastName }</h3> : null}
            </Typography>
        </CardActionArea>
    </Card>;
}

export default User;