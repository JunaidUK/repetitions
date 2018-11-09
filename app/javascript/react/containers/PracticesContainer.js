import React, { Component } from 'react'
import * as moment from 'moment';

import PracticesForm from '../components/PracticesForm'
import SignupButton from '../components/SignupButton'
import PracticeModal from './PracticeModal'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class PracticesContainer extends Component {
  constructor(props) {
    super(props)
      this.state = {
        practices: []
      }
      this.setPractices = this.setPractices.bind(this)
      this.addSignUp = this.addSignUp.bind(this)
    }

  componentDidMount(){
    fetch(`/api/v1/practices`)
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
      this.setState({practices: body.practices})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setPractices(practiceObj){
    let newPractices = practices.concat(practiceObj)
    this.setState({practices: newPractices})
  }

  addSignUp(practiceId){
    let payload = {
      practice_id: practiceId
    }
    fetch ('/api/v1/signups', {
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
    .then(response => {
      debugger
    return response.json()
    })
    .catch(error => console.error('Error:', error));
  }

  render(){
    let practiceList = this.state.practices.map((practice)=>{
      let time = moment(practice.date_time)
      let athleteNames = practice.athletes.map((athlete)=>{
        return(<Typography component="p" key={practice.id}>
        Athlete: {athlete.first_name} {athlete.last_name}
        </Typography>)
      })
    return(
      <ListItem key={practice.id} className="paper-list-items-homepage">
        <Paper>
          <Typography variant="h5" component="h3">
            {practice.sport.name}
          </Typography>
          {athleteNames}
          <Typography component="p">
            {practice.location}
          </Typography>
          <Typography component="p">
            Time - {time.format("dddd, MMMM Do YYYY, h:mm a")}
          </Typography>
          <SignupButton
            practiceId={practice.id}
            addSignUp={this.addSignUp} />
        </Paper>
      </ListItem>)
    })

    return(
      <div>
        <h5>CLICK TO JOIN A PRACTICE</h5>
        <List style={{maxHeight: '50vh', overflow: 'auto'}}>
          {practiceList}
        </List>
        <PracticeModal
          setPractices ={this.setPractices}
        />
      </div>
    )
  }

}

export default PracticesContainer
