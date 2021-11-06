import React from 'react';
const User = ( props ) => 
{
    const user = props.user;

    return<>
        <h2>Username:{ user.username }</h2>
        {user.firstName ? <h3>First Name:{ user.firstName }</h3> : null}
        {user.lastName ? <h3>Last Name:{ user.lastName }</h3> : null}
    </>;
}

export default User;