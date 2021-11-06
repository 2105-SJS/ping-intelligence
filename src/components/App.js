import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';
import Home from './Home';
import Account from './Account';
import {
  NewProduct,
} from './index';
import { callApi } from '../util';
import Products from './Product';

const { REACT_APP_BASE_URL } = process.env;

const App = () => {

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [token,setToken]=useState(localStorage.getItem("token")||"");
    const [currentUser,setCurrentUser]=useState(
    {
        id:Number(localStorage.getItem("id")),
        name:localStorage.getItem("username")
    }||{});

    const fetchProducts = async () => {
        try {
            const respObj = await callApi({
            url: `products/`,
            token
            });
            if(respObj&&respObj.allProducts)
            {
                setProducts(respObj.allProducts); 
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


    return <div className="App">

        <BrowserRouter>
            <header className="site-banner">
                <NavBar token={token}></NavBar>
            </header>
        
            <Users setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            
            <Switch>
                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                <Route exact path ="/products/">
                    <Products products={products}></Products>
                </Route>

                <Route exact path="/account/">
                    <Account token={token}></Account>
                </Route>
                <Route path="/*">
                    <Component404></Component404>
                </Route>
            </Switch>
        </BrowserRouter>
        <footer />
    </div>;
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
