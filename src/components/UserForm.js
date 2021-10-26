import React, { useState,useEffect } from 'react';
//import APIFetch from './api';

const UserForm = (props) => 
{
    const setToken=props.setToken;
    const setUser=props.setUser;


    const [register,setRegister]=useState(false);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");

    const [message,setMessage]=useState("");
    const [hidden,setHidden]=useState(true);
    const [remember,setRemember]=useState(true);
    
    //message manager
    useEffect(()=>
    {
        if(confirmPassword&&register)
        {
            if(confirmPassword!==password)
            {
                let output="Password match o=matching character, x=wrong character, _=missing character, *=extra character:";
                for(let i=0;i<password.length||i<confirmPassword.length;i++)
                {
                    if(i<password.length)
                    {
                        if(i<confirmPassword.length)
                        {
                            if(password.charAt(i)===confirmPassword.charAt(i))
                            {
                                output+="o";
                            }
                            else
                            {
                                output+="x";
                            }
                        }
                        else
                        {
                            output+="_";
                        }
                    }
                    else
                    {
                        output+="*";
                    }
                }
                setMessage(output);
            }
            else
            {
                setMessage("Passwords match!")
            }
        }
        else
        {
            setMessage("Enter all active fields to "+(register?"register":"login")+".");
        }
    },[password,confirmPassword,register])

    return <form onSubmit={async(event)=>
    {
            event.preventDefault();
            /*const response= await APIFetch(
            {
                url:`users/${register?"register":"login"}`,
                method:"POST",
                body:
                {
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    username:username,
                    password:password
                }
            }
            );
            console.log(response);

            if(response.token)
            {
                setToken(response.token);
                setMessage("You are logged in.");
                setUser(
                {
                    id:response.user.id,
                    name:response.user.username
                });
                if(remember)
                {
                    localStorage.setItem("token",response.token);
                    localStorage.setItem("username",response.user.username);
                    localStorage.setItem("id",response.user.id);
                }
            }
            else
            {
                setMessage(response.error);
            }
            */
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
        <input required type="text" disabled={!register} placeholder="First Name" value={firstName} onChange={(event)=>
        {
            setFirstName(event.target.value);
        }}/>

        <input required type="text" disabled={!register} placeholder="Last Name" value={lastName} onChange={(event)=>
        {
            setLastName(event.target.value);
        }}/>

        <input required type="email" pattern=".+@.+" disabled={!register} placeholder="Email" value={email} title="Please provide a valid email address like: someName@someSite" onChange={(event)=>
        {
            setEmail(event.target.value);
        }}/>

        
        

        
        <div>
            <input type="checkbox" checked={remember} value={remember}  onChange={()=>
            {
                setRemember(!remember);
            }}/>
            <label htmlFor="Remember Me">Remember Me</label>
        </div>

        <p>{message}</p>

        <button type="submit" disabled={!username||!password||(register&&password!==confirmPassword&&!firstName&&!lastName&&!email)}>{register?"Register":"Login"}</button>
    </form>
}

export default UserForm;