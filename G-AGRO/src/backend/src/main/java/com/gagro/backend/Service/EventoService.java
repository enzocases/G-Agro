package com.gagro.backend.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gagro.backend.Models.Evento;
import com.gagro.backend.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    // Salvar um novo evento
    public String registerEvento(Evento evento) {
        if (evento.getPlantio() == null && evento.getColheita() == null) {
            throw new IllegalArgumentException("Um evento deve estar associado a pelo menos um Plantio ou Colheita.");
        }
    
        if (evento.getPlantio() != null && evento.getColheita() != null) {
            throw new IllegalArgumentException("Um evento não pode estar associado a ambos Plantio e Colheita.");
        }
    
        eventoRepository.save(evento);
        return "Evento cadastrado com sucesso!";
    }

    // Buscar um evento por ID
    public Optional<Evento> getEventoById(Long id) {
        return eventoRepository.findById(id);
    }

    // Atualizar um evento existente
    public Evento updateEvento(Long id, Evento eventoAtualizado) {
        Optional<Evento> eventoExistente = eventoRepository.findById(id);

        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();
            evento.setTipoEvento(eventoAtualizado.getTipoEvento());
            evento.setPlantio(eventoAtualizado.getPlantio());
            evento.setColheita(eventoAtualizado.getColheita()); // Descomente se a coluna de colheita for adicionada

            return eventoRepository.save(evento);
        } else {
            throw new RuntimeException("Evento com ID " + id + " não encontrado.");
        }
    }

    // Deletar um evento por ID
    public void deleteEvento(Long id) {
        if (eventoRepository.existsById(id)) {
            eventoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Evento com ID " + id + " não encontrado.");
        }
    }

    // Listar todos os eventos
    public Iterable<Evento> getAllEventos() {
        return eventoRepository.findAll();
    }

}