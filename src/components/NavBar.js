import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    image:{
      maxWidth:'100vw'
    },
    NavBar:{  
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#e46400',
        color:'white',
        paddingTop:'.5rem'
    },
    rightNav:{
        display:'flex',
        flexFlow:'row',
        justifyContent:'space-between',
    },
    leftside:{
        display:'flex',
        flexFlow:'row',
        justifyContent:'space-between'
    },
    link:{
        marginLeft:'2rem',
        marginRight:'2rem',
        color:'white',
        fontSize:'1.5rem'
    }
  
  })

const NavBar = ( props ) =>
{
    const styles = useStyles();
    const token = props.token;

    return <div className = 'nav-bar' className={styles.NavBar}>
        <div id ='leftside'>
        <NavLink className= {styles.link} to = "/">Home</NavLink>
        <NavLink className= {styles.link} to = "/products">Products</NavLink>
        {token ? <><NavLink className= {styles.link} to="/account">Account</NavLink></> : null}
        </div>
        <div id ='rightNav'>
       <NavLink className= {styles.link} to = "/cart/checkout">View Cart</NavLink>
       <NavLink className= {styles.link} to = "/accounts/register">Profile</NavLink>
       { currentUser && currentUser.admin ? <>
            <NavLink className= {styles.link} to="/users/">Users</NavLink>
            <NavLink className= {styles.link} to="/users/add">AddUser</NavLink>
        </> : null}
        </div>
    </div>
}

export default NavBar;