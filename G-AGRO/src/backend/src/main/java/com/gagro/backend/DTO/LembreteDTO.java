package com.gagro.backend.DTO;

import java.time.LocalDate;

public class LembreteDTO {
    private Long idEvento;
    private Long idUsuario;
    private String titulo;
    private String descricao;
    private String datalembrete;
    private String status;

    public LembreteDTO(Long idEvento, Long idUsuario, String titulo, String descricao, String datalembrete, String status) {
        this.idEvento = idEvento;
        this.idUsuario = idUsuario;
        this.titulo = titulo;
        this.descricao = descricao;
        this.datalembrete = datalembrete;
        this.status = status;
    }

    // Getters e Setters

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataLembrete() {
        return datalembrete;
    }

    public void setDataLembrete(String dataLembrete) {
        this.datalembrete = dataLembrete;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}