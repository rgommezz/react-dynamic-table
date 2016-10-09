import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../styles/Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // Handle login, for the time being, redirecting to posts
    this.props.router.replace('/posts');
  };
  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input className="form-control" placeholder="username" id="username" type="text" value={username} onChange={this.handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input className="form-control" placeholder="password" id="password" type="password" value={password} onChange={this.handlePasswordChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-default" type="submit">Login</button>
        </div>
      </form>
    )
  }
}

export default withRouter(Login);
