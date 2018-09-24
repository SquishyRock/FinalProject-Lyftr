import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import '../App.css'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

class ExerciseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedExercises: [],
      toRender: 0,
      searchParams: {
        muscle_group: '',
        equipment: ''
      },
      addedExercises: [],
      workoutName: '',
      public: false,
      saveFail: false,
      notLogged: false,
      noEx: false,
      workoutRemove: false,
      exerciseAdded: false,
      workoutSaved: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExChange = this.handleExChange.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePublicChange = this.handlePublicChange.bind(this);
    this.handleAuthClose = this.handleAuthClose.bind(this);
    this.handleNoExClose = this.handleNoExClose.bind(this);
    this.handleFailClose = this.handleFailClose.bind(this);
    this.workoutRemove = this.workoutRemove.bind(this);
    this.exAddedToWorkout = this.exAddedToWorkout.bind(this);
    this.handleWorkoutSaved = this.handleWorkoutSaved.bind(this);
  }

  // On button press, pushes one exercise to exercises array along with rep/set/weight data
  addExercise(exId) {
    console.log(exId)
    let stateCopy = this.state.addedExercises.slice(); // Needed to make a copy of the state and change that instead
    stateCopy.push(exId)
    this.setState({
      addedExercises: stateCopy,
      exerciseAdded: true
    });
  }

  //Functions to handle the workoutname and tag fields
  //to ensure the current values are in state when workout is created
  handleTextChange(event) {
    this.setState({
      workoutName: event.target.value //setting input to a state, so it can keep being updated
    });
  }

  handlePublicChange(event) {
    this.setState({
      public: event.target.checked //setting input to a state, so it can keep being updated
    });
  }

  // Adds workout from state to data base.
  // Then resets state and current exercise filter fields
  addWorkout() {
    if (this.state.workoutName === '') {
      this.setState({
        saveFail: true
      })
    }
    axios.post('http://localhost:8080/workouts/new', {
      name: this.state.workoutName,
      public: this.state.public,
      exercises: this.state.addedExercises,
      token: localStorage.getItem('token')
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          returnedExercises: [],
          toRender: 1,
          searchParams: {
            muscle_group: '',
            equipment: ''
          },
          addedExercises: [],
          workoutName: '',
          public: false,
          workoutSaved: true
        })
        localStorage.removeItem('workout');

      })
      .catch((err) => {
        console.log(err + ' Error on workout saveD')
      })

  }

  deleteWorkout() {
    this.setState({
      addedExercises: [],
      workoutName: '',
      public: false,
      workoutRemove: true
    })
    localStorage.removeItem('workout');
  }

  //Makes data base call for exercises based on current values in search filters.
  //Takes returned exercises and pushes them to state as an array. Also sets to render
  // state to 1 letting the Search Results component to render
  handleSubmit(event) {
    event.preventDefault(); //prevents page from reloading
    this.setState({
      toRender: 1,
      returnedExercises: []
    })
    axios.post(`http://localhost:8080/exercises/search`, {
      params: this.state.searchParams,
      token: localStorage.getItem('token')
    })
      .then(res => {
        let data = res.data
        let returnedEx = []
        if (data.length !== 0) {
          for (var i = 0; i < data.length; i++) {
            returnedEx.push(data[i])
          }
          this.setState({
            toRender: 1,
            returnedExercises: returnedEx
          })
        } else {
          this.setState({
            noEx: true
          })
        }
      })
      .catch(err => {
        this.setState({
          notLogged: true
        })
        console.log(err + ' error on exercise call')
      })
  }

  //Called on filter change to update state with filter values
  handleExChange(key, event, index, value) {
    this.state.searchParams[key] = value
    this.setState({
      searchParams: this.state.searchParams
    })
  }

  //Asks for current local data to see if there is a workout in progress
  componentWillMount() {
    let localData = JSON.parse(localStorage.getItem('workout'));
    console.log(localData)
    if (localData !== null) {
      this.setState({
        addedExercises: localData
      })
    }
  }
  handleFailClose() {
    this.setState({
      saveFail: false
    });
  }
  ;

  handleAuthClose() {
    this.setState({
      notLogged: false
    });
  }
  ;

  handleNoExClose() {
    this.setState({
      noEx: false
    });
  }
  ;

  workoutRemove() {
    this.setState({
      workoutRemove: false
    });
  }
  ;

  exAddedToWorkout() {
    this.setState({
      exerciseAdded: false
    });
  }

  handleWorkoutSaved() {
    this.setState({
      workoutSaved: false
    })
  }

  //Ensures local storage is updated when component changes
  componentWillUpdate() {
    localStorage.setItem('workout', JSON.stringify(this.state.addedExercises))
  }
  componentWillUnmount() {
    localStorage.setItem('workout', JSON.stringify(this.state.addedExercises))
  }

  render() {
    return (
      <div className="App">
        <form className="nl-form">
        <SelectField
      value={this.state.searchParams.muscle_group}
      onChange={this.handleExChange.bind(this, 'muscle_group')}
      >
          <MenuItem value={""} primaryText="All Muscles" />
          <MenuItem value={"0"} primaryText="Calves" />
          <MenuItem value={"1"} primaryText="Hamstrings" />
          <MenuItem value={"2"} primaryText="Quadriceps" />
          <MenuItem value={"3"} primaryText="Glutes" />
          <MenuItem value={"4"} primaryText="Abs" />
          <MenuItem value={"5"} primaryText="Lower Back" />
          <MenuItem value={"6"} primaryText="Middle Back" />
          <MenuItem value={"7"} primaryText="Upper Back" />
          <MenuItem value={"8"} primaryText="Shoulders" />
          <MenuItem value={"9"} primaryText="Chest" />
          <MenuItem value={"10"} primaryText="Tricps" />
          <MenuItem value={"11"} primaryText="Biceps" />
          <MenuItem value={"12"} primaryText="Forearms" />
        </SelectField>
        <SelectField
      value={this.state.searchParams.equipment}
      onChange={this.handleExChange.bind(this, 'equipment')}
      >
          <MenuItem value={""} primaryText="All Equipment" />
          <MenuItem value={"0"} primaryText="Barbell" />
          <MenuItem value={"1"} primaryText="Dumbbells" />
          <MenuItem value={"2"} primaryText="Smith Machine" />
          <MenuItem value={"3"} primaryText="Body Weight" />
        </SelectField>
        <br/>
            <div className='exerciseSearchButton'>
            <RaisedButton label='Search for Exercises' onClick={this.handleSubmit} type='submit'/>
            </div>
          </form>
        <div>
        {this.state.returnedExercises.length === 0 ? <div></div> : <SearchResults toRender={this.state.toRender} addExercise={this.addExercise} returnedExercises={this.state.returnedExercises}/>}
        <br/>
        {this.state.addedExercises.length === 0 ? <div></div> : <div> <div className='workoutOptions'><TextField hintText="Workout Name" floatingLabelText="Workout Name" type='text' onChange={this.handleTextChange} value={this.state.workoutName}/></div><WorkoutToBeSaved addedExercises={this.state.addedExercises} addWorkout={this.addWorkout} deleteWorkout={this.deleteWorkout} /> <div className='publicBox'><Checkbox label='Public' onCheck={this.handlePublicChange} checked={this.state.public}/> </div></div>}
        </div>

        <Snackbar
      open={this.state.saveFail}
      message="Workout needs a Name"
      autoHideDuration={4000}
      onRequestClose={this.handleFailClose}
      />
      <Snackbar
      open={this.state.notLogged}
      message="Please login to use this feature"
      autoHideDuration={4000}
      onRequestClose={this.handleAuthClose}
      />
      <Snackbar
      open={this.state.noEx}
      message="No matches found for this specific search"
      autoHideDuration={4000}
      onRequestClose={this.handleNoExClose}
      />
      <Snackbar
      open={this.state.workoutRemove}
      message="Workout in progress deleted"
      autoHideDuration={4000}
      onRequestClose={this.workoutRemove}
      />
      <Snackbar
      open={this.state.exerciseAdded}
      message="Added to Workout Below"
      autoHideDuration={4000}
      onRequestClose={this.exAddedToWorkout}
      />
      <Snackbar
      open={this.state.workoutSaved}
      message="Workout Saved"
      autoHideDuration={4000}
      onRequestClose={this.handleWorkoutSaved}
      />
      </div>
      );
  }
}

