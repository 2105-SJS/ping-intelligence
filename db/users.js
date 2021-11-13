const bcrypt = require('bcrypt');
const { client } = require('./client');

const createUser = async( { firstName, lastName, email, username, password } ) =>
{
    try 
    {
        if ( emailCheck( email ) )
        {
            const { rows: [ user ] } = await client.query(
            `INSERT INTO users("firstName","lastName",email,username,password)
            VALUES($1,$2,$3,$4,$5)
            ON CONFLICT
            DO NOTHING
            RETURNING id,"firstName","lastName",email,username;`,
            [ firstName, lastName, email, username, await bcrypt.hash( password, 10 ) ]
            );
            return user;
        }
        else
        {
            throw Error( "invalid email" );
        }
    }
    catch ( error ) 
    {
        throw error;
    }
}

const emailCheck = ( email ) =>
{
    return /.+?@.+?/.test( email );
}


const getUser = async ( { username, password } ) =>
{
    try
    {
        const { rows: [ user ] } = await client.query(
        `SELECT *
        FROM users 
        WHERE username=$1;`,
        [ username ]    
        );
        if ( user && await bcrypt.compare( password, user.password ) )
        {
            delete user.password;//dont expose password unless required to
            return user;
        }
        else
        {
            return;
        }
    }
    catch ( error )
    {
        throw error;
    }
}

const getAllUsers = async () =>
{
    const { rows: users } = await client.query(
    `SELECT id,"firstName","lastName",email,username
    FROM users;`   
    );
    return users;
}

const getUserById = async ( id ) =>
{
    try
    {
        const { rows: [ user ] } = await client.query(
        `SELECT *
        FROM users 
        WHERE id=$1;`,
        [ id ]    
        );
        delete user.password;//dont expose password unless required to
        return user;
    }
    catch ( error )
    {
        throw error;
    }
}

const getUserByUsername = async ( username ) =>
{
    try
    {
        const { rows: [ user ] } = await client.query(
        `SELECT *
        FROM users 
        WHERE username=$1;`,
        [ username ]    
        );
        delete user.password;//dont expose password unless required to
        return user;
    }
    catch( error )
    {
        throw error;
    }
}

module.exports =
{
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
}