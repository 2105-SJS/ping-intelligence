import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Component404 from './404';
import Users from './Users';
import Home from './Home';
import Account from './Account';
import { NewProduct, } from './index';
import { callApi } from '../util';
import Products from './Product';
import Cart from './Cart';
import AllUsers from './AllUsers';
import AdminUserForm from './AdminUserForm';
import Login from './Login';

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
    const [ token, setToken ] = useState ( localStorage.getItem( "token" ) || "" );
    const [ currentUser, setCurrentUser ] = useState(
    {
        id: Number( localStorage.getItem( "id" ) ),
        name: localStorage.getItem( "username" ),
        admin: localStorage.getItem( "admin" )
    } || {} );
    //const [ localCart, setLocalCart ] = useState( {} );
    const [ cart, setCart ] = useState( {} );

    // useEffect( () =>
    // {
    //     setLocalCart( JSON.parse( localStorage.getItem( "order" ) ) );
    // },
    // []);

    const fetchProducts = async () => 
    {
        try {
            const respObj = await callApi( {
            url: `products/`,
            token
            });
            console.log(respObj);
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
                console.log(respObj);
                //localStorage.setItem('cart', JSON.stringify(respObj));
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
            // else
            // {
            //     setCart( JSON.parse( localStorage.getItem( 'cart' ) ) || {} );
            // }
        } catch (error) {
            throw error;
        }

    }, [ token ] );

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
                    <Products products = { products } token = { token } currentUser = { currentUser } fetchProducts = { fetchProducts } cart = { cart } getCart = { getCart }></Products>
                </Route>

                <Route exact path = "/products/:productId">
                    {/* no such react component exists un comment this when created also where is product.id coming from?
                    <ProductsId productId={product.id}></ProductsId>*/}
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