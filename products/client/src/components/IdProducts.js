import React, { Component } from 'react';
import './style.css';

class IdProduct extends Component {
  state = {
    id: '',
    product: ''
  };

  componentDidMount() {
    fetch('/product/' + this.props.test.state.id)
      .then(res => res.json())
      .then(product => this.setState({ product }));
  };

  render() {  
    const {product} = this.state;
    return (
      <section>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <p>{product.createdBy}</p>
      </section>
    );
  }
}

export default IdProduct;