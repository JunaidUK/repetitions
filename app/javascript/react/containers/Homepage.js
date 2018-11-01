import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import SearchBox from '../components/SearchBox.js'
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
        apikey:""
      }
    }



    render(){
      return(
        <div>
          <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=places"></script>
          <h1>This area will have more react components</h1>
          <div style={{ height: '50vh', width: '80%',float: 'right'}}>
             <GoogleMapReact
               bootstrapURLKeys={{key: this.state.apikey}}
               defaultCenter={this.state.center}
               defaultZoom={this.state.zoom}
             >
             </GoogleMapReact>
          </div>
          <div id="athlete-dashboard">
            <AthleteDash />
          </div>
        </div>)
    }
}
export default Homepage;
