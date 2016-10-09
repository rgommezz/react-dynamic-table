import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { handleLogin } from '../actions';
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
    // For simplicity, we are using setTimeout to simulate an async login
    // The action handler will load the initial mocked posts and through a thunk, we'll carry out URL redirection.
    this.props.handleLogin(this.state.username);
  };
  render() {
    const { username, password } = this.state;
    const { isLoading } = this.props;
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
          <button className="btn btn-default" type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoggingIn,
});

export default withRouter(connect(mapStateToProps, { handleLogin })(Login));
