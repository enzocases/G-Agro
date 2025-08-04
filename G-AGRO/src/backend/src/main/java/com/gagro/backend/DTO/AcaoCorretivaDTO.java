package com.gagro.backend.DTO;

public class AcaoCorretivaDTO {

    private String descricao;
    private Long idColheita;

    public AcaoCorretivaDTO(String descricao, Long idColheita) {
        this.descricao = descricao;
        this.idColheita = idColheita;
    }

    public AcaoCorretivaDTO() {}

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getIdColheita() {
        return idColheita;
    }

    public void setIdColheita(Long idColheita) {
        this.idColheita = idColheita;
    }
}
