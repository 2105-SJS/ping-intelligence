const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

const express = require('express');
const apiRouter = express.Router();


//Check authorization before anything else
//JWT Authorization
//Check authorization before anything else
//JWT Authorization
apiRouter.use( async ( req, res, next )=>
{
    const authHeader = req.header('Authorization');
    if ( !authHeader )//skip if empty
    {
        next();
    }
    else try
    {
        if ( req.auth ) //make sure authorization is only from here
        {
            delete req.auth;
        }
        const auth = authHeader.slice( 7 );
        
        const { id, username } = jwt.verify( auth,JWT_SECRET );
        if ( id && username )
        {
            req.auth = await getUserById( id );
            if( req.auth && req.auth.username === username )
            {
                next();
            }
            else
            {
                delete req.auth;
                next('Invalid Authorization');
            }     
        }
    }
    catch ( error )
    {
        next ( error );
    }
});

//CORS enable
apiRouter.use( ( req, res, next ) => 
{
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Methods","POST,GET,UPDATE,DELETE");
    res.header("Access-Control-Allow-Headers","Authorization,Content-Type");
    next();
});

apiRouter.get("/", ( req, res, next ) => {
    res.send({
        message: "API is under construction!"
    });
});

//routes
const usersRouter = require('./users')
apiRouter.use( '/users', usersRouter );

const productsRouter = require('./products')
apiRouter.use( '/products', productsRouter );

//error handling
apiRouter.use( ( req, res ) =>
{
    res.status(404).send('request 404 error route not found');
});
apiRouter.use( ( error, req, res, next) => 
{
    console.log("hit error route:",error);
    res.status(500).send(error);
});

module.exports = apiRouter;