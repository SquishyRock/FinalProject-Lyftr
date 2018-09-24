import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import '../App.css'
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

class WorkoutSearch extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      currentPubWorkouts: [],
      currentPersonalWorkouts: [],
      loginFail: false
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoginFail = this.handleLoginFail.bind(this)
  }

  handleLoginFail() {
    this.setState({
      loginFail: false
    })
  }

  componentWillMount() {
    console.log(localStorage.getItem('token'))
    axios.post(`/workouts/public`, {
      token: localStorage.getItem('token')
    })
      .then(res => {
        let data = res.data
        console.log(res.data)
        let returnedWorkouts = []
        for (var i = 0; i < data.length; i++) {
          returnedWorkouts.push(data[i])
        }
        this.setState({
          currentPubWorkouts: returnedWorkouts
        })
      })
      .catch(err => {
        console.log(err + ' error on exercise call')
      })

    axios.post(`/workouts/personal`, {
      token: localStorage.getItem('token')
    })
      .then(res => {
        let data = res.data
        console.log(res.data)
        let returnedWorkouts = []
        for (var i = 0; i < data.length; i++) {
          returnedWorkouts.push(data[i])
        }
        this.setState({
          currentPersonalWorkouts: returnedWorkouts
        })
      })
      .catch(err => {
        this.setState({
          loginFail: true
        })
        console.log(err + ' error on exercise call')
      })
  }

  handleSubmit() {
    axios.get(`/workouts`
    //    {
    //   params: this.state.searchParams
    // }
    )
      .then(res => {
        let data = res.data
        console.log(res.data)
        let returnedWorkouts = []
        for (var i = 0; i < data.length; i++) {
          returnedWorkouts.push(data[i])
        }
        this.setState({
          currentWorkouts: returnedWorkouts
        })
      })
      .catch(err => {
        console.log(err + ' error on exercise call')
      })
  }

  render() {
    return (
      <div>

  {this.state.currentPubWorkouts.length === 0 ? <div></div> : <SearchResultsPub currentPubWorkouts={this.state.currentPubWorkouts}/>}
  {this.state.currentPersonalWorkouts.length === 0 ? <div></div> : <SearchResultsPersonal currentPersonalWorkouts={this.state.currentPersonalWorkouts}/>}
  <Snackbar
      open={this.state.loginFail}
      message="Please login to use this feature"
      autoHideDuration={4000}
      onRequestClose={this.handleLoginFail}
      />
      </div>
    )
  }
}

class SearchResultsPub extends Component {
  render() {
    let displayResults = []
    if (this.props.currentPubWorkouts.length !== 0) {
      displayResults = this.props.currentPubWorkouts.map((el, i, arr) => {
        return <IndividualWorkout el={el} key={i} />
      })
    }
    return (
      <div>
      <Table
      selectable={false}
      multiSelectable={false}>
        <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Public Workouts</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayResults}
        </TableBody>
      </Table>
      </div>
    )
  }
}

class SearchResultsPersonal extends Component {
  render() {
    let displayResults = []
    if (this.props.currentPersonalWorkouts.length !== 0) {
      displayResults = this.props.currentPersonalWorkouts.map((el, i, arr) => {
        return <IndividualWorkout el={el} key={i} />
      })
    }
    return (
      <div>
      <Table
      selectable={false}
      multiSelectable={false}>
        <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Your Workouts</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayResults}
        </TableBody>
      </Table>
      </div>
    )
  }
}

class IndividualWorkout extends Component {
  render() {
    return (
      <TableRow>
      <TableRowColumn>
      <label> {this.props.el.name} </label>
      </TableRowColumn>
      <TableRowColumn>
      <Link to={`/workouts/${this.props.el._id}`}> <RaisedButton label='Details'/></Link>
      </TableRowColumn>
      </TableRow>
    )
  }
}

export default WorkoutSearch;
