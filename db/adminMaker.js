require('dotenv').config();
const bcrypt = require('bcrypt');
const { client } = require('./client');

const { ADMIN_USER, ADMIN_PASS } = process.env;


const createAdmin = async() =>
{
    try 
    {
        console.log('start');
        client.connect();
        const { rows: [ user ] } = await client.query(
        `INSERT INTO users("firstName","lastName",email,username,password,"isAdmin")
        VALUES($1,$2,$3,$4,$5,$6)
        ON CONFLICT
        DO NOTHING
        RETURNING id,"firstName","lastName",email,username;`,
        [ "test", "admin", "admin@test.com", ADMIN_USER, await bcrypt.hash( ADMIN_PASS, 10 ), true ]
        );
        console.log(user+" created");
    }
    catch ( error ) 
    {
        throw error;
    }
    finally
    {
        client.end();
    }
}
createAdmin();