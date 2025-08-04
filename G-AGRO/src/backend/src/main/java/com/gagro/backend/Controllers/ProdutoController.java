package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.ProdutoDTO;
import com.gagro.backend.Models.Produto;
import com.gagro.backend.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> getAll() {
        return produtoService.getAllProdutos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        Optional<Produto> produto = produtoService.getProdutoById(id);
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Produto> addProduto(@RequestBody ProdutoDTO novoProduto) {
        Produto produto = new Produto();
        produto.setNome(novoProduto.getNome());
        produto.setQuantidadeMinima(novoProduto.getQuantidadeMinima());
        produto.setQuantidadeEmEstoque(novoProduto.getQuantidadeEmEstoque());
        produto.setTipo(novoProduto.getTipo());
        produto.setImagem(novoProduto.getImagem());
        produto.setInstrucoesManejo(novoProduto.getInstrucoesManejo());
        String response = produtoService.createProduto(produto);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody ProdutoDTO novoProduto) {
        Produto produto = new Produto();
        produto.setNome(novoProduto.getNome());
        produto.setQuantidadeMinima(novoProduto.getQuantidadeMinima());
        produto.setQuantidadeEmEstoque(novoProduto.getQuantidadeEmEstoque());
        produto.setTipo(novoProduto.getTipo());
        produto.setImagem(novoProduto.getImagem());
        produto.setInstrucoesManejo(novoProduto.getInstrucoesManejo());
        String response = produtoService.updateProduto(id, produto);
        if(response.contains("não encontrado")){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduto(@PathVariable Long id) {
        String response = produtoService.deleteProduto(id);
        if(response.contains("não encontrado")){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

}
