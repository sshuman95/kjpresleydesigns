import React, { Suspense, lazy } from 'react';
import './App.css';
// import Store from './Components/Store/store';

import Admin from './admin/admin';
// import StoreItem from './Components/storeItem/storeItem';
import Cart from './Components/Cart/cart';
import Custom from './Components/Custom/custom'
// import Home from './Components/Home/home';
import Nav from './Components/Nav/nav';
import About from './Components/About/about';
import FilterStore from './Components/Store/filterStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
const Home = lazy(() => import('./Components/Home/home'));
// const Store = lazy(() => import('./Components/Store/store'));
const StoreItem = lazy(() => import('./Components/storeItem/storeItem'));
axios.defaults.baseURL = 'https://us-central1-knitting-319c2.cloudfunctions.net/api'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cart:[]
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
    this.handleQuantityInc = this.handleQuantityInc.bind(this);
    this.handleQuantityDec = this.handleQuantityDec.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  };

  componentDidMount(){
    let values = Object.keys(localStorage);
    let items=[];
    values.forEach(value=>{
      if(value==='lsid'){
        return
      } else {
        items.push(localStorage.getItem(value))
      }
    })
    if(items.length>0){
      let itemsToAdd = []
      items.forEach(item=>{
       itemsToAdd.push(JSON.parse(item))
      });
      this.setState({
        cart:itemsToAdd
      })
    } else {
      return
    }
    }

    handleAddToCart(event,id,items,q,color,source){
      event.preventDefault();
      let cart = this.state.cart;
      let cartItem = {
        itemId:id,
        quantity:q,
        price:items.price,
        name:items.name,
        size:items.size,
        care:items.care,
        source:source,
        tag:items.tags[0],
        color:color
        
      }
      let index=cart.findIndex(item=>item.itemId===id && color === item.color);
      if(index===-1){
        localStorage.setItem(`${id+color}`,JSON.stringify(cartItem))
        cart.push(cartItem)
        this.setState({
          cart:cart
        })
      } else {        
       let foundItem = cart.findIndex(item=>item.itemId === id && color === item.color);
        cart[foundItem].quantity+=q
        this.setState({
          cart:cart
        })
        let itemToChange = JSON.parse(localStorage.getItem(`${id+color}`));
        itemToChange.quantity+=q;
        localStorage.setItem(`${id+color}`,JSON.stringify(itemToChange))
      }
  };

    handleQuantityInc(event,id,color){
      event.preventDefault()
      let cart = this.state.cart;
      let foundItem = cart.findIndex(item=>item.itemId === id && color === item.color ) ;
      if(foundItem !==-1){
        cart[foundItem].quantity++
        this.setState({
          cart:cart
        })
        let itemToChange = JSON.parse(localStorage.getItem(`${id+color}`));
        itemToChange.quantity++;
        localStorage.setItem(`${id+color}`,JSON.stringify(itemToChange))
      } else {
        return 'Item not found'
      }
    };

    handleQuantityDec(event,id,color){
      event.preventDefault()
      let cart = this.state.cart;
      let foundItem = cart.findIndex(item=>item.itemId === id && color === item.color);
      if(foundItem !==-1 && cart[foundItem].quantity>1){
        cart[foundItem].quantity--
        this.setState({
          cart:cart
        })
        let itemToChange = JSON.parse(localStorage.getItem(`${id+color}`));
        if(itemToChange.quantity>0){
          itemToChange.quantity--
          localStorage.setItem(`${id+color}`,JSON.stringify(itemToChange))
        }
        } else {
        return 'Item not found'
      }
    };


    handleRemove(event,id,color){
      event.preventDefault()
      let cart = this.state.cart;
      let filteredCart = cart.filter(item => item.itemId !== id || (item.itemId === id  && item.color !== color));
      let other = cart.find(item => item.itemId === id);
      if(other){
        this.setState({
          cart:filteredCart
        })
        localStorage.removeItem(`${other.itemId+color}`)
      } else {
       return 'Item not found'
      }
    };


    handleClearCart(event){
        event.preventDefault();
        this.setState({
          cart:[]
        })
      };


      render(){
        let quantity=0;
        if(this.state.cart.length>0){
          let cart = this.state.cart;
          cart.forEach(item=>{
            quantity += item.quantity 
          })
        };
        return (
            <Router>
                
            <Nav quantity={quantity}/>
            <Suspense fallback={<div>Loading...</div>}>
            <Switch>
            <Route  exact path="/" component={Home} />
            <Route exact path={"/store/:tag"} component={ (match) => (
                <FilterStore
                cart={this.state.cart}
                handleAddToCart={this.handleAddToCart}
                tag={match}
              />
            )}/>
            <Route exact path='/store/:tag/:id' render={ (match) => (
                <StoreItem
                handleAddToCart={this.handleAddToCart}
                tag={match}
              />
            )}/>
            <Route  path="/cart" component={() => <Cart
              cart={this.state.cart}
              clearCart={this.handleClearCart}
              handleQuantityInc={this.handleQuantityInc}
              handleQuantityDec={this.handleQuantityDec}
              handleRemove={this.handleRemove}
           />} />
           <Route  exact path="/custom" component={Custom} />
           <Route  exact path="/about" component={About} />
           <Route  exact path="/admin" component={Admin} />
            </Switch>
            </Suspense>
           </Router>
        )
      }
    }

export default App;

/*  <Route exact path="/store/all" render={ () => (
                <Store
                cart={this.state.cart}
                handleAddToCart={this.handleAddToCart}
              />
            )}/> */
