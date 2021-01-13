import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  
  const position = {
    current:[40.421415,-3.692700]
  }
  const { venues } = props;

  const markers = venues.map((venue, index) => (
    <div>
      <Marker key={index} position={venue.geometry} icon={VenueLocationIcon} >
      <MarkerPopup data={venue}/>
      </Marker>
      
    </div>
    
  ));

  return (
    <>
      <Fragment>{markers}</Fragment>
      {/* <Marker position={position.current}></Marker> */}
    </>
  )
};

export default VenueMarkers;
