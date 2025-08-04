package com.gagro.backend.Service;

import com.gagro.backend.Models.Produto;
import com.gagro.backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> getAllProdutos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> getProdutoById(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto getProdutoByTipo(String tipo) {
        return produtoRepository.findByTipo(tipo);
    }

    public String createProduto(Produto produto) {
        produtoRepository.save(produto);
        return "Produto cadastrado com sucesso!";
    }

    public String updateProduto(Long id, Produto produtoAtualizado) {
        Optional<Produto> produto = produtoRepository.findById(id);
        if (produto.isPresent()) {
            produtoAtualizado.setId(id);
            produtoRepository.save(produtoAtualizado);
            return "Produto atualizado com sucesso!";
        }

        return "Produto não encontrado!";
    }

    public String deleteProduto(Long id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        if (produto.isPresent()) {
            produtoRepository.deleteById(id);
            return "Produto deletado com sucesso!";
        }

        return "Produto não encontrado!";
    }

}
