import React from 'react';
import {Typography} from "@material-ui/core"
const Home = ( props ) => 
{
  const currentUser = props.currentUser;
  return <Typography variant ="h5" >Welcome { currentUser && currentUser.name ? currentUser.name : "to Underground Cars" }</Typography>
}
export default Home;