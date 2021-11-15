import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';
import Home from './Home';
import Account from './Account';
import { callApi } from '../util';
import Product from './Product';
import Cart from './Cart';
import AllUsers from './AllUsers';
import AdminUserForm from './AdminUserForm';
import Orders from './Orders';
import ProductsAll from './ProductsAll';
import { makeStyles } from '@material-ui/core'

<<<<<<< HEAD
// /* do these need an import or something? commented out as temp fix 
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";


const { REACT_APP_BASE_URL } = process.env;
=======
const useStyles = makeStyles({
    page:{
      backgroundColor:'#e46400',
      minHeight:'100vh',
      paddingTop:'1.5rem',
      paddingBottom:'1.5rem'
    }
  })
>>>>>>> dev

const App = () => 
{
    const classes = useStyles();
    const [ products, setProducts ] = useState( [] );
    const [ order, setOrder ] = useState( [] );
    const [ token, setToken ] = useState ( localStorage.getItem( "token" ) || "" );
    const [ currentUser, setCurrentUser ] = useState(
    {
        id: Number( localStorage.getItem( "id" ) ),
        name: localStorage.getItem( "username" ),
        admin: Boolean( localStorage.getItem( "admin" ) )
    } || {} );
    const [ cart, setCart ] = useState( {} );

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

    const getCart = async () => {
        try {
            const respObj = await callApi({ url: 'orders/cart', token})
            if (respObj) {
                setCart(respObj);
            }
            else
            {
                setCart( {} );
            };
        } catch (error) {
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

    useEffect( () => {
        try {
            if ( token )
            {
                getCart();
            }
        } catch (error) {
            throw error;
        }

    }, [ token ] );

    return <div className = {classes.page}>
        <BrowserRouter>
            <header className = "site-banner">
                <NavBar currentUser = { currentUser }></NavBar>
            </header>
                      
            <Switch>
                <Route exact path = "/">
                    <Home currentUser = { currentUser }></Home>
                </Route>

                <Route exact path = "/products/">
                    <ProductsAll products = { products } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts } cart = { cart } getCart = { getCart }></ProductsAll>
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
                    <Orders order={order} setOrder={setOrder} token={token}/> 
                </Route>

                <Route exact path = "/cart/checkout/">
                    <Cart token = { token } currentUser = { currentUser } cart = { cart }></Cart>
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