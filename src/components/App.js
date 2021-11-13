import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';
import Home from './Home';
import Account from './Account';
import { NewProduct, } from './index';
import { callApi } from '../util';
import Product from './Product';
import Cart from './Cart';
import AllUsers from './AllUsers';
import AdminUserForm from './AdminUserForm';
import Login from './Login';
import Orders from './Orders';
import Order from './Order';
import ProductsAll from './ProductsAll';

/* do these need an import or something? commented out as temp fix 
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
*/

const { REACT_APP_BASE_URL } = process.env;

const App = () => 
{
    const [ products, setProducts ] = useState( [] );
    const [ productId, setProductId ] = useState( '' );
    const [ productName, setProductName ] = useState( [] );
    const [ description, setDescription ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ message, setMessage ] = useState( '' );
    const [ userData, setUserData ] = useState({});
    const [ cart, setCart ] = useState({});
    const [ orders, setOrders ] = useState( [] );
    const [ token, setToken ] = useState ( localStorage.getItem( "token" ) || "" );
    const [ currentUser, setCurrentUser ] = useState(
    {
        id: Number( localStorage.getItem( "id" ) ),
        name: localStorage.getItem( "username" ),
        admin: localStorage.getItem( "admin" )
    } || {} );
    const [ localCart, setLocalCart ] = useState( {} );

    useEffect( () =>
    {
        setLocalCart( JSON.parse( localStorage.getItem( "order" ) ) );
    },
    []);

    const fetchProducts = async () => {
        try {
            const respObj = await callApi( {
            url: `products/`,
            token
            });
            if ( respObj && respObj.allProducts )
            {
                setProducts( respObj.allProducts ); 
            }
        } catch ( error ) {
            throw error;
        }     
    }
   
    useEffect( () => 
    {
        try 
        {
            fetchProducts();
        } catch ( error ) 
        {
            console.error( error );
        }
      
    }, [token]);

    const makeCart = async () => {
        try { 
            const rep = callApi({ 
                method: 'POST', 
                url: '/orders',
                token
            });
            if(resp) { 
                setCart(resp);
            }
        } catch (error) {
            throw error; 
        }
    }

    const grabCart = async () => {
        try { 
            const resp = await callApi({ 
                url: 'orders/cart',
                token
            })
            if (!resp) { 
                makeCart();
                grabCart();
            }
            if (resp) { 
                setCart(resp);
                localStorage.setItem('cart', JSON.stringify(resp));
            }
        } catch (error) {
            throw error
        }
    }

    const grabOrders = async () => { 
        try {
            console.log('token>>>', token);
                const resp = await callApi({
                    url: '/orders',
                    token
                });
                console.log('>>>>>orderResp', resp)
                if (resp) { 
                    setOrders(resp);
                };
        } catch (error) {
            throw error
        }
    }

    useEffect( () =>
    {
        try 
        {
            grabOrders();
        } catch ( error ) 
        {
            console.error( error );
        }
      
    }, []);

const allProps = { 
    grabOrders,
    grabCart,
    fetchProducts,

    orders,
    setOrders,
    token,
    setToken,
    cart,
    setCart,
    currentUser,
    setCurrentUser,
    products,
    setProducts,
    userData,
    setUserData
}

    return <div className = "App">
        <BrowserRouter>
            <header className = "site-banner">
                <NavBar currentUser = { currentUser }></NavBar>
            </header>
        
            {/* <Users setToken = { setToken } setCurrentUser = { setCurrentUser } currentUser = { currentUser }/> */}
            
            <Switch>
                <Route exact path = "/">
                    <Home currentUser = { currentUser }></Home>
                </Route>

                <Route exact path = "/products/">
                    <ProductsAll products = { products } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }></ProductsAll>
                </Route>

                <Route exact path = "/products/:productId">
                    <Product products = { products } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts }></Product>
                </Route>

                <Route exact path = "/account/">
                    <Account token = { token }></Account>
                </Route>

                <Route exact path = "/users/">
                    <AllUsers token = { token } currentUser = { currentUser }></AllUsers>
                </Route>

                <Route exact path = { [ "/users/add/", "/users/:userId/" ] } >
                    <AdminUserForm token = { token } currentUser = { currentUser }></AdminUserForm>
                </Route>

                <Route exact path='/orders'> 
                    <Orders {...allProps} />
                </Route>

                <Route exact path='/orders/:orderId'> 
                    <Order userData={userData} orders={orders} setOrders={setOrders} products={products} token={token} /> 
                </Route>

                <Route exact path = "/cart/checkout/">
                    <Cart token = { token } currentUser = { currentUser } localCart = { localCart }></Cart>
                </Route>    

                <Route path="/accounts/register">
                    <Users setToken = { setToken } setCurrentUser = { setCurrentUser } currentUser = { currentUser }/>
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