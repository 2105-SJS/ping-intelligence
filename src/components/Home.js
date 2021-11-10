import React from 'react';
import {Typography} from "@material-ui/core"
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  image:{
    maxWidth:'100vw'
  },
  banner:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e46400',
    color:'white'

  }

})

const Home = ( props ) => 
{
  const styles = useStyles();
  const currentUser = props.currentUser;
  return <div>
  <Typography variant ="h4" className = {styles.banner} >Welcome { currentUser && currentUser.name ? currentUser.name : "to Carzilla" }</Typography>
  <div id = "homeimage">
    <img className = {styles.image} src='https://i.imgur.com/ox1jIss.jpeg' alt='banner'/>
  </div>
  </div>
}
export default Home;