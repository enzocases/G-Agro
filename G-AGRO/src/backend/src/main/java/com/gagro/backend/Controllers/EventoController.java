package com.gagro.backend.Controllers;

import com.gagro.backend.Service.EventoService;
import com.gagro.backend.repository.PlantioRepository;
import com.gagro.backend.repository.ColheitaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gagro.backend.Models.Evento;
import com.gagro.backend.Models.Plantio;
import com.gagro.backend.Models.Colheita;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/eventos")
public class EventoController {

   @Autowired
   private EventoService eventoService;

   @Autowired
   private PlantioRepository plantioRepository;

   @Autowired
   private ColheitaRepository colheitaRepository;

    @GetMapping
    public Iterable<Evento> getAllEventos() {
        return eventoService.getAllEventos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getEventoById(@PathVariable Long id) {
        Optional<Evento> evento = eventoService.getEventoById(id);
        if (evento.isPresent()) {
            return ResponseEntity.ok(evento.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrarEvento(@RequestBody Evento evento) {
        try {
            // Verifica se o evento é de colheita
            if (evento.getColheita() != null && evento.getPlantio() == null) {
                Optional<Colheita> colheita = colheitaRepository.findById(evento.getColheita().getId());
                if (colheita.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Colheita não encontrada.");
                }
                evento.setColheita(colheita.get());
            }
    
            // Verifica se o evento é de plantio
            if (evento.getPlantio() != null && evento.getColheita() == null) {
                Optional<Plantio> plantio = plantioRepository.findById(evento.getPlantio().getId());
                if (plantio.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Plantio não encontrado.");
                }
                evento.setPlantio(plantio.get());
            }
    
            eventoService.registerEvento(evento);
            return new ResponseEntity<>("Evento cadastrado com sucesso!", HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>("Erro de validação: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar o evento: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   @PutMapping("/{id}")
    public ResponseEntity<Evento> updateEvento(@PathVariable Long id, @RequestBody Evento eventoAtualizado) {
        Optional<Evento> existingEvento = eventoService.getEventoById(id);
        if (existingEvento.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Evento evento = existingEvento.get();

        // Atualiza os campos do evento
        evento.setTipoEvento(eventoAtualizado.getTipoEvento());

        // Atualiza o plantio usando o ID do plantio no eventoAtualizado
        if (eventoAtualizado.getPlantio() != null) {
            Optional<Plantio> plantio = plantioRepository.findById(eventoAtualizado.getPlantio().getId());
            plantio.ifPresent(evento::setPlantio);
        }

        if (eventoAtualizado.getColheita() != null) {
            Optional<Colheita> colheita = colheitaRepository.findById(eventoAtualizado.getColheita().getId());
            colheita.ifPresent(evento::setColheita);
        }

        Evento eventoAtualizadoResponse = eventoService.updateEvento(id, evento);
        return ResponseEntity.ok(eventoAtualizadoResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvento(@PathVariable Long id) {
        try {
            eventoService.deleteEvento(id);
            return ResponseEntity.ok("Evento deletado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erro ao deletar evento: " + e.getMessage());
        }
    }
}











