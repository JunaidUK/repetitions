import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import AthleteDash from './AthleteDash'

class Homepage extends Component {
  constructor(props) {
      super(props)
      this.state = {
        center:{
        lat: 26.092891,
        lng: 85.948970
        },
        zoom: 13,
        apikey:"",
        athleteHidden: false
      }
      this.athleteDashView = this.athleteDashView.bind(this)
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
        <div>
          <div className="row">
            <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=places"></script>
              <div style={{ height: '50vh', width: '80%',float: 'right'}}>
                <GoogleMapReact
                  bootstrapURLKeys={{key: this.state.apikey}}
                  center={this.state.center}
                  defaultZoom={this.state.zoom}
                  >
                </GoogleMapReact>
              </div>
            <Button variant="contained" color="primary" onClick={this.athleteDashView} >
              ATHLETE DASH
            </Button>
          </div>
          <div className="row">
            <div id="athlete-dashboard">
              {this.state.athleteHidden &&
                <AthleteDash
                  changeMapCenterLocation={this.changeMapCenterLocation}
                  />}
            </div>
          </div>
        </div>)
    }
}
export default Homepage;
