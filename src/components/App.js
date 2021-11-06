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

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
                <Link to='/products' className='./NavBar'>Products</Link>
            </header>
        
            <Users setToken={setToken} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            
            <Switch>
                <Route exact path ="/">
                    <Home currentUser={currentUser}></Home>
                </Route>

                <Route exact path ="/products/">
                    <Products products={products}></Products>
                </Route>

                <Route exact path ="/products/:productId">
                    <ProductsId productId={product.id}></ProductsId>
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
export default function App() {
  const [itemCount, setItemCount] = React.useState(1);
  return (
    <div style={{ display: "block", padding: 30 }}>
      <h4>How to create ShoppingCart Button in ReactJS?</h4>
      <div>
        <Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon />{" "}
        </Badge>
        <ButtonGroup>
          <Button
            onClick={() => {
              setItemCount(Math.max(itemCount - 1, 0));
            }}
          >
            {" "}
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => {
              setItemCount(itemCount + 1);
            }}
          >
            {" "}
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}


