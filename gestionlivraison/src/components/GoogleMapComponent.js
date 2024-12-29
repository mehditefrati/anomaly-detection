import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

const GoogleMapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const trajet = queryParams.get('trajet');

    if (trajet) {
      try {
        const decodedCoordinates = JSON.parse(decodeURIComponent(trajet));
        if (Array.isArray(decodedCoordinates)) {
          setCoordinates(decodedCoordinates.map(coord => ({
            lat: parseFloat(coord[0]),
            lng: parseFloat(coord[1]),
          })));
        } else {
          console.error('Decoded coordinates are not in the expected array format.');
        }
      } catch (error) {
        console.error('Error decoding coordinates:', error);
      }
    }
  }, [location.search]);

  // Default map container style
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default map options
  const options = {
    zoom: 13,
    center: coordinates[0] || { lat: 0, lng: 0 }, // Center on the first coordinate or a default location
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      {coordinates.length > 0 ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} options={options}>
          {/* Draw the route */}
          <Polyline path={coordinates} options={{ strokeColor: "#0000FF", strokeWeight: 4 }} />

          {/* Add markers for each point */}
          {coordinates.map((coord, index) => (
            <Marker key={index} position={coord} />
          ))}
        </GoogleMap>
      ) : (
        <p>No valid coordinates available for the route.</p>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
