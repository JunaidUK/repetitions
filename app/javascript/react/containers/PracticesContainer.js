import React, { Component } from 'react'

import PracticesForm from '../components/PracticesForm'
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

  render(){
    let practiceList = this.state.practices.map((practice)=>{
      let athleteNames = practice.athletes.map((athlete)=>{
        return(<Typography component="p" key={practice.id}>
        Athlete: {athlete.first_name} {athlete.last_name}
        </Typography>)
      })
    return(
      <ListItem key={practice.id}>
        <Paper>
          <Typography variant="h5" component="h3">
            {practice.sport.name}
          </Typography>
          {athleteNames}
          <Typography component="p">
            {practice.location}
          </Typography>
          <Typography component="p">
            Time - {practice.date_time}
          </Typography>
        </Paper>
      </ListItem>)
    })

    return(
      <div>
        <List>
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
