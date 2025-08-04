package com.gagro.backend.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Column(name = "quantidade_minima")
    private int quantidadeMinima;
    private String tipo;
    @Column(name = "instrucoes_manejo")
    private String instrucoesManejo;
    @Column(name = "quantidade_em_estoque")
    private int quantidadeEmEstoque;
    private String imagem;

    public Produto(){}

    public Produto(String nome, int quantidadeMinima, String tipo, String instrucoesManejo, int quantidadeEmEstoque, String imagem) {
        this.nome = nome;
        this.quantidadeMinima = quantidadeMinima;
        this.tipo = tipo;
        this.instrucoesManejo = instrucoesManejo;
        this.quantidadeEmEstoque = quantidadeEmEstoque;
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(int quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getInstrucoesManejo() {
        return instrucoesManejo;
    }

    public void setInstrucoesManejo(String instrucoesManejo) {
        this.instrucoesManejo = instrucoesManejo;
    }

    public int getQuantidadeEmEstoque() {
        return quantidadeEmEstoque;
    }

    public void setQuantidadeEmEstoque(int quantidadeEmEstoque) {
        this.quantidadeEmEstoque = quantidadeEmEstoque;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }
}