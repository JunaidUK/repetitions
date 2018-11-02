import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete from 'react-places-autocomplete';

import ExercisesForm from '../components/ExercisesForm'
import EquipmentForm from '../components/EquipmentForm'
import LocationSearchInput from '../components/LocationSearchInput'

class AthleteDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAthlete:{},
      equipments: [],
      equipment: "",
      athleteEditHidden: false
    }
    this.exerciseSubmitHandler = this.exerciseSubmitHandler.bind(this)
    this.equipmentSubmitHandler = this.equipmentSubmitHandler.bind(this)
    this.equipmentChangeHandler = this.equipmentChangeHandler.bind(this)
    this.athleteEditView = this.athleteEditView.bind(this)
    this.changeAthleteLocation = this.changeAthleteLocation.bind(this)

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

  athleteEditView(){
    this.setState({athleteEditHidden: !this.state.athleteEditHidden})
  }

  changeAthleteLocation(payload){
    let newAthleteInfo = this.state.currentAthlete
    if (newAthleteInfo != {}){
      newAthleteInfo.latitude = payload.lat
      newAthleteInfo.longitude = payload.lng
      fetch (`/api/v1/athletes/${newAthleteInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newAthleteInfo),
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
        this.setState({ currentAthlete :body.athlete })
        this.props.changeMapCenterLocation(payload)
      })
      .catch(error => console.error('Error:', error));
    }
  }


  render(){
    return(
      <div>
        <div id="athlete-information" className="row">
          <h6>This is the area for athlete information</h6>
          <button onClick={this.athleteEditView} >
          Edit Athlete
          </button>
        </div>

        <div id="athlete-profile-forms" className="row">
          {
            this.state.athleteEditHidden &&
            <EquipmentForm
            equipmentChangeHandler={this.equipmentChangeHandler}
            />
          }
          {
            this.state.athleteEditHidden &&
            <ExercisesForm
            currentAthleteId={this.state.currentAthlete.id}
            exerciseSubmitHandler={this.exerciseSubmitHandler}
            />
          }
          {
            this.state.athleteEditHidden &&
            <LocationSearchInput
            changeAthleteLocation={this.changeAthleteLocation}/>
          }
        </div>
      </div>)
  }
}
export default AthleteDash
