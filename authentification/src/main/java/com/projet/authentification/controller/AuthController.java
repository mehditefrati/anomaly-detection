package com.projet.authentification.controller;

import com.projet.authentification.Service.UtilisateurService;
import com.projet.authentification.model.Utilisateur;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    // Méthode pour l'authentification
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Utilisateur user, HttpSession session) {
        // Authentifier l'utilisateur via le service
        Utilisateur utilisateur = utilisateurService.authenticateUser(user.getUsername(), user.getPassword());

        // Vérifier si l'utilisateur existe et si les identifiants sont corrects
        if (utilisateur != null) {
            // Gérer la session de l'utilisateur
            session.setAttribute("username", utilisateur.getUsername());
            session.setAttribute("role", utilisateur.getRole());
            return ResponseEntity.ok("Authentification réussie");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
        }
    }

    // Méthode pour se déconnecter (enlever la session)
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();  // Invalider la session
        return ResponseEntity.ok("Déconnexion réussie");
    }
}



