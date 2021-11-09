import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import User from './User';

const AllUsers = ( props ) =>
{
    const token = props.token;
    const currentUser = props.token;

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

    return <>
        { currentUser && currentUser.admin ? allUsers.map( ( user ) => 
        {
            return <User user = { user } currentUser = { currentUser } ></User>

        } ) : <>You must be logged in as an admin to view this page.</> }
    </>;
}

export default AllUsers;