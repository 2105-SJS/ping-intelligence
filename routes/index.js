const apiRouter = require('express').Router();
const usersRouter=require('./users')

//Check authorization before anything else
//JWT Authorization
apiRouter.use(async (req,res,next)=>
{
    const authHeader=req.header('Authorization');
    if(!authHeader)//skip if empty
    {
        next();
    }
    else try
    {
        if(req.auth)//make sure authorization is only from here
        {
            delete req.auth;
        }
        const auth=authHeader.slice(7);
        
        const{id,username}=jwt.verify(auth,JWT_SECRET);
        if(id&&username)
        {
            req.auth=await getUserById(id);
            if(req.auth&&req.auth.username===username)
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
    catch(error)
    {
        next(error);
    }
});


apiRouter.get("/", (req, res, next) => {
    res.send({
        message: "API is under construction!"
    });
});

apiRouter.use('/users',usersRouter);

module.exports = apiRouter;
