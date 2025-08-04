package com.gagro.backend.Service;

import com.gagro.backend.Models.Plantio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gagro.backend.repository.PlantioRepository;
import com.gagro.backend.repository.CulturaRepository;
import com.gagro.backend.repository.TerrenoRepository;


import java.util.List;
import java.util.Optional;

@Service
public class PlantioService {
    
    @Autowired
    private PlantioRepository plantioRepository;

    public String registerPlantio(Plantio plantio) {
        plantioRepository.save(plantio);
        return "Plantio cadastrado com sucesso!";
    }

    public List<Plantio> getAllPlantios() {
        return plantioRepository.findAll();
    }

    public Optional<Plantio> getPlantioById(Long id) {
        return plantioRepository.findById(id);
    }

    public String updatePlantioById(Long id, Plantio plantio) {
        Optional<Plantio> plantioOptional = plantioRepository.findById(id);
        if (plantioOptional.isPresent()) {
            plantio.setId(id);
            plantioRepository.save(plantio);
            return "Plantio atualizado com sucesso!";
        }
        return "Plantio com id " + id + " não encontrado;";
    }

    public String deletePlantioById(Long id) {
        Optional<Plantio> plantioOptional = plantioRepository.findById(id);
        if (plantioOptional.isPresent()) {
            plantioRepository.deleteById(id);
            return "Plantio deletado com sucesso!";
        }
        return "Plantio não encontrado!";
    }

}