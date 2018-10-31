import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router';

class SportsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sports:[],
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
    let payload ={
      sport_id: this.state.sportId,
      athlete_id: this.props.currentAthleteId
    }
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
      debugger
      let newSports = this.state.sports.concat(body)
      this.setState({sports: newSports})
    })
    .catch(error => console.error('Error:', error));
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
      <div>
        <form className="form" id="sports-form">
          <label>
          Select a sport to add to your profile:
            <select onChange={this.changeHandler}>
              {sportsOptions}
            </select>
          </label>
          <input id="new-comment-button" className="button" type="submit" value="Submit" onClick={this.submitHandler}/>
        </form>
      </div>
    )
  }
}

export default SportsForm;
