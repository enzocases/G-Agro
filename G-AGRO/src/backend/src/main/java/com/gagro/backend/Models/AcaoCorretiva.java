package com.gagro.backend.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "acaocorretiva")
public class AcaoCorretiva {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_colheita")
    private Colheita colheita;

    public AcaoCorretiva() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Colheita getColheita() {
        return colheita;
    }

    public void setColheita(Colheita colheita) {
        this.colheita = colheita;
    }
}
