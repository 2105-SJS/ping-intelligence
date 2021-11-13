import React, { useState,useEffect } from 'react';
import {callApi} from '../util';

const Login = ({setToken, setCurrentUser, fetchUserRoutines}) => 
{
    const [register,setRegister]=useState(false);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const [message,setMessage]=useState("");
    const [hidden,setHidden]=useState(true);
        
    return <form onSubmit={async(event)=> {
            event.preventDefault();
            let response;
            if (register) {
                response = await callApi(
                {
                    url:`users/register`,
                    method:"POST",
                    body: { username, password }
                });
            } else {
                response = await callApi(
                    {
                        url:`users/login`,
                        method:"POST",
                        body: { username, password }
                    });
            };            
            if(response) {
                setToken(response.token);
                setMessage("You are logged in.");
                setCurrentUser({
                    id: response.id,
                    name: response.username
                });
                localStorage.setItem("token",response.token);
                localStorage.setItem("username",response.user.username);
                localStorage.setItem("id",response.user.id);
                await fetchUserRoutines();
            };
        }}>
        <div>
            <input type="checkbox" checked={register} value={register}  onChange={()=>
            {
                setRegister(!register);
            }}/>
            <label htmlFor="Register">Register</label>
        </div>
        <input required type="text" placeholder="Username" value={username} onChange={(event)=>
        {
            setUsername(event.target.value);
        }}/>

        <input required type={hidden ? "password": "text"} placeholder="Password" value={password} onChange={(event)=>
        {
            setPassword(event.target.value);
        }}/>

        <input required type="password" disabled={!register} placeholder="Confirm Password" value={confirmPassword} onChange={(event)=>
        {
            setConfirmPassword(event.target.value);
        }}/>

        <div>
            <input type="checkbox" checked={hidden} value={hidden}  onChange={()=>
            {
                setHidden(!hidden);
            }}/>
            <label htmlFor="Hide Password">Hide Password</label>
        </div>

        <p>{message}</p>

       { register
            ? <button type="submit" disabled={!username || !password || password.length < 8 || password !== confirmPassword}>Register</button>
            : <button type="submit" disabled={!username || !password || password.length < 8}>Login</button>
        }
    </form>
}

export default Login;