import React, { Component } from 'react'
import Moment from 'react-moment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class SignupsContainer extends Component {
  constructor(props) {
    super(props)
      this.state = {
        signups:{
          practices:[]
        }
      }
  }

  componentWillMount(){
    fetch(`/api/v1/signups`)
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
      this.setState({signups: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let signupList = this.state.signups.practices.map((practice)=>{
    return(
      <ListItem key={practice.id} className="paper-list-items-homepage">
        <Paper>
          <Typography variant="h5" component="h3">
            {practice.sport.name}
          </Typography>
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
        <h5>UPCOMING PRACTICES</h5>
        <List>
          {signupList}
        </List>
      </div>
    )
  }
}


export default SignupsContainer
