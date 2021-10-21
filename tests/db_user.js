//initalize userSettings

require('dotenv').config();
const bcrypt=require('bcrypt');
const{client}=require('../index');


const{createUser,getUser,getAllUsers,getUserById,getUserByUsername}=require('../db');


const emailGenerator=(num,idx)=>
{
    const localArr=["",".dot","+plus", "/slash",'"quote space"', '"quote..doubleDot"',"%modulus","endDash-"];
    const domainArr=["",".com","-dash.com",".org",".net",".gov"];
    return "basic"+localArr[idx!==undefined?idx%localArr.length:
    Math.random()*localArr.length]+num+"@test"+
    domainArr[idx!==undefined?idx%domainArr.length:
    Math.random()*domainArr.length];
}

const passwordGenerator=()=>
{
    const length=Math.random()*11+8;//make a password with 8-18 characters
    const codeArr=[];
    for(let i=0;i<length;i++)
    {
        codeArr.push(Math.random()*65536)//use any charcode
    }
    return String.fromCharCode(...codeArr);//return constructed string
}

console.log("db users test start");
const usersArray=[];
for(let i=1;i<=100;i++)
{
    usersArray[i-1]=
    {
        firstName:"first"+i,
        lastName:"last"+i,
        email:emailGenerator(),
        username:"testUser"+i,
        password:passwordGenerator()
    }
    const created=await createUser(usersArray[i-1]);
    console.log("createUser returns a user object:",created,
    "with id:",created.id,
    "firstName:",created.firstName,
    "lastName:",created.lastName,
    "email:",created.email,
    "username:",created.username);
}

