import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions';
import '../styles/Login.css';

class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
  };

  _input = null;
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
   this._input.focus();
  }

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
    this.props.handleLogin(this.state.username);
  };

  render() {
    const { username, password } = this.state;
    const { isLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            ref={(input) => this._input = input}
            className="form-control"
            placeholder="username"
            id="username"
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            placeholder="password"
            id="password"
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <p>* Type any password to login</p>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoggingIn,
});

export default connect(mapStateToProps, { handleLogin })(Login);
