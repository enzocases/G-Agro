package com.gagro.backend.DTO;

import jakarta.validation.constraints.NotNull;


public class PlantioDTO {
    
    private Long idCultura;
    private Long idTerreno;
    private String dataplantio; // Mantenha como String para receber o formato que você enviar

    // Getters e Setters
    public Long getIdCultura() {
        return idCultura;
    }

    public void setIdCultura(Long idCultura) {
        this.idCultura = idCultura;
    }

    public Long getIdTerreno() {
        return idTerreno;
    }

    public void setIdTerreno(Long idTerreno) {
        this.idTerreno = idTerreno;
    }

    public String getDataplantio() {
        return dataplantio;
    }

    public void setDataplantio(String dataplantio) {
        this.dataplantio = dataplantio;
    }
}
