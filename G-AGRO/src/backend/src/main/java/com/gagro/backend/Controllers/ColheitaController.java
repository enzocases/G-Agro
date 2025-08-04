package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.ColheitaDTO;
import com.gagro.backend.Models.Colheita;
import com.gagro.backend.Models.Cultura;
import com.gagro.backend.Models.Lembrete;
import com.gagro.backend.Models.Terreno;
import com.gagro.backend.Service.ColheitaService;
import com.gagro.backend.Service.CulturaService;
import com.gagro.backend.repository.CulturaRepository;
import com.gagro.backend.repository.TerrenoRepository;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/colheitas")
public class ColheitaController {

    @Autowired
    private ColheitaService colheitaService;
    @Autowired
    private CulturaService culturaService;
    @Autowired
    private CulturaRepository culturaRepository;
    @Autowired
    private TerrenoRepository terrenoRepository;

    @GetMapping
    public List<Colheita> getAllColheitas() {
        return colheitaService.getAllColheitas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Colheita> getColheitaById(@PathVariable Long id) {
        Optional<Colheita> colheita = colheitaService.getColheitaById(id);
        if (colheita.isPresent()) {
            return ResponseEntity.ok(colheita.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarColheita(@RequestBody ColheitaDTO colheitaDTO) {

        if (colheitaDTO.getIdCultura() == null || colheitaDTO.getIdTerreno() == null) {
            return ResponseEntity.badRequest().body("Campos idCultura e idTerreno são obrigatórios.");
        }

        Optional<Cultura> culturaAtual = culturaRepository.findById(colheitaDTO.getIdCultura());
        Optional<Terreno> terrenoAtual = terrenoRepository.findById(colheitaDTO.getIdTerreno());

        if (culturaAtual.isEmpty() || terrenoAtual.isEmpty()) {
            return ResponseEntity.badRequest().body("Cultura ou Terreno não encontrado com os IDs fornecidos.");
        }

        Colheita colheita = new Colheita();

        colheita.setCondicao(colheitaDTO.getCondicao());
        colheita.setSacas(colheitaDTO.getSacas());
        colheita.setAprovacao(colheitaDTO.getAprovacao());
        colheita.setFeedBack(colheitaDTO.getFeedBack());
        colheita.setCultura(culturaAtual.get());
        colheita.setTerreno(terrenoAtual.get());

        LocalDate dataInicioLocalDate;

        try {
            dataInicioLocalDate = LocalDate.parse(colheitaDTO.getDataInicio().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        colheita.setDataInicio(dataInicioLocalDate);

        String response = colheitaService.registerColheita(colheita);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarColheita(@PathVariable Long id, @RequestBody ColheitaDTO colheitaDTO) {

        Optional<Colheita> optionalColheita = colheitaService.getColheitaById(id);

        if (optionalColheita.isEmpty()) {
            return ResponseEntity.badRequest().body("Colheita não encontrado para o ID: " + id);
        }

        Colheita colheita = optionalColheita.get();
        LocalDate dataInicioLocalDate;
         Cultura culturaAtual = culturaRepository.getReferenceById(colheitaDTO.getIdCultura());
         Terreno terrenoAtual = terrenoRepository.getReferenceById(colheitaDTO.getIdTerreno());

        try {
            dataInicioLocalDate = LocalDate.parse(colheitaDTO.getDataInicio().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        colheita.setDataInicio(dataInicioLocalDate);
        colheita.setCondicao(colheitaDTO.getCondicao());
        colheita.setSacas(colheitaDTO.getSacas());
        colheita.setAprovacao(colheitaDTO.getAprovacao());
        colheita.setFeedBack(colheitaDTO.getFeedBack());
        colheita.setCultura(culturaAtual);
        colheita.setTerreno(terrenoAtual);

        String response = colheitaService.updateColheita(id, colheita);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarColheita(@PathVariable Long id) {
        String response = colheitaService.deleteColheita(id);
        if (response.contains("não encontrada")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

}
