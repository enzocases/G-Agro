package com.gagro.backend.Models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "plantio")
public class Plantio {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @Column(name = "dataplantio", nullable = false)
        private LocalDate dataPlantio;
        
        @ManyToOne
        @JoinColumn(name = "id_cultura")
        private Cultura cultura;

        @ManyToOne
        @JoinColumn(name = "id_terreno")
        private Terreno terreno;

        public Plantio(Long id, LocalDate dataPlantio, Terreno t, Cultura c){
                this.id = id;
                this.dataPlantio = dataPlantio;
                this.cultura = c;
                this.terreno = t;
        }

        public Plantio() {

        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public LocalDate getDataPlantio() {
                return dataPlantio;
        }

        public void setDataPlantio(LocalDate dataPlantio) {
                this.dataPlantio = dataPlantio;
        }

        public Cultura getCultura() {
                return cultura;
        }

        public void setCultura(Cultura cultura) {
                this.cultura = cultura;
        }

        public Terreno getTerreno() {
                return terreno;
        }

        public void setTerreno(Terreno terreno) {
                this.terreno = terreno;
        }
}