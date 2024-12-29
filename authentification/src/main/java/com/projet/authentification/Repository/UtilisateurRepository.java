package com.projet.authentification.Repository;




import com.projet.authentification.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, String> {
   Utilisateur findByUsername(String username);
}

