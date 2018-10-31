import React, { Component } from 'react'

import SportsForm from '../components/SportsForm'

class AthleteDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAthlete:{
        id: null,
        email: "",
        created_at: "",
        updated_at: "",
        first_name: "",
        last_name: "",
        latitude: null,
        longitude: null,
        location: null
      }
    }
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

  render(){
    return(
      <div>
        Hello from the AthleteDash
        <SportsForm
          currentAthleteId={this.state.currentAthlete.id}
        />
      </div>)
  }
}
export default AthleteDash
