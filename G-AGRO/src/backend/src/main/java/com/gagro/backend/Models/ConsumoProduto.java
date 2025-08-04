package com.gagro.backend.Models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class ConsumoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = true)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    private LocalDate dataConsumo;

    private Long quantidadeConsumida;

    public ConsumoProduto() {
    }

    public ConsumoProduto(Usuario usuario, Produto produto, LocalDate dataConsumo, Long quantidadeConsumida) {
        this.usuario = usuario;
        this.produto = produto;
        this.dataConsumo = dataConsumo;
        this.quantidadeConsumida = quantidadeConsumida;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public LocalDate getDataConsumo() {
        return dataConsumo;
    }

    public void setDataConsumo(LocalDate dataConsumo) {
        this.dataConsumo = dataConsumo;
    }

    public Long getQuantidadeConsumida() {
        return quantidadeConsumida;
    }

    public void setQuantidadeConsumida(Long quantidadeConsumida) {
        this.quantidadeConsumida = quantidadeConsumida;
    }
}
