import React, { Component } from 'react';
import { Link } from 'react-router';
import '../App.css'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router';

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      success: false,
      fail: false,
      fail2: false
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleFail2Close = this.handleFail2Close.bind(this)
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

  handleFailClose() {
    this.setState({
      fail: false,
    });
  }
  ;

  handleFail2Close() {
    this.setState({
      fail2: false,
    });
  }
  ;

  formSubmit(e) {
    e.preventDefault();
    if (this.state.password !== '') {
      axios
        .post('http://localhost:8080/users', this.state)
        .then((res) => {
          browserHistory.push('/')
        })
        .catch((err) => {
          console.log(err + ' returned')
          this.setState({
            email: '',
            password: '',
            fail: true
          })
        })
    } else {
      this.setState({
        password: '',
        fail2: true
      })
    }
  }

  render() {
    return (
      <div className="App">
      <form onSubmit={this.formSubmit}>
      <TextField hintText="Email" floatingLabelText="Email" onChange={this.handleUserNameChange} value={this.state.email} type='text' />
      <TextField hintText="Password" floatingLabelText="Password" onChange={this.handlePasswordChange} value={this.state.password} type='password' />
      <br/>
      <br/>
      <RaisedButton label='Create Account' type='submit'/>
      </form>
      <br/>
      <Snackbar
      open={this.state.fail}
      message="User Registration Failed"
      autoHideDuration={4000}
      onRequestClose={this.handleFailClose}
      />
      <Snackbar
      open={this.state.fail2}
      message="User Registration Requires a Password"
      autoHideDuration={4000}
      onRequestClose={this.handleFail2Close}
      />
      </div>
      );
  }
}

export default CreateUser;
