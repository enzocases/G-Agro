package com.gagro.backend.DTO;

public class ColheitaDTO {

    private Long idCultura;
    private Long idTerreno;
    private String dataInicio;
    private String condicao;
    private int sacas;
    private String aprovacao;
    private String feedBack;

    public ColheitaDTO() {}

    public ColheitaDTO(Long idCultura, Long idTerreno, String dataInicio, String condicao, int sacas, String aprovacao, String feedBack) {
        this.idCultura = idCultura;
        this.idTerreno = idTerreno;
        this.dataInicio = dataInicio;
        this.condicao = condicao;
        this.sacas = sacas;
        this.aprovacao = aprovacao;
        this.feedBack = feedBack;
    }

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

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
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
