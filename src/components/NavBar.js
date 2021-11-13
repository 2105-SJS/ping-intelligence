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
        paddingTop:'.5rem',
        height:'50px',
        padding:'10px',
    },
    rightNav:{
        display:'flex',
        flexFlow:'row',
        justifyContent:'space-between'
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
    const currentUser = props.currentUser;

    return <div className = 'nav-bar' className={styles.NavBar}>
        <div id ='leftside'>
        <NavLink className= {styles.link} to = "/">Home</NavLink>
        <NavLink className= {styles.link} to = "/products">Products</NavLink>
        { currentUser && currentUser.id ? <><NavLink className= {styles.link} to="/account">Account</NavLink></> : null}
        </div>
        <div id ='rightNav'>
       <NavLink className= {styles.link} to = "/cart/checkout">View Cart</NavLink>
       <NavLink className= {styles.link} to = "/accounts/register">Profile</NavLink>
       { currentUser && currentUser.admin ? <>
            <NavLink className= {styles.link} to="/users/">Users</NavLink>
            <NavLink className= {styles.link} to="/users/add">AddUser</NavLink>
            <NavLink className= {styles.link} to="/orders">Orders</NavLink>
        </> : null}
        </div>
    </div>
}

export default NavBar;