package com.gagro.backend.DTO;

import java.time.LocalDate;

public class ConsumoProdutoDTO {
    private Long quantidadeConsumida;
    private String dataConsumo;
    private Long idUsuario;
    private Long idProduto;

    public ConsumoProdutoDTO(Long idProduto, Long idUsuario, String dataConsumo, Long quantidadeConsumida) {
        this.idProduto = idProduto;
        this.idUsuario = idUsuario;
        this.dataConsumo = dataConsumo;
        this.quantidadeConsumida = quantidadeConsumida;
    }

    public Long getQuantidadeConsumida() {
        return quantidadeConsumida;
    }

    public void setQuantidadeConsumida(Long quantidadeConsumida) {
        this.quantidadeConsumida = quantidadeConsumida;
    }

    public String getDataConsumo() {
        return dataConsumo;
    }

    public void setDataConsumo(String dataConsumo) {
        this.dataConsumo = dataConsumo;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }
}