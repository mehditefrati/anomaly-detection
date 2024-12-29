import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
    const [coordinates, setCoordinates] = useState([]);
    const location = useLocation();  // To access the URL and query parameters
  
    useEffect(() => {
      // Extract query parameters from the URL
      const queryParams = new URLSearchParams(location.search);
      const trajet = queryParams.get('trajet');
  
      if (trajet) {
        // Decode and parse the coordinates into an array of arrays
        try {
          const decodedCoordinates = JSON.parse(decodeURIComponent(trajet));
          if (Array.isArray(decodedCoordinates)) {
            setCoordinates(decodedCoordinates);
          } else {
            console.error('Decoded coordinates are not in the expected array format.');
          }
        } catch (error) {
          console.error('Error decoding coordinates:', error);
        }
      }
    }, [location.search]);
  
    // If no coordinates are available, show a message
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      return <p>No valid coordinates available for the route.</p>;
    }
  
    // Convert the coordinates to the format expected by Leaflet
    const latLngs = coordinates.map(coord => [parseFloat(coord[0]), parseFloat(coord[1])]);
  
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <MapContainer center={latLngs[0]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Draw the route using Polyline */}
          <Polyline positions={latLngs} color="blue" weight={4} />
          {/* Optionally, add markers for each point */}
          {latLngs.map((coord, index) => (
            <Marker key={index} position={coord}>
              <Popup>
                Coordinate {index + 1}: {coord[0]}, {coord[1]}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };

export default MapComponent;
