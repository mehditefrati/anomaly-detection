import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Livraison from './components/Livraison';
import MapComponent from './components/MapComponent';
import GoogleMapComponent from './components/GoogleMapComponent';
import MapTrajectory from './components/MapTrajectory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/livraison" element={<Livraison />} />
        <Route path="/map" element={<MapTrajectory />} />  {/* Map Route */}
      </Routes>
    </Router>
  );
};

export default App;
