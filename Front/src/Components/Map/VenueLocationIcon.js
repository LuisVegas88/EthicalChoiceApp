import L from 'leaflet';

export const VenueLocationIcon = L.icon({
  iconUrl: require('../../assets/venue_location_icon.svg'),
  iconRetinaUrl: require('../../assets/venue_location_icon.svg'),
  // iconUrl: require('../../imagenes/iconTiendas.svg'),
  // iconRetinaUrl: require('../../imagenes/iconTiendas.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});
