import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router';
import '../App.css'
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
// import Barbell from './images/barbell.svg'


class IndExDisplay extends Component {
  constructor() {
    super();
    this.state = ({
      exercise: {
        muscle_group: []
      },
      toRender: 0
    })
    this.convertToMuscle = this.convertToMuscle.bind(this)
    this.convertToEquipment = this.convertToEquipment.bind(this)
    this.convertToPicture = this.convertToPicture.bind(this)
  }
  //Before component renders, makes a call to database for the individual exericse ID
  //Returns information to state to be used for render
  componentWillMount() {
    axios.get(`/exercises/${this.props.params.id}`)
      .then(res => {
        console.log(res.data)
        let data = res.data
        this.setState({
          exercise: data,
          toRender: 1
        })
      })
      .catch(err => {
        console.log(err + ' error on exercise call')
      })
  }
  convertToMuscle(arr) {
    let convertArr = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        convertArr.push("Calves")
      } else if (arr[i] === 1) {
        convertArr.push("Hamstrings")
      } else if (arr[i] === 2) {
        convertArr.push("Quadriceps")
      } else if (arr[i] === 3) {
        convertArr.push("Glutes")
      } else if (arr[i] === 4) {
        convertArr.push("Abs")
      } else if (arr[i] === 5) {
        convertArr.push("Lower Back")
      } else if (arr[i] === 6) {
        convertArr.push("Middle Back")
      } else if (arr[i] === 7) {
        convertArr.push("Upper Back")
      } else if (arr[i] === 8) {
        convertArr.push("Shoulders")
      } else if (arr[i] === 9) {
        convertArr.push("Chest")
      } else if (arr[i] === 10) {
        convertArr.push("Tricps")
      } else if (arr[i] === 11) {
        convertArr.push("Biceps")
      } else if (arr[i] === 12) {
        convertArr.push("Forearms")
      }
    }
    return convertArr
  }

  convertToEquipment(arr) {
    let convert = '';
    if (arr === 0) {
      convert = "Barbell"
    } else if (arr === 1) {
      convert = "Dumbells"
    } else if (arr === 2) {
      convert = "Smith Machine/Cables"
    } else if (arr === 3) {
      convert = "Body Weight"
    }
    return convert
  }

  convertToPicture(arr) {
    let convert = '';
    if (arr === 0) {
      convert = "/barbell.svg"
    } else if (arr === 1) {
      convert = "/dumbell.svg"
    } else if (arr === 2) {
      convert = "/smith.svg"
    } else if (arr === 3) {
      convert = "/body.svg"
    }
    return convert
  }
  render() {
    return (
      <div className="parent">
      <h1> {this.state.exercise.name} </h1>
      <br/>
      <h2> {this.convertToEquipment(this.state.exercise.equipment)} </h2>
      <div className='eqImage'> <img src={this.convertToPicture(this.state.exercise.equipment)} alt={this.convertToEquipment(this.state.exercise.equipment)} /></div>
      <RaisedButton label='More Informaton' href={this.state.exercise.external_link}/>
      <ConvertedArr array={this.convertToMuscle(this.state.exercise.muscle_group)} convertToMuscle={this.convertToMuscle}/>
    </div>
    )
  }
}

class ConvertedArr extends Component {
  render() {
    let arr = []
    // console.log(this.props.array)
    if (this.props.array.length > 0) {
      arr = this.props.array.map((el, i, arr) => {
        return <TableRow selectable={false} key={i}>
                  <TableRowColumn>
                  {el}
                  </TableRowColumn>
                  </TableRow>
      })
    }
    return (
      <Table
      selectable={false}
      multiSelectable={false}>
        <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}>
          <TableRow
      selectable={false}>
            <TableHeaderColumn>Muscle Groups</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {arr}
        </TableBody>
      </Table>
    )
  }
}


export default IndExDisplay;
