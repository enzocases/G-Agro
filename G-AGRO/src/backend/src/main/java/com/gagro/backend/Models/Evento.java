package com.gagro.backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "evento")
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoEvento;

    @OneToOne
    @JoinColumn(name = "id_plantio", nullable = true)
    private Plantio plantio;

    // TODO
    @OneToOne
    @JoinColumn(name = "id_colheita", nullable = true)
    private Colheita colheita;

    // TODO

    @PrePersist
    @PreUpdate
    public void validateRelationship() {
        if (plantio != null && colheita != null) {
            throw new IllegalStateException("Um evento não pode estar associado a ambos Plantio e Colheita.");
        }
        if (plantio == null && colheita == null) {
            throw new IllegalStateException("Um evento deve estar associado a pelo menos Plantio ou Colheita.");
        }
    }

    public Evento(){}

    public Evento(String tipoEvento, Plantio plantio){
        this.tipoEvento = tipoEvento;
        this.plantio = plantio;
    }

    public Evento(String tipoEvento, Colheita colheita){
        this.tipoEvento = tipoEvento;
         this.colheita = colheita;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public Plantio getPlantio() {
        return plantio;
    }

    public void setPlantio(Plantio plantio) {
        this.plantio = plantio;
    }

    public Colheita getColheita(){
        return colheita;
    }

    public void setColheita(Colheita colheita){
        this.colheita = colheita;
    }
}