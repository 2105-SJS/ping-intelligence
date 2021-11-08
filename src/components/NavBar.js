import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props)=>
{
    const token=props.token;

    return <h2 className='nav-bar'>
        <NavLink to="/">Home</NavLink>|
        <NavLink to="/products">Products</NavLink>|
        {token ? <><NavLink to="/account">Account</NavLink>|</>:null}
        <NavLink to="/cart">View Cart</NavLink>
    </h2>
}

export default NavBar;