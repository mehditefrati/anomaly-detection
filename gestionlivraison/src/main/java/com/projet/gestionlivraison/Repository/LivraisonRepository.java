package com.projet.gestionlivraison.Repository;

import com.projet.gestionlivraison.Entities.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivraisonRepository extends JpaRepository<Livraison,Long> {
}
