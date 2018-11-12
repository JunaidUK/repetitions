import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

class ExercisesForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sports: [],
      sportId: null
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/sports`)
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
      this.setState({sports: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }
  submitHandler(event){
    event.preventDefault()
    let exercise ={
      sport_id: this.state.sportId,
      athlete_id: this.props.currentAthleteId
    }
    this.props.exerciseSubmitHandler(exercise)
  }


  changeHandler(event){
    this.setState({sportId: event.target.value})
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
      <div className="column large-4">
        <form className="form" id="sports-form">
          <label>
          Select a sport to add to your profile:
            <select id="athlete-sport-options" onChange={this.changeHandler}>
              {sportsOptions}
            </select>
          </label>
          <input id="new-sport-button" className="button small" type="submit" value="Submit" onClick={this.submitHandler}/>
        </form>
      </div>
    )
  }
}

export default ExercisesForm
