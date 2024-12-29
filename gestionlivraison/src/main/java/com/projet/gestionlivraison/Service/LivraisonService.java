package com.projet.gestionlivraison.Service;

import com.projet.gestionlivraison.Entities.Livraison;
import com.projet.gestionlivraison.Repository.LivraisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivraisonService {

    private final LivraisonRepository livraisonRepository;

    @Autowired
    public LivraisonService(LivraisonRepository livraisonRepository) {
        this.livraisonRepository = livraisonRepository;
    }

    public List<Livraison> getAllLivraisons() {
        return livraisonRepository.findAll();
    }


    public Livraison saveLivraison(Livraison livraison) {
        try {
            return livraisonRepository.save(livraison);
        } catch (Exception e) {
            // Capture l'exception et affiche un message d'erreur
            throw new RuntimeException("Erreur lors de l'enregistrement de la livraison: " + e.getMessage());
        }
    }


    public Livraison getLivraisonById(Long id) {
        return livraisonRepository.findById(id).orElse(null);
    }

    public void deleteLivraison(Long id) {
        livraisonRepository.deleteById(id);
    }
}

