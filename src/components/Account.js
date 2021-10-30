import React, { useEffect, useState } from 'react';
import { callApi } from '../util';
import User from './User';



const Account=(props)=>
{
    const token=props.token;

    const [user,setUser]=useState({});

    useEffect(()=>
    {
        callApi(            
        {
            url:`users/me`,
            method:"GET",
            token:token
        })
        .then((response)=>
        {
            if(response&&response.id)
            {
                setUser(response);
            }
            else
            {
                setUser({});
            }
        })
    },[token])

    return <>{user && user.id ? <User user={user}></User>:<>You must be logged in to view this page.</>}</>;
}

export default Account;