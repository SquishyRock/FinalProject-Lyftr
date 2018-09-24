import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ExerciseSearch from './components/Exsearch';
import WorkoutSearch from './components/Worksearch';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WorkoutDisplay from './components/WorkoutDisplay'
import IndExDisplay from './components/IndExDisplay'
import './App.css'
import Login from './components/Login'
import CreateUser from './components/CreateUser'

ReactDOM.render((
  <Router history={browserHistory}>
  <Route path='/' component={App}>
  <IndexRoute component={Login}/>
    <Route path="exercisesearch" component={ExerciseSearch}/>
    <Route path='workouts' component={WorkoutSearch}/>
    <Route path='workouts/:id' component={WorkoutDisplay}/>
    <Route path='exercises/:id' component={IndExDisplay}/>
    <Route path="newuser" component={CreateUser}/>
  </Route>
  </Router>
  ), document.getElementById('root'));

registerServiceWorker();
