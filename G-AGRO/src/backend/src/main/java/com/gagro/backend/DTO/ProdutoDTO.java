package com.gagro.backend.DTO;

public class ProdutoDTO {

    private String nome;
    private int quantidadeMinima;
    private String tipo;
    private String instrucoesManejo;
    private int quantidadeEmEstoque;
    private String imagem;


    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
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
