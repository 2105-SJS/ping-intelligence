const express=require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const {JWT_SECRET}=process.env;
const {createUser,getUser,getUserByUsername}=require('../db')
const usersRouter=express.Router();

usersRouter.post('/register',async(req,res,next)=>
{
    try 
    {
        if(req.body.username&&req.body.password&&req.body.password.length>=8&&req.body.firstName&&req.body.lastName&&req.body.email)
        {
            const user=await createUser(
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                username:req.body.username,
                password:req.body.password
            });
            if(user&&user.id)
            {
                const token=jwt.sign(
                {
                    id:user.id,
                    username:user.username
                },
                JWT_SECRET,
                {expiresIn:'1w'}
                );
                user.token=token;
            }
            else
            {
                res.send('{"message":"Username/Email in use already."}');
            }
            res.send(user);

        }
        else
        {
            res.send('{"message":"invalid username/password: must have a username and a password 8 characters or longer."}');
        }
    }
    catch(error)
    {
        console.log(error);
        next(error);
    }
});


usersRouter.post('/login',async(req,res,next)=>
{
    try 
    {
        if(req.body.username&&req.body.password)
        {
            const user=await getUser(
            {
                username:req.body.username,
                password:req.body.password
            });
            if(user&&user.id)
            {
                const token=jwt.sign(
                {
                    id:user.id,
                    username:user.username,
                },
                JWT_SECRET,
                {expiresIn:'1w'}
                );
                user.token=token;
                res.send(user);
            }
            else
            {
                res.send('{"message":"Invalid username/password"}');
            }
        }
        else
        {
            res.send('{"message":"Missing username/password"}');
        }
    }
    catch(error)
    {
        next(error);
    }
});

usersRouter.get('/me',async(req,res,next)=>
{
    try 
    {
            if(req.auth)
            {
                const user= await getUserByUsername(req.auth.username);
                res.send(user);
            }
            else
            {
                next('Invalid Credentials')
            }
    }
    catch(error)
    {
        next(error);
    }
});




module.exports=usersRouter;