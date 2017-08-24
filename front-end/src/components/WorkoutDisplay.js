import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import '../App.css'
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';



class WorkoutDisplay extends Component {
  constructor() {
    super();
    this.state = ({
      workout: {},
      toRender: 0,
      delSuccess: false,
      findFail: false,
      delFail: false
    })
    this.handleDelSuccess = this.handleDelSuccess.bind(this)
    this.handleFindFail = this.handleFindFail.bind(this)
    this.handleDelFail = this.handleDelFail.bind(this)
    this.deleteWorkout = this.deleteWorkout.bind(this)
  }
  componentWillMount() {
    axios.post(`/workouts/${this.props.params.id}`, {
      token: localStorage.getItem('token')
    })
      .then(res => {
        let data = res.data
        console.log(res.data)
        this.setState({
          workout: data,
          toRender: 1
        })
      })
      .catch(err => {
        console.log(err + ' error on exercise call')
        this.setState({
          findFail: true,
          toRender: 0
        })
      })
  }

  deleteWorkout() {
    axios.post(`/workouts/del/${this.props.params.id}`, {
      id: this.state.workout.author,
      token: localStorage.getItem('token')
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          delSuccess: true
        })
        setTimeout(() => {
          browserHistory.push('/workouts')
        }
          , 1500)
      })
      .catch(err => {
        console.log(err + 'Error on delete')
        this.setState({
          delFail: true
        })
      })
  }

  handleDelSuccess() {
    this.setState({
      delSuccess: false
    })
  }

  handleDelFail() {
    this.setState({
      delFail: false
    })
  }

  handleFindFail() {
    this.setState({
      findFail: true
    })
  }


  render() {
    return (
      <div>
      {this.state.toRender === 0 ? <div></div> : <ExerciseResults deleteWorkout={this.deleteWorkout} workout={this.state.workout}/>}
      <br/>
      <Snackbar
      open={this.state.delSuccess}
      message="Workout Deleted"
      autoHideDuration={4000}
      onRequestClose={this.handleDelSuccess}
      />
      <Snackbar
      open={this.state.delFail}
      message="Can only delete your workouts"
      autoHideDuration={4000}
      onRequestClose={this.handleDelFail}
      />
      <Snackbar
      open={this.state.findFail}
      message="Workout not Found"
      autoHideDuration={4000}
      onRequestClose={this.handleFindFail}
      />
    </div>
    )
  }
}


class ExerciseResults extends Component {
  render() {
    let displayResults = []
    displayResults = this.props.workout.exercises.map((el, i, arr) => {
      return <IndividualExercise el={el} key={i} />
    })
    return (
      <div>
      <h1> {this.props.workout.name} </h1>
      <div className='exerciseTableWODisplay'>
      <Table
      selectable={false}
      multiSelectable={false}>
        <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}>
          <TableRow
      selectable={false}>
      <TableHeaderColumn
      style={{
        width: '120px'
      }}>Exercise Name</TableHeaderColumn>
            <TableHeaderColumn>Sets</TableHeaderColumn>
            <TableHeaderColumn>Reps</TableHeaderColumn>
            <TableHeaderColumn>Weight</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {displayResults}
        </TableBody>
      </Table>
      </div>
      <br/>
      <div className='delButton'>
      <RaisedButton label='Delete Workout' onClick={this.props.deleteWorkout}/>
      </div>
      </div>
    )
  }
}

class IndividualExercise extends Component {
  render() {
    return (
      <TableRow selectable={false}>
      <TableRowColumn
      style={{
        width: '125px'
      }}>
            <Link to={`/exercises/${this.props.el._id}`}>  <RaisedButton label={this.props.el.name}/> </Link>
            </TableRowColumn>
            <TableRowColumn>
              {this.props.el.sets}
            </TableRowColumn>
            <TableRowColumn>
              {this.props.el.reps}
            </TableRowColumn>
            <TableRowColumn>
              {this.props.el.weight}
            </TableRowColumn>
            </TableRow>
    )
  }
}

export default WorkoutDisplay;
