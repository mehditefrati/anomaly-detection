package com.projet.gestionlivraison.Entities;

import jakarta.persistence.*;

import java.util.List;


import java.time.LocalDate;
import java.util.List;

@Entity
public class Livraison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private LocalDate dateDebut;
    private LocalDate dateArrivee;

    @ElementCollection
    @CollectionTable(name = "trajet", joinColumns = @JoinColumn(name = "livraison_id"))
    @Column(name = "coordonnees")
    private List<String> trajet; // Trajet sous forme de coordonnées (ex: "644554, 5645")

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateArrivee() {
        return dateArrivee;
    }

    public void setDateArrivee(LocalDate dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    public List<String> getTrajet() {
        return trajet;
    }

    public void setTrajet(List<String> trajet) {
        this.trajet = trajet;
    }
}
