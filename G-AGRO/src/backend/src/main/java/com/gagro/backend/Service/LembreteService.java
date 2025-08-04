package com.gagro.backend.Service;

import com.gagro.backend.Models.Evento;
import com.gagro.backend.Models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.time.format.DateTimeParseException;
import java.time.LocalDate;

import com.gagro.backend.Models.Lembrete; 
import com.gagro.backend.DTO.LembreteDTO;
import com.gagro.backend.repository.LembreteRepository;
import com.gagro.backend.repository.EventoRepository;
import com.gagro.backend.repository.UsuarioRepository;

@Service
public class LembreteService {

    @Autowired
    private LembreteRepository lembreteRepository;

     @Autowired
    private EventoRepository eventoRepository;

     @Autowired
    private UsuarioRepository usuarioRepository;

    // Salvar um novo lembrete
    public String registerLembrete(Lembrete lembrete) {
        lembreteRepository.save(lembrete);
        return "Lembrete cadastrado com sucesso!";
    }

    // Buscar um lembrete por ID
    public Optional<Lembrete> getLembreteById(Long id) {
        return lembreteRepository.findById(id);
    }

    // Atualizar um lembrete existente
    public String updateLembrete(Long id, Lembrete lembrete) {
       Optional<Lembrete> optionalLembrete = lembreteRepository.findById(id);
       if (optionalLembrete.isPresent()) {
           lembrete.setId(id);
           lembreteRepository.save(lembrete);
           return "Lembrete atualizado com sucesso!";
       }
       return "Lembrete com id " + id + "não encontrado!";
    }

    // Deletar um lembrete por ID
    public String deleteLembrete(Long id) {
        Optional<Lembrete> optionalLembrete = lembreteRepository.findById(id);
        if (optionalLembrete.isPresent()) {
            lembreteRepository.deleteById(id);
            return "Lembrete excluído com sucesso!";
        }
        return "Lembrete não encontrado!";
    }

    // Listar todos os lembretes
    public Iterable<Lembrete> getAllLembretes() {
        return lembreteRepository.findAll();
    }

}