import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import '../App.css'
import { browserHistory } from 'react-router';

class App extends Component {
  constructor() {
    super()
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    localStorage.removeItem('token')
    browserHistory.push('/')
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
      <AppBar title='LYFTR' iconElementLeft={<IconMenu iconButtonElement={
      <IconButton> <MoreVertIcon /></IconButton>
      }
      targetOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top'
      }}
      >
        <Link to='/'><MenuItem primaryText='Home'/></Link>
        <Link to='/workouts'>  <MenuItem primaryText='Find a Workout'/> </Link>
        <Link to='/exercisesearch'><MenuItem primaryText='Make a Workout'/></Link>
        <MenuItem onClick={this.logOut} primaryText='Logout'/>
      </IconMenu>}>
      </AppBar>
      {this.props.children}
      </div>
      </MuiThemeProvider>
      );
  }
}

export default App;