class SearchResults extends Component {
  render() {
    let displayResults = []
    displayResults = this.props.returnedExercises.map((el, i, arr) => {
      return <ExerciseTable el={el} key={i} addExercise={this.props.addExercise}/>
    })

    return (
      <div className='exerciseTable'>
        <Table
      selectable={false}
      multiSelectable={false}>
          <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn
      style={{
        width: '80px'
      }}>Exercise Name</TableHeaderColumn>
              <TableHeaderColumn>Sets</TableHeaderColumn>
              <TableHeaderColumn>Reps</TableHeaderColumn>
              <TableHeaderColumn>Weight</TableHeaderColumn>
              <TableHeaderColumn
      style={{
        width: '50px'
      }}> </TableHeaderColumn>
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


// Creates an exercise row each with its own state and buttons. Records any changes to
class ExerciseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.el._id,
      name: this.props.el.name,
      set: '',
      weight: '',
      reps: '',
    }
    this.onValueChange = this.onValueChange.bind(this)
  }
  onValueChange(event) {
    var updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  // this.setState({
  //     [event.target.name]: event.target.value
  // });
  }
  render() {
    return (
      <TableRow>
      <TableRowColumn
      style={{
        width: '115px'
      }}>
      <Link to={`/exercises/${this.props.el._id}`}> <RaisedButton label={this.props.el.name}/></Link>
      </TableRowColumn>
      <TableRowColumn>
        <TextField name='sets' onChange={this.onValueChange} value={this.state.sets} type='text'/>
      </TableRowColumn>
      <TableRowColumn>
        <TextField name='reps' onChange={this.onValueChange} value={this.state.reps} type='text'/>
      </TableRowColumn>
      <TableRowColumn>
        <TextField name='weight' onChange={this.onValueChange} value={this.state.weight} type='text'/>
      </TableRowColumn>
      <TableRowColumn
      style={{
        width: '70px'
      }}>
      <RaisedButton label="Add" onClick={() => {
        this.props.addExercise(this.state);
        this.setState({
          _id: this.props.el._id,
          name: this.props.el.name,
          reps: '',
          sets: '',
          weight: ''
        })
      }}/>
      </TableRowColumn>
      </TableRow>
    )
  }
}

