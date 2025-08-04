package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.ConsumoProdutoDTO;
import com.gagro.backend.Models.ConsumoProduto;
import com.gagro.backend.Models.Cultura;
import com.gagro.backend.Models.Produto;
import com.gagro.backend.Models.Usuario;

import com.gagro.backend.Service.ConsumoProdutoService;
import com.gagro.backend.repository.ConsumoProdutoRepository;
import com.gagro.backend.repository.ProdutoRepository;
import com.gagro.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/consumoProduto")
public class ConsumoProdutoController {

    @Autowired
    private ConsumoProdutoRepository consumoProdutoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ConsumoProdutoService consumoProdutoService;

    @GetMapping
    public List<ConsumoProduto> getAllConsumoProdutos() {
        return consumoProdutoService.getAllConsumoProdutos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsumoProduto> getConsumoProdutoById(@PathVariable Long id) {
        Optional<ConsumoProduto> consumoProduto = consumoProdutoService.getConsumoProdutoById(id);
        if(consumoProduto.isPresent()) {
            return ResponseEntity.ok(consumoProduto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> createConsumoProduto(@RequestBody ConsumoProdutoDTO consumoProdutoDTO) {
        ConsumoProduto consumoProduto = new ConsumoProduto();

        LocalDate dataConsumoLocalDate;
        try {
            dataConsumoLocalDate = LocalDate.parse(consumoProdutoDTO.getDataConsumo().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        consumoProduto.setDataConsumo(dataConsumoLocalDate);
        consumoProduto.setQuantidadeConsumida(consumoProdutoDTO.getQuantidadeConsumida());
        consumoProduto.setProduto(produtoRepository.getReferenceById(consumoProdutoDTO.getIdProduto()));

        if(consumoProdutoDTO.getIdUsuario() != null){
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(consumoProdutoDTO.getIdUsuario());
            if(optionalUsuario.isPresent()) {
                consumoProduto.setUsuario(optionalUsuario.get());
            }else{
                return ResponseEntity.badRequest().body("Usuário não encontrado.");
            }
        }

        String response = consumoProdutoService.registerConsumoProduto(consumoProduto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateConsumoProduto(@PathVariable Long id, @RequestBody ConsumoProdutoDTO consumoProdutoDTO) {
        ConsumoProduto consumoProduto = new ConsumoProduto();
        LocalDate dataPlantioLocalDate;
        try {
            dataPlantioLocalDate = LocalDate.parse(consumoProdutoDTO.getDataConsumo().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        consumoProduto.setDataConsumo(dataPlantioLocalDate);
        consumoProduto.setQuantidadeConsumida(consumoProdutoDTO.getQuantidadeConsumida());
        consumoProduto.setProduto(produtoRepository.getReferenceById(consumoProdutoDTO.getIdProduto()));

        if(consumoProdutoDTO.getIdUsuario() != null){
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(consumoProdutoDTO.getIdUsuario());
            if(optionalUsuario.isPresent()) {
                consumoProduto.setUsuario(optionalUsuario.get());
            }else{
                return ResponseEntity.badRequest().body("Usuário não encontrado.");
            }
        }

        String response = consumoProdutoService.updateConsumoProduto(id, consumoProduto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConsumoProduto(@PathVariable Long id) {
        String response = consumoProdutoService.deleteConsumoProduto(id);
        if(response.equals("não encontrado")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}