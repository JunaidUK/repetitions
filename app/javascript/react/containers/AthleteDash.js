import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete from 'react-places-autocomplete';
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import ExercisesForm from '../components/ExercisesForm'
import EquipmentForm from '../components/EquipmentForm'
import LocationSearchInput from '../components/LocationSearchInput'
import DeleteContainer from '../containers/DeleteContainer'

class AthleteDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAthlete:{},
      equipments: [],
      exercises: [],
      sports: [],
      equipment: "",
      athleteEditHidden: false
    }
    this.exerciseSubmitHandler = this.exerciseSubmitHandler.bind(this)
    this.equipmentSubmitHandler = this.equipmentSubmitHandler.bind(this)
    this.equipmentChangeHandler = this.equipmentChangeHandler.bind(this)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.deleteEquipment = this.deleteEquipment.bind(this)
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
      this.setState({currentAthlete: body.athlete, equipments: body.athlete.equipments, sports: body.athlete.sports, exercises: body.athlete.exercises})
      if (body.athlete.longitude != null && body.athlete.latitude != null){
        let payload = {
          lng: body.athlete.longitude,
          lat: body.athlete.latitude
        }
        this.props.changeMapCenterLocation(payload)
      }
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
    let payload = {
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
      this.setState({equipments: newEquipments})
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

  deleteExercise(id) {
    let deleteExerciseId = this.state.exercises.filter((exercise)=>{
      return exercise.sport_id == id
    })
   fetch(`/api/v1/exercises/${deleteExerciseId[0].id}`, {
    method: 'DELETE',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json' },
    credentials: 'same-origin'
   })
   .then(response => response.json())
   .then(body => {
     let newSports = this.state.sports.filter(sport => {
      return(
       sport.id !== body.id
      )
     })
     this.setState({sports: newSports})
   })
   .catch(error => {
    console.log(error)
   })
  }

  deleteEquipment(id){
    fetch(`/api/v1/equipments/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
    this.setState({equipments: body})
    })
    .catch(error => {console.log(error)})
  }

  render(){
    let athleteSports = this.state.sports.map((sport)=>{
      let sportName = sport.name
      return(<ListItem key={sport.id}>
              <ListItemText
                primary={sportName}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteContainer
                    deleteMethod={this.deleteExercise}
                    deleteId={sport.id}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>)
    })
    let athleteEquipments = this.state.equipments.map((equipment)=>{
      let equipmentName = equipment.name
      return(<ListItem key={equipment.id}>
              <ListItemText
                primary={equipmentName}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                <DeleteContainer
                  deleteMethod={this.deleteEquipment}
                  deleteId={equipment.id}
                />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>)
        })
    return(
      <div>
        <div id="athlete-attributes" className="row">
          <div className="column large-4">
            <div>
              <h5 id="athlete-information-subheaders">Information</h5>
              <h6>{`${this.state.currentAthlete.first_name} ${this.state.currentAthlete.last_name}`}</h6>
              <p>{this.state.currentAthlete.email}</p>
            </div>
            <FormLabel component="legend">EDIT ATHLETE INFORMATION</FormLabel>
              <FormControlLabel
                control={
                  <Switch checked={this.state.athleteEditHidden} onChange={this.athleteEditView} aria-label="LoginSwitch" />
                }
                label={this.state.athleteEditHidden ? 'Close' : 'Open'}
              />
              <a href="/athletes/edit">Edit Personal Information</a>
          </div>
          <div className="column large-4">
            <h5 id="athlete-information-subheaders">Athlete Sports</h5>
            <List dense={false}>
              {athleteSports}
            </List>
          </div>
          <div className="column large-4">
            <h5 id="athlete-information-subheaders">Athlete Equipment</h5>
            <List dense={false}>
              {athleteEquipments}
            </List>
          </div>
        </div>
        <div id="athlete-profile-forms" className="row">
          {
            this.state.athleteEditHidden &&
            <div>
              <EquipmentForm
                equipmentChangeHandler={this.equipmentChangeHandler}
                equipmentSubmitHandler={this.equipmentSubmitHandler}
              />
              <ExercisesForm
                currentAthleteId={this.state.currentAthlete.id}
                exerciseSubmitHandler={this.exerciseSubmitHandler}
              />
              <LocationSearchInput
                changeAthleteLocation={this.changeAthleteLocation}
              />
            </div>
          }
        </div>
      </div>)
  }
}
export default AthleteDash
