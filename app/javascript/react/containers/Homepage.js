import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

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
          <h1>This area will have more react components</h1>
          <div style={{ height: '50vh', width: '80%',float: 'right'}}>
           <GoogleMapReact
             bootstrapURLKeys={{key: this.state.apikey}}
             defaultCenter={this.state.center}
             defaultZoom={this.state.zoom}
           >
           </GoogleMapReact>
          </div>
        </div>)
    }
}
export default Homepage;
