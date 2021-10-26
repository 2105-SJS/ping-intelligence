import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';

import {
    getSomething
} from '../api';

const App = () => {
    const [message, setMessage] = useState('');
    const [token,setToken]=useState(localStorage.getItem("token")||"");
    const [currentUser,setCurrentUser]=useState(
    {
        id:Number(localStorage.getItem("id")),
        name:localStorage.getItem("username")
    }||{});


    useEffect(() => 
    {
        getSomething()
        .then(response => 
        {
            setMessage(response.message);
        })
        .catch(error => 
        {
            setMessage(error.message);
        });
    });

    return <div className="App">
        <h1>Hello, World!</h1>
        <h2>{ message }</h2>
        <BrowserRouter>
            <NavBar token={token}></NavBar>

            <Users setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            
            <Switch>
                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                {/*
                Example routes

                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                <Route exact path ="/routines/">
                    <Routines token={token} currentUser={currentUser}></Routines>
                </Route>

                <Route exact path ="/myroutines/">
                    <MyRoutines token={token} currentUser={currentUser}></MyRoutines>
                </Route>

                <Route exact path ="/activities/">
                    <Activities token={token}></Activities>
                </Route>
                */}

                <Route path="/*">
                    <Component404></Component404>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>;
}

export default App;