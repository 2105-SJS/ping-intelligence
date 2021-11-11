const { createUser } = require("./users") ;

const { ADMIN_USER, ADMIN_PASS } = process.env;


const createAdmin = () => async
{
    console.log( (await createUser(
    {
        firstName: "test",
        lastName: "admin",
        email: "admin@test.com",
        username: ADMIN_USER,
        password: ADMIN_PASS
    } ) ) );
}

createAdmin();