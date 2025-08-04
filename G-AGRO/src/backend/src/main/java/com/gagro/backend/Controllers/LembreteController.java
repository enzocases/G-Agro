package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.LembreteDTO;
import com.gagro.backend.Models.Usuario;
import com.gagro.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.gagro.backend.Models.Lembrete;
import com.gagro.backend.Models.Evento;
import com.gagro.backend.Service.LembreteService;
import com.gagro.backend.repository.EventoRepository;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Optional;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/lembretes")
public class LembreteController {

    @Autowired
    private LembreteService lembreteService;
    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public Iterable<Lembrete> getAllLembretes() {
        return lembreteService.getAllLembretes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getLembreteById(@PathVariable Long id) {
        Optional<Lembrete> lembrete = lembreteService.getLembreteById(id);
        if (lembrete.isPresent()) {
            return new ResponseEntity<>(lembrete.get().toString(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> registerLembrete(@RequestBody LembreteDTO lembreteDTO) {
        
        Lembrete lembrete = new Lembrete();
        lembrete.setTitulo(lembreteDTO.getTitulo());
        lembrete.setDescricao(lembreteDTO.getDescricao());
        lembrete.setStatus(lembreteDTO.getStatus());
        
        LocalDate dataPlantioLocalDate;

        try {
            // Parse da data, substituindo "/" por "-"
            dataPlantioLocalDate = LocalDate.parse(lembreteDTO.getDataLembrete().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }
        lembrete.setDataLembrete(dataPlantioLocalDate);

        if(lembreteDTO.getIdEvento() != null) {
            Optional<Evento> optionalEvento = eventoRepository.findById(lembreteDTO.getIdEvento());
            if (optionalEvento.isPresent()) {
                lembrete.setEvento(optionalEvento.get());
            }else{
                return ResponseEntity.badRequest().body("Evento não encontrado.");
            }
        }
        if(lembreteDTO.getIdUsuario() != null){
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(lembreteDTO.getIdUsuario());
            if(optionalUsuario.isPresent()){
                lembrete.setUsuario(optionalUsuario.get());
            }else{
                return ResponseEntity.badRequest().body("Usuário não encontrado.");
            }
        }
        String response = lembreteService.registerLembrete(lembrete);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarLembrete(@PathVariable Long id, @RequestBody LembreteDTO lembreteDTO) {
        LocalDate dataPlantioLocalDate;
        try {
            // Parse da data, substituindo "/" por "-"
            dataPlantioLocalDate = LocalDate.parse(lembreteDTO.getDataLembrete().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        Optional<Lembrete> optionalLembrete = lembreteService.getLembreteById(id);
        if (optionalLembrete.isEmpty()) {
            return ResponseEntity.badRequest().body("Lembrete não encontrado para o ID: " + id);
        }

        Lembrete lembrete = optionalLembrete.get();
        lembrete.setDataLembrete(dataPlantioLocalDate);
        lembrete.setTitulo(lembreteDTO.getTitulo());
        lembrete.setDescricao(lembreteDTO.getDescricao());
        lembrete.setStatus(lembreteDTO.getStatus());

        if (lembreteDTO.getIdEvento() != null) {
            Optional<Evento> optionalEvento = eventoRepository.findById(lembreteDTO.getIdEvento());
            if (optionalEvento.isPresent()) {
                lembrete.setEvento(optionalEvento.get());
            } else {
                return ResponseEntity.badRequest().body("Evento não encontrado.");
            }
        }

        if (lembreteDTO.getIdUsuario() != null) {
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(lembreteDTO.getIdUsuario());
            if (optionalUsuario.isPresent()) {
                lembrete.setUsuario(optionalUsuario.get());
            } else {
                return ResponseEntity.badRequest().body("Usuário não encontrado.");
            }
        }

        String response = lembreteService.updateLembrete(id, lembrete);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarLembrete(@PathVariable Long id) {
       String response = lembreteService.deleteLembrete(id);
       if (response.contains("não encontrado")) {
           return ResponseEntity.badRequest().body(response);
       }
       return new ResponseEntity<>(response, HttpStatus.OK);
    }
}