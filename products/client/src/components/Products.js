import React, { Component } from 'react';
import './style.css';

class Products extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
    };

  handleProductClick = _id => {
    var self = this;
    return function (e) {
      //console.log(self.props.test.state.nav);
      self.props.test.getId(_id, 'IdProducts');
    };
  };

  render() {
    const nav = this.props.test.state.nav;
    return (
     <section>
        <h3>Products all</h3>
        {this.state.products.map(item =>
          <div className={nav === 'products' ? 'product_item' : 'none'} key={item._id} onClick={this.handleProductClick(item._id)}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            {/*<p>{item.description}</p>
            <p>{item.createdBy}</p>*/}
          </div>
        )}  
      </section>
    );
  }
}

export default Products;