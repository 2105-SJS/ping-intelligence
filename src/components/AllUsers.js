import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import User from './User';
import { Grid } from '@material-ui/core';

const AllUsers = ( props ) =>
{
    const token = props.token;
    const currentUser = props.currentUser;

    const [ allUsers, setAllUsers ] = useState( [] );

    useEffect( () =>
    {
        callApi(          
        {
            url: `users/`,
            method: "GET",
            token: token
        } )
        .then( ( response ) =>
        {
            if ( response )
            {
                setAllUsers( response );
            }
            else
            {
                setAllUsers( [] );
            }
        } )
    }, [ token ] );

    return <Grid container>
        { currentUser && currentUser.admin === true ? allUsers.map( ( user ) => 
        {
            return <Grid key = { user.id } item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } > 
                <User key = { user.id } user = { user } currentUser = { currentUser } ></User>
            </Grid>;
        } ) : <>You must be logged in as an admin to view this page.</> }
    </Grid>;
}

export default AllUsers;