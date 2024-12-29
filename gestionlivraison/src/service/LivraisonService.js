import axios from 'axios';

const LivraisonService = {
  getAllLivraisons: async () => {
    try {
      const response = await axios.get('http://localhost:8070/livraisons'); // URL de votre API
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des livraisons:', error);
      throw error;
    }
  }
};

export default LivraisonService;
