import React from 'react';
import { NavLink } from 'react-router-dom';
const User = ( props ) => 
{
    const user = props.user;
    const currentUser = props.currentUser;

    return<>
        { currentUser && currentUser.admin ?
        <NavLink to = { `/users/${ user.id }/` }>Username:{ user.username }</NavLink> :
        <h2>Username:{ user.username }</h2>}
       
        {user.firstName ? <h3>First Name:{ user.firstName }</h3> : null}
        {user.lastName ? <h3>Last Name:{ user.lastName }</h3> : null}
    </>;
}

export default User;