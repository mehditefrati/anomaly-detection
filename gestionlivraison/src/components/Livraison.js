import React, { useEffect, useState } from 'react';
import LivraisonService from '../service/LivraisonService';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Livraison.css';

const Livraison = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const [anomalies, setAnomalies] = useState({}); // State for storing anomaly data per trajet
  const coordinates = [
    [31.6324805, -7.9909368],
    [31.6324911, -7.9909842],
    [31.6324564, -7.9909938]
  ];
  
  const navigate = useNavigate();

  const handleNavigatee = (coordinates) => {
    const encodedCoordinates = encodeURIComponent(JSON.stringify(coordinates));
    navigate(`/map?trajet=${encodedCoordinates}`);
  };
  
  const handleNavigate = () => {
    // Encode the coordinates array and convert it to a query parameter
    const encodedCoordinates = encodeURIComponent(JSON.stringify(coordinates));
    
    // Navigate to the '/map' route with the 'trajet' query parameter
    navigate(`/map?trajet=${encodedCoordinates}`);
  };

  useEffect(() => {
    const fetchLivraisons = async () => {
      try {
        const response = await LivraisonService.getAllLivraisons();
        console.log(response.data);
        setLivraisons(response.data);
      } catch (error) {
        setError('Erreur de chargement des livraisons');
        console.error('Erreur:', error);
      }
    };
    fetchLivraisons();
  }, []);

  // Function to check anomaly for a given trajet
  const checkAnomaly = async (trajet) => {
    // Convert trajet string coordinates to an array of arrays [[lat, lon], [lat, lon], ...]
    const coordinates = trajet.map((coord) => {
      const [lat, lon] = coord.split(',').map((value) => parseFloat(value.trim()));
      return [lat, lon];
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', { coordinates });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.error('Error checking anomaly:', err);
      return { is_anomaly: false, error: 0 };
    }
  };

  // Function to update anomalies for all livraisons
  const fetchAnomalies = async () => {
    const newAnomalies = {};
    for (const livraison of livraisons) {
      if (livraison.trajet) {
        // Assume trajet is an array of strings (e.g. ["63432, 1345", "63433, 1346"])
        const anomaly = await checkAnomaly(livraison.trajet);
        newAnomalies[livraison.id] = anomaly;
      }
    }
    setAnomalies(newAnomalies);
  };

  useEffect(() => {
    if (livraisons.length > 0) {
      fetchAnomalies();
    }
  }, [livraisons]); // Fetch anomalies when livraisons are loaded

  return (
    <div>
      <h2>Gestion des Livraisons</h2>
      {error && <p>{error}</p>} {/* Affichage de l'erreur si présente */}
      <table className="livraison-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Arrivée</th>
            <th>Date Début</th>
            <th>Nom</th>
            <th>Trajet</th>
            <th>Anomaly</th> {/* New column for Anomaly */}
          </tr>
        </thead>
        <tbody>
          {livraisons.map((livraison) => (
            <tr key={livraison.id}>
              <td>{livraison.id}</td>
              <td>{livraison.dateArrivee}</td>
              <td>{livraison.dateDebut}</td>
              <td>{livraison.nom}</td>
              <td>
                {livraison.trajet.map((coordonnees, index) => (
                  <div key={index}>{coordonnees}</div> // Affichage des coordonnées
                ))}
              </td>
              <td>
                {anomalies[livraison.id] ? (
                  <div>
                    <p>{anomalies[livraison.id].is_anomaly ? 'Yes' : 'No'}</p>
                    <p>Deviation: {anomalies[livraison.id].error.toFixed(2)}</p>
                  </div>
                ) : (
                  <p>Loading...</p> // Show loading until anomaly data is available
                )}
              </td>
              <td>
                <button onClick={() => handleNavigate(livraison.trajet)}>View on Map</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Livraison;
