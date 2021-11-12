import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ( props ) =>
{
    const currentUser = props.currentUser;

    return <h2 className = 'nav-bar'>
        <NavLink to = "/">Home</NavLink>|
        <NavLink to = "/products/">Products</NavLink>|
        { currentUser && currentUser.id ? <><NavLink to="/account/">Account</NavLink>|</> : null}
        { currentUser && currentUser.admin ? <>
            <NavLink to="/users/">Users</NavLink>
            <NavLink to="/users/add">AddUser</NavLink>
        </> : null}
        <NavLink to = "/cart/checkout/">View Cart</NavLink>
    </h2>
}

export default NavBar;