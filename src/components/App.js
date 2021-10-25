import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

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
        const respObj = await callApi({
            url: `/products`,
            token
        });
        const productResponse = respObj.data.products;
        if (productResponse) setProduct(productResponse);
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
            <Link to='/' className='emblem'><h1>Underground Cars</h1></Link>
            <div className='nav-bar'>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/products" className="nav-link">Products</Link>
             
                {
                    token ? <Link to='/user/login' className='nav-link' onClick={() => setToken('')}>Log Out</Link> : <Link to='/users/login' className='nav-link'>Login</Link>
                }
            </div>
        </header>
        <footer />
    </div>
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

