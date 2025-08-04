package com.gagro.backend.Service;

import com.gagro.backend.Models.Cultura;
import com.gagro.backend.repository.CulturaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CulturaService {

    @Autowired
    private CulturaRepository culturaRepository;
    
    public List<Cultura> getAllCultures() {
        return culturaRepository.findAll();
    }

    public Optional<Cultura> getCultureById(Long id) {
        return culturaRepository.findById(id);
    }

    public String registerCulture(Cultura cultura) {
        culturaRepository.save(cultura);
        return "Cultura cadastrada com sucesso!";
    }

    public String updateCulture(Long id, Cultura culturaAtualizada) {
        Optional<Cultura> culturaOptional = culturaRepository.findById(id);
        if(culturaOptional.isPresent()){
            culturaAtualizada.setId(id);
            culturaRepository.save(culturaAtualizada);
            return "Cultura atualizada com sucesso!";
        }
        return "Cultura não encontrada";
    }

    public String deleteCulture(Long id) {
        Optional<Cultura> culturaOptional = culturaRepository.findById(id);
        if(culturaOptional.isPresent()){
            
            culturaRepository.deleteById(id);
            return "Cultura excluída com sucesso!";
        }
        return "Cultura não encontrada";
    }
}
