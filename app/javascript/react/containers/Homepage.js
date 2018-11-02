import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import AthleteDash from './AthleteDash'

class Homepage extends Component {
  constructor(props) {
      super(props)
      this.state = {
        center:{
        lat: 26.092891,
        lng: 85.948970
        },
        zoom: 11,
        apikey:"",
        athleteHidden: false
      }
      this.athleteDashView = this.athleteDashView.bind(this)
      this.changeMapCenterLocation = this.changeMapCenterLocation.bind(this)
      // this.reactRenderInitialLocation = this.reactRenderInitialLocation.bind(this)
    }

    athleteDashView(){
      this.setState({athleteHidden: !this.state.athleteHidden})
    }

    changeMapCenterLocation(geoLocale){
      this.setState({center: geoLocale})
    }

    // reactRenderInitialLocation(athlete){
    //   if (athlete != {} && athlete.latitude != null && athlete.longitude != null){
    //     let geoLocale = {
    //         lat: athlete.longitude,
    //         lng: athlete.latitude
    //
    //     }
    //     this.changeMapCenterLocation(geoLocale)
    //   }
    // }
    // reactRenderInitialLocation={this.reactRenderInitialLocation}
    render(){
      return(
        <div>
          <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=places"></script>
          <h6>This area will have more react components</h6>
          <div style={{ height: '50vh', width: '80%',float: 'right'}}>
             <GoogleMapReact
               bootstrapURLKeys={{key: this.state.apikey}}
               center={this.state.center}
               defaultZoom={this.state.zoom}
             >
             </GoogleMapReact>
          </div>
          <button onClick={this.athleteDashView} >
            Athlete Dash
          </button>
          <div id="athlete-dashboard">
            {this.state.athleteHidden &&
              <AthleteDash
                changeMapCenterLocation={this.changeMapCenterLocation}
              />}
          </div>
        </div>)
    }
}
export default Homepage;
