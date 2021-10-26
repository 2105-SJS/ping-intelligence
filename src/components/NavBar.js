import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props)=>
{
    const token=props.token;

    return <h2 className="NavBar">
        <NavLink to="/">Home</NavLink>|
        <NavLink to="/routines/">Routines</NavLink>|
        {token ? <><NavLink to="/myroutines/">My Routines</NavLink>|</>:null}
        <NavLink to="/activities/">Activities</NavLink>
    </h2>
}

export default NavBar;