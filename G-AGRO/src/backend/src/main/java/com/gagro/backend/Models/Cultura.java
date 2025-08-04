package com.gagro.backend.Models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cultura")
public class Cultura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "nomecultura", nullable = false)
    private String nomecultura;
    @Column (name = "tempoplantio", nullable = false)
    private int tempoPlantio;

    private String tipo;
    private String imagem;
    private String descricao;

    @OneToMany(mappedBy = "cultura")
    private List<Plantio> plantios;

    // Construtores
    public Cultura() {
    }

    public Cultura(String nomecultura, int tempoPlantio, String tipo, String imagem, String descricao) {
        this.nomecultura = nomecultura;
        this.tempoPlantio = tempoPlantio;
        this.tipo = tipo;
        this.imagem = imagem;
        this.descricao = descricao;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCultura() {
        return nomecultura;
    }

    public void setNomeCultura(String nomeCultura) {
        this.nomecultura = nomeCultura;
    }

    public int getTempoPlantio() {
        return tempoPlantio;
    }

    public void setTempoPlantio(int tempoPlantio) {
        this.tempoPlantio = tempoPlantio;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Cultura{" +
                "id=" + id +
                ", nomeCultura='" + nomecultura + '\'' +
                ", tempoPlantio=" + tempoPlantio +
                ", tipo='" + tipo + '\'' +
                ", imagem='" + imagem + '\'' +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}