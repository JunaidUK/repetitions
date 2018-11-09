import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AthleteDash from './AthleteDash'
import PracticesContainer from './PracticesContainer'
import SignupsContainer from './SignupsContainer'

class Homepage extends Component {
  constructor(props) {
      super(props)
      this.state = {
        center:{
          lat: 26.092891,
          lng: 85.948970
        },
        zoom: 13,
        apikey:""
      }
      this.changeMapCenterLocation = this.changeMapCenterLocation.bind(this)
    }

    athleteDashView(){
      this.setState({athleteHidden: !this.state.athleteHidden})
    }

    changeMapCenterLocation(geoLocale){
      this.setState({center: geoLocale})
    }

    render(){
      return(
        <div id="homepage-full-body">
          <div className="row">
            <div id="signups-container" className="column large-3">
              <SignupsContainer />
            </div>
            <Paper className="column large-6 small-12 medium-10 large-center" id="google-map-main-container" style={{overflow: 'hidden'}}>
              <GoogleMapReact className="google-map"
                bootstrapURLKeys={{key: this.state.apikey}}
                center={this.state.center}
                defaultZoom={this.state.zoom}
                />
            </Paper>
            <div id="practices-container" className="column large-3">
              <PracticesContainer />
            </div>
          </div>
          <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography >ATHLETE DASHBOARD</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AthleteDash
                changeMapCenterLocation={this.changeMapCenterLocation}
                />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>)
    }
}
export default Homepage;
