package com.gagro.backend.Controllers;

import com.gagro.backend.Models.Cultura;
import com.gagro.backend.Service.CulturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/culturas")
public class CulturaController {

    @Autowired
    private CulturaService culturaService;

    // Endpoint para listar todas as culturas
    @GetMapping
    public List<Cultura> listarCulturas() {
        return culturaService.getAllCultures();
    }

    // Endpoint para buscar uma cultura por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cultura> buscarCulturaPorId(@PathVariable Long id) {
        Optional<Cultura> cultura = culturaService.getCultureById(id);
        if (cultura.isPresent()) {
            return ResponseEntity.ok(cultura.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para cadastrar uma nova cultura
    @PostMapping
    public ResponseEntity<String> cadastrarCultura(@RequestBody Cultura cultura) {
        try {
            culturaService.registerCulture(cultura);
            return ResponseEntity.status(HttpStatus.CREATED).body("Cultura cadastrada com sucesso!");
        } catch (Exception e) {
            // Caso ocorra algum erro ao cadastrar a cultura
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar cultura: " + e.getMessage());
        }
    }

    // Endpoint para atualizar uma cultura existente
    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarCultura(@PathVariable Long id, @RequestBody Cultura culturaAtualizada) {
        String mensagem = culturaService.updateCulture(id, culturaAtualizada);
        if (mensagem.equals("Cultura não encontrada.")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mensagem);
    }

    // Endpoint para deletar uma cultura
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarCultura(@PathVariable Long id) {
        String mensagem = culturaService.deleteCulture(id);
        if (mensagem.equals("Cultura não encontrada.")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mensagem);
    }
}
