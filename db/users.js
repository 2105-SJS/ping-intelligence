const bcrypt=require('bcrypt');
const {client}=require('./index');

const createUser= async({firstName,lastName,email,username,password})=>
{
    try 
    {
        if(emailCheck(email))
        {
            const{rows:user}=await client.query(
            `INSERT INTO users("firstName","lastName",email,username,password)
            VALUES($1,$2,$3,$4,$5)
            ON CONFLICT (email,username)
            DO NOTHING
            RETURNING id,"firstName","lastName",email,username`,
            [firstName,lastName,email,username,await bcrypt.hash(password,10)]
            );
            return user;
        }
        else
        {
            throw Error("invalid email");
        }
    }
    catch (error) 
    {
        throw error;
    }
}

const emailCheck=(email)=>
{
    return /.+?@.+?\..+?/.test(email);
}


const getUser=async({username,password})=>
{

}

const getAllUsers=async()=>
{

}

const getUserById=async(id)=>
{
    
}

const getUserByUsername=async(username)=>
{
    
}

module.exports=
{
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
}