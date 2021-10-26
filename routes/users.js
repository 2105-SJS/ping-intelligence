const express=require('express');
const jwt=require('jsonwebtoken');
const {createUser,getUser,getUserByUserName}=require('../db')
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
            if(user)
            {
                const token=jwt.sign(
                {
                    id:user.id,
                    username:user.username
                },
                process.env.JWT_SECRET,
                {expiresIn:'1w'}
                );
                user.token=token;
            }
            res.send(user);

        }
        else
        {
            throw Error('invalid username/password: must have a username and a password 8 characters or longer.');
        }
    }
    catch(error)
    {
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
            if(user)
            {
                const token=jwt.sign(
                {
                    id:user.id,
                    username:user.username,
                },
                process.env.JWT_SECRET,
                {expiresIn:'1w'}
                );
                user.token=token;
            }
            res.send(user);
        }
        else
        {
            throw Error('invalid username/password');
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
                const user= await getUserByUserName(req.auth.username);
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