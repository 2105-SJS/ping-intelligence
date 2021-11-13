const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

const express = require('express');
const apiRouter = express.Router();

//routes
const usersRouter = require('./users')
apiRouter.use( '/users', usersRouter );

const productsRouter = require('./products')
apiRouter.use( '/products', productsRouter );

//Check authorization before anything else
//JWT Authorization
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if(!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET)
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message}) {
            next ({ name, message });
        };
    } else {
        next ({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    };
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