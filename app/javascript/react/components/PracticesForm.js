import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import Moment from 'react-moment';
import * as Datetime from 'react-datetime';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


import PracticeLocationSearchInput from './PracticeLocationSearchInput'

class PracticesForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      date_time: "",
      sports: [],
      sportId: null
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleSportChange = this.handleSportChange.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
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
      this.setState({sports: body.athlete.sports})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDateChange(momentObj){
    debugger
    this.setState({date_time: momentObj.format()})
  }

  handleLocationChange(location){
    this.setState({location: location})
  }

  handleSportChange(event){
    this.setState({sportId: event.target.value})
  }

  submitHandler(event){
    event.preventDefault()
    let payload;
    geocodeByAddress(this.state.location)
      .then(results => getLatLng(results[0]))
      .then(geoLocation => {
        debugger
         return payload = {
          latitude: geoLocation.lat,
          longitude: geoLocation.lng,
          location: this.state.location,
          sport_id: this.state.sportId,
          date_time: this.state.date_time
        }
      }).then(payload => {
        fetch ('/api/v1/practices', {
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
          this.props.setPractices(body)
        })
        .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error', error));
  }

  render(){
    let sportsOptions= this.state.sports.map((sport)=>{
      return(
        <option key={sport.id} value={sport.id}>
          {sport.name}
        </option>
      )
    })

    return(
      <div className="form">
        <form>
          <select onChange={this.handleSportChange}>
            <option value={null}>Pick an option from your sport list</option>
            {sportsOptions}
          </select>
          <PracticeLocationSearchInput
            handleLocationChange={this.handleLocationChange}
           />
          <Datetime
            input={false}
            onChange={this.handleDateChange}
            utc={true}
          />
          <input id="new-practice-button" className="button" type="submit" value="Submit" onClick={this.submitHandler}/>
        </form>


      </div>
    )
  }
}

export default PracticesForm
