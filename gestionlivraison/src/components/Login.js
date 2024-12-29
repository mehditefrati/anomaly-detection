import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthenticationService';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      if (response.status === 200) {
        navigate('/livraison');
      }
    } catch (err) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="login-button" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
