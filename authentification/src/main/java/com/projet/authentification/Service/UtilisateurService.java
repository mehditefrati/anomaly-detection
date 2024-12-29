package com.projet.authentification.Service;






import com.projet.authentification.Repository.UtilisateurRepository;
import com.projet.authentification.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // Méthode pour authentifier l'utilisateur en vérifiant son mot de passe
    public Utilisateur authenticateUser(String username, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username);

        // Vérifie si l'utilisateur existe et si le mot de passe est correct
        if (utilisateur != null && utilisateur.getPassword().equals(password)) {
            return utilisateur;
        } else {
            return null;  // Si l'utilisateur n'existe pas ou le mot de passe est incorrect
        }
    }
}


