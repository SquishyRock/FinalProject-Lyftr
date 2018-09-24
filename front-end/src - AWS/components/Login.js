import React, { Component } from 'react';
import { Link } from 'react-router';
import '../App.css'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      success: false,
      fail: false
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleSuccessClose = this.handleSuccessClose.bind(this)
    this.handleFailClose = this.handleFailClose.bind(this)
  }
  handleUserNameChange(event) {
    this.setState({
      email: event.target.value //setting input to a state, so it can keep being updated
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value //setting input to a state, so it can keep being updated
    });
  }

  handleSuccessClose() {
    this.setState({
      success: false,
    });
  }
  ;
  handleFailClose() {
    this.setState({
      fail: false,
    });
  }
  ;
  formSubmit(e) {
    e.preventDefault();
    axios
      .post('/users/login', this.state)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        browserHistory.push('/workouts')
      })
      .catch((err) => {
        console.log(err + ' returned')
        this.setState({
          email: '',
          password: '',
          fail: true
        })
      })
  }

  render() {
    return (
      <div className="loginStyle">
      <form onSubmit={this.formSubmit}>
      <TextField hintText="Email" floatingLabelText="Email" onChange={this.handleUserNameChange} value={this.state.email} type='text' />
      <TextField hintText="Password" floatingLabelText="Password" onChange={this.handlePasswordChange} value={this.state.password} type='password' />
      <br/>
      <br/>
      <RaisedButton label='Login' type='submit'/><Link to='/newuser'><RaisedButton label='New Account' /> </Link>
      </form>
      <Snackbar
      open={this.state.success}
      message="Login Successful"
      autoHideDuration={4000}
      onRequestClose={this.handleSuccessClose}
      />
      <Snackbar
      open={this.state.fail}
      message="Login Failed"
      autoHideDuration={4000}
      onRequestClose={this.handleFailClose}
      />
      </div>
      );
  }
}

export default Login;
