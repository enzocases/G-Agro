package com.gagro.backend.Service;


import com.gagro.backend.Models.ConsumoProduto;
import com.gagro.backend.repository.ConsumoProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumoProdutoService {

    @Autowired
    private ConsumoProdutoRepository consumoProdutoRepository;

    public List<ConsumoProduto> getAllConsumoProdutos() {
        return consumoProdutoRepository.findAll();
    }

    public Optional<ConsumoProduto> getConsumoProdutoById(Long id) {
        return  consumoProdutoRepository.findById(id);
    }

    public String registerConsumoProduto(ConsumoProduto consumoProduto) {
        consumoProdutoRepository.save(consumoProduto);
        return "Registro efetuado com sucesso!";
    }

    public String updateConsumoProduto(Long id, ConsumoProduto consumoProduto) {
        Optional<ConsumoProduto> consumoProdutoOptional = consumoProdutoRepository.findById(id);
        if (consumoProdutoOptional.isPresent()) {
            consumoProduto.setId(id);
            consumoProdutoRepository.save(consumoProduto);
            return "Registro atualizado com sucesso!";
        }

        return "Consumo de Produto com id" + id + "não encontrado!";
    }

    public String deleteConsumoProduto(Long id) {
        Optional<ConsumoProduto> consumoProdutoOptional = consumoProdutoRepository.findById(id);
        if (consumoProdutoOptional.isPresent()) {
            consumoProdutoRepository.deleteById(id);
            return "Consumo de Produto deletado com sucesso!";
        }

        return "Consumo de Produto não encontrado";
    }

}
