import React from 'react';

const Home = (props) => 
{
  const currentUser=props.currentUser;
  return <h1>Welcome {currentUser?currentUser.name:"to Underground Cars"}</h1>
}

export default Home;