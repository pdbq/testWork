import React, { Component } from 'react';
import './style.css';

class Login extends Component {

  state = {
    name: '',
    password: '',
    err: false
  };

  handleNameChange = e => {
    this.setState({name: e.target.value});
  };
  handlePaswordChange = e => {
    this.setState({password: e.target.value});
  };
  handleSubmit = (e) => {
    let user = this.state;

    e.preventDefault();
    
    fetch('/login', {  
      method: 'post',  
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'name=' + user.name + '&password='+user.password
    })
    .then( (data)  => (data.json()))
    .then( (check) => {
      if(!check.err){
        this.props.test(true);
        this.setState({err: false});
      }
      else {
        this.setState({err: true});
      }
    }) 
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input 
            className={this.state.err ? 'err': ''}
            type='text'
            name='name'
            placeholder='Input name' 
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input 
           className={this.state.err ? 'err': ''}
            type='password'
            name='price'
            placeholder='Input password' 
            value={this.state.password}
            onChange={this.handlePaswordChange}
          />
          <button disabled={!this.state.name || !this.state.password}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;