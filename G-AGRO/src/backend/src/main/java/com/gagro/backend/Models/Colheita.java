package com.gagro.backend.Models;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "colheita")
public class Colheita {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "colheita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AcaoCorretiva> acoesCorretivas;

    @ManyToOne
    @JoinColumn(name = "id_cultura")
    private Cultura cultura;

    @OneToOne
    @JoinColumn(name = "id_terreno")
    private Terreno terreno;

    private LocalDate dataInicio;

    private String condicao;

    private int sacas;

    private String aprovacao;

    private String feedBack;

    public Colheita(Long id, Cultura cultura, Terreno terreno, LocalDate dataInicio, String condicao, int sacas, String aprovacao, String feedBack) {
        this.id = id;
        this.cultura = cultura;
        this.terreno = terreno;
        this.dataInicio = dataInicio;
        this.condicao = condicao;
        this.sacas = sacas;
        this.aprovacao = aprovacao;
        this.feedBack = feedBack;
    }

    public Colheita() {

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getCondicao() {
        return condicao;
    }

    public void setCondicao(String condicao) {
        this.condicao = condicao;
    }

    public int getSacas() {
        return sacas;
    }

    public void setSacas(int sacas) {
        this.sacas = sacas;
    }

    public String getAprovacao() {
        return aprovacao;
    }

    public void setAprovacao(String aprovacao) {
        this.aprovacao = aprovacao;
    }

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
    }


}
