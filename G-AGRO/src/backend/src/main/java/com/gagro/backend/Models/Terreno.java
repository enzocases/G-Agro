package com.gagro.backend.Models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "terreno")
public class Terreno {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String status;
    private double tamanho;
    private String tipo_solo;
    private String imagem;

    @OneToMany(mappedBy = "terreno")
    private List<Plantio> plantios;


    public Terreno(){}

    public Terreno(String nome, String status, double tamanho, String tipo_solo, String imagem){
        this.nome = nome;
        this.status = status;
        this.tamanho = tamanho;
        this.tipo_solo = tipo_solo;
        this.imagem = imagem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTamanho() {
        return tamanho;
    }

    public void setTamanho(double tamanho) {
        this.tamanho = tamanho;
    }

    public String getTipo_solo() {
        return tipo_solo;
    }

    public void setTipo_solo(String tipo_solo) {
        this.tipo_solo = tipo_solo;
    }

    public String getImagem(){
        return imagem;
    }

    public void setImagem(String imagem){
        this.imagem = imagem;
    }

    @Override
    public String toString() {
        return "Terreno: " + nome + ", " + status + ", " + tamanho + ", " + tipo_solo;
    }
}