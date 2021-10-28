import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';
import Home from './Home';

import {
    getSomething
} from '../api';

const App = () => {
    const [message, setMessage] = useState('');
    const [token,setToken]=useState(localStorage.getItem("token")||"");
    const [currentUser,setCurrentUser]=useState(
    {
        id:Number(localStorage.getItem("id")),
        name:localStorage.getItem("username")
    }||{});


    useEffect(() => 
    {
        getSomething()
        .then(response => 
        {
            setMessage(response.message);
        })
        .catch(error => 
        {
            setMessage(error.message);
        });
    });

    return <div className="App">
        <h1>Hello, World!</h1>
        <h2>{ message }</h2>
        <BrowserRouter>
            <NavBar token={token}></NavBar>

            <Users setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            
            <Switch>
                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                {/*
                Example routes

                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                <Route exact path ="/routines/">
                    <Routines token={token} currentUser={currentUser}></Routines>
                </Route>

                <Route exact path ="/myroutines/">
                    <MyRoutines token={token} currentUser={currentUser}></MyRoutines>
                </Route>

                <Route exact path ="/activities/">
                    <Activities token={token}></Activities>
                </Route>
                */}

                <Route path="/*">
                    <Component404></Component404>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>;
import { Route, Link, BrowserRouter } from 'react-router-dom';

import {
  Products,
  NewProduct,
} from './index';

import { callApi } from '../util';
const { REACT_APP_BASE_URL } = process.env;


const App = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState([]);
    const [userId, setUserId] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    
    const fetchProducts = async () => {
        try {
            const respObj = await callApi({
            url: `/products`,
            token
            });
            if(respObj)
            {
                const productResponse = respObj.data.products;
                if (productResponse) setProducts(productResponse); 
            }
        } catch (error) {
            throw error;
        }
        
        
    }

    useEffect(() => {
        try {
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    return <div>
        <header className="site-banner">
            <BrowserRouter>
            <Link to='/' className='emblem'><h1>Underground Cars</h1></Link>
            <div className='nav-bar'>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
             
                {
                    token ? <Link to='/user/login' className='nav-link' onClick={() => setToken('')}>Log Out</Link> : <Link to='/users/login' className='nav-link'>Login</Link>
                }
            </div>
            </BrowserRouter>
        </header>
        <footer />
    </div>
}
}
export default App;

// import React, { useState, useEffect } from 'react';

// import {
//   getSomething
// } from '../api';

// const App = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     getSomething()
//       .then(response => {
//         setMessage(response.message);
//       })
//       .catch(error => {
//         setMessage(error.message);
//       });
//   });

//   return (
//     <div className="App">
//       <h1>Hello, World!</h1>
//       <h2>{ message }</h2>
//     </div>
//   );
// }

// export default App;
