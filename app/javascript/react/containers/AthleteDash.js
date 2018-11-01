import React, { Component } from 'react'

import ExercisesForm from '../components/ExercisesForm'
import EquipmentForm from '../components/EquipmentForm'

class AthleteDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAthlete:{},
      equipments: [],
      equipment: "",
    }
    this.exerciseSubmitHandler = this.exerciseSubmitHandler.bind(this)
    this.equipmentSubmitHandler = this.equipmentSubmitHandler.bind(this)
    this.equipmentChangeHandler = this.equipmentChangeHandler.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/athletes`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({currentAthlete: body.athlete})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  exerciseSubmitHandler(payload){
    fetch ('/api/v1/exercises', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newSports = this.state.sports.concat(body)
      this.setState({sports: newSports})
    })
    .catch(error => console.error('Error:', error));
  }

  equipmentSubmitHandler(event){
    event.preventDefault()
    payload = {
      name: this.state.equipment,
      athlete_id: this.state.currentAthlete.id
    }
    fetch ('/api/v1/equipments', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newEquipments = this.state.currentAthlete.equipments.concat(body)
      this.setState({equipments: newEquipment})
    })
    .catch(error => console.error('Error:', error));
  }

  equipmentChangeHandler(event){
    this.setState({equipment: event.target.value})
  }

  render(){
    return(
      <div id="athlete-profile-forms">
        <EquipmentForm
          equipmentChangeHandler={this.equipmentChangeHandler}
        />
        <ExercisesForm
          currentAthleteId={this.state.currentAthlete.id}
          exerciseSubmitHandler={this.exerciseSubmitHandler}
        />
      </div>)
  }
}
export default AthleteDash
