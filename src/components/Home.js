import React from 'react';
import {Typography} from "@material-ui/core"
import { makeStyles } from '@material-ui/core';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles({
  image:{
    display:'flex',
    justifyContent:'center',
    maxWidth:'100vw',
    height:'750px',
    alignItems:'center',
    marginTop:'2rem',
    marginLeft:'2.5rem',
    marginBottom:'2rem'
  },
  banner:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e46400',
    color:'white'
  },
  backimage:{
    backgroundColor:'#e46400'
  }


})

const Home = ( props ) => 
{
  const styles = useStyles();
  const currentUser = props.currentUser;
  return <div>
  <Typography variant ="h4" className = {styles.banner} >🏁 Welcome { currentUser && currentUser.name ? currentUser.name : "to Tycoon Cars 🏁" }</Typography>
  <div className={styles.backimage}>
    <img className = {styles.image} src='https://i.imgur.com/ox1jIss.jpeg' alt='banner'/>
  </div>
  </div>
}
export default Home;