//Displays current state of built workout that will be saved to the database on click
class WorkoutToBeSaved extends Component {
  render() {
    let currentExercises = []
    if (this.props.addedExercises.length !== 0) {
      currentExercises = this.props.addedExercises.map((el, i, arr) => {
        return <TableRow key={i} selectable={false}>
        <TableRowColumn
          style={{
            width: '120px'
          }}>
              {el.name}
              </TableRowColumn>
              <TableRowColumn>
                {el.sets}
              </TableRowColumn>
              <TableRowColumn>
                {el.reps}
              </TableRowColumn>
              <TableRowColumn>
                {el.weight}
              </TableRowColumn>
              </TableRow>
      })
    }
    return (
      <div>
        <div className='workoutInProgressTable'>
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
        width: '90px'
      }}>Exercise Name</TableHeaderColumn>
                  <TableHeaderColumn>Sets</TableHeaderColumn>
                  <TableHeaderColumn>Reps</TableHeaderColumn>
                  <TableHeaderColumn>Weight</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
              {currentExercises}
              </TableBody>
          </Table>
          <br/>
          <div className='workoutCreationButtons'>
            <RaisedButton label='Create Workout' onClick={this.props.addWorkout}/>
            <RaisedButton label='Delete Workout' onClick={this.props.deleteWorkout}/>
            </div>
        </div>
        <br/>

      </div>
    )
  }
}

export default ExerciseSearch;
