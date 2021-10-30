import React from 'react';
import { useParams } from 'react-router-dom';


const Component404=()=>
{
    const params=useParams();
    const url=params[0];
    return <h1>404 Error: Page for {url} does not exist.</h1>
}

export default Component404;