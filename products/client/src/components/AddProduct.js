import React, { Component } from 'react';
import './style.css';

class AddProduct extends Component {
  state = {
    name: '',
    price: '',
    description: '',
    createdBy: new Date()
  };


  handleNameChange = e => {
    this.setState({name: e.target.value});
  };
  handlePriceChange = e => {
    this.setState({price: e.target.value});
  };
  handleDescriptionChange = e => {
    this.setState({description: e.target.value});
  };
  handleProductAddB = () => {
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      createdBy: new Date()
    }
    this.props.onProductAdd(newProduct);
    this.state = {
      name: '',
      price: null,
      description: '',
      createdBy: new Date(),
      id: ''
    }
  };

  handleSubmit = (e) => {
    
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      createdBy: new Date()
    }
    console.log(newProduct);
    fetch('/product/new', {  
      method: 'post',  
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'name=' + newProduct.name + '&price='+newProduct.price+'&description='+newProduct.description 
    })
    .then( (data)  => (data.json()))
    .then( (id) => {
      //console.log('Request succeeded with JSON response', id);
      this.props.test(id._id, 'IdProducts')
    }) 
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
    
    this.state = {
      name: '',
      price: null,
      description: '',
      createdBy: new Date()
    }
  };
  render() {
    const {name, price, description}= this.state;
    return (
      <section>

        <h3>Add product</h3>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            name='name'
            placeholder='Input name' 
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input 
            type='number'
            name='price'
            placeholder='Input price' 
            value={this.state.price}
            onChange={this.handlePriceChange}
          />
          <textarea 
            type='text'
            name='description'
            placeholder='Input description' 
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <button disabled={!name || !price || !description}>Add</button>
        </form>
      </section>
    );
  }
}

export default AddProduct;