import axios from 'axios';

const API_URL = 'http://localhost:8060/auth';

const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
};

const logout = async () => {
  return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export default { login, logout };
