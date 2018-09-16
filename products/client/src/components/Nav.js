import React, { Component } from 'react';
import './style.css';

class Nav extends Component {
  handleNavClick = event => {
    //console.log(event.target.getAttribute('name'));
    this.props.test.getId('', event.target.getAttribute('name'));
  };
  render() {
    return (
      <nav>
        <button name="products" onClick={this.handleNavClick} >Products</button>
        <button name="AddProducts" onClick={this.handleNavClick} >Add Products</button>
        {!this.props.test.state.userAuth ? <button name="UserAuth" onClick={this.handleNavClick}>Login</button> : false}
      </nav>
    );
  }
}

export default Nav;