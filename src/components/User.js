import React from 'react';
const Users = (props) => 
{
    const user=props.user;

    return<>
        <h2>Username:{user.username}</h2>
        <h3>First Name:{user.firstName}</h3>
        <h3>Last Name:{user.lastName}</h3>
    </>;
}

export default Users;