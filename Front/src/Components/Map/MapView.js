import React, { Component } from 'react';
import { MapContainer, TileLayer,Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../assets/data.json';
import VenueMarkers from './VenueMarkers';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation:[40.421415,-3.692700],
      zoom: 15,
      maxZoom: 18,
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <MapContainer center={currentLocation} zoom={zoom}>
        <TileLayer
          url='https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=R78w71t0l0Qsb5U3rh2bZ3m0p7xoIq2smHs3C7mVxlcOc9PgKwkgHH1lmJRfOTug'
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        />
        <Marker position={this.state.currentLocation}>
          <Popup> <p>Esta es tu ubicación</p></Popup>
        </Marker>
        <VenueMarkers  venues={data.venues}/>
      
        
      </MapContainer>
    );
  }
}

export default MapView;