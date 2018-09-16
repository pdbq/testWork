import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Nav from './components/Nav.js';
import Products from './components/Products';
import IdProducts from './components/IdProducts.js';
import AddProduct from './components/AddProduct.js';
import Login from './components/Login.js';

class App extends Component {
  state = {
    nav: 'products',
    id: '',
    userAuth: false
  };
  getId = (_id, _nav) => {
   // console.log(_id);
    this.setState({id: _id, nav: _nav});
  };
  getUserAuth = (_auth) => {
    this.setState({userAuth: _auth, nav: 'products'});
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Nav test={this}/>
        {this.state.nav === 'products' ? <Products test = {this}/> : false}
        {this.state.nav === 'IdProducts' ? <IdProducts test = {this}/> : false}
        {(this.state.nav === 'AddProducts' && this.state.userAuth) ? <AddProduct test = {this.getId}/> : this.state.nav === 'AddProducts' ? <Login test={this.getUserAuth}/> : false}
         {(this.state.nav === 'UserAuth' && !this.state.userAuth) ? <Login test={this.getUserAuth}/> : false}
      </div>
    );
  }
}

export default App;