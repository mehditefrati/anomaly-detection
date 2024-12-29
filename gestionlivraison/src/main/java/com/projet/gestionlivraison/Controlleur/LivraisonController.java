package com.projet.gestionlivraison.Controlleur;

import com.projet.gestionlivraison.Entities.Livraison;
import com.projet.gestionlivraison.Repository.LivraisonRepository;
import com.projet.gestionlivraison.Service.LivraisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LivraisonController {

    @Autowired
    private LivraisonService livraisonService;

    @GetMapping("/livraisons")
    public List<Livraison> getAllLivraisons() {
        return livraisonService.getAllLivraisons();
    }

    @Transactional
    @PostMapping("/livraisons")
    public ResponseEntity<String> createLivraison(@RequestBody Livraison livraison) {
        livraisonService.saveLivraison(livraison);
        return ResponseEntity.status(HttpStatus.CREATED).body("Livraison ajoutée avec succès !");
    }

    @GetMapping("/livraisons/{id}")
    public Livraison getLivraison(@PathVariable Long id) {
        return livraisonService.getLivraisonById(id);
    }
}
