package com.gagro.backend.Controllers;

import com.gagro.backend.DTO.PlantioDTO;
import com.gagro.backend.Models.Plantio;
import com.gagro.backend.Models.Terreno;
import com.gagro.backend.Service.PlantioService;
import com.gagro.backend.repository.CulturaRepository;
import com.gagro.backend.repository.TerrenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/plantios")
public class PlantioController {

    @Autowired
    private PlantioService plantioService;

    @Autowired
    private CulturaRepository culturaRepository;

    @Autowired
    private TerrenoRepository terrenoRepository;

    @GetMapping
    public List<Plantio> getAllPlantios() {
        return plantioService.getAllPlantios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plantio> getPlantioById(@PathVariable Long id) {
        Optional<Plantio> plantio = plantioService.getPlantioById(id);
        if (plantio.isPresent()) {
            return ResponseEntity.ok(plantio.get());
        }
        return ResponseEntity.notFound().build();
    }

     @PostMapping("/cadastro")
     public ResponseEntity<String> registerPlantio(@RequestBody PlantioDTO plantioDTO) {
        Plantio plantio = new Plantio();

        LocalDate dataPlantioLocalDate;
        try {
        dataPlantioLocalDate = LocalDate.parse(plantioDTO.getDataplantio().replace("/", "-"));
        } catch (DateTimeParseException e) {
        return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }

        plantio.setDataPlantio(dataPlantioLocalDate);
        plantio.setCultura(culturaRepository.getReferenceById(plantioDTO.getIdCultura()));
        plantio.setTerreno(terrenoRepository.getReferenceById(plantioDTO.getIdTerreno()));
        String response = plantioService.registerPlantio(plantio);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePlantio(@PathVariable Long id, @RequestBody PlantioDTO plantioDTO) {
        LocalDate dataPlantioLocalDate;
        try {
            // Parse da data, substituindo "/" por "-"
            dataPlantioLocalDate = LocalDate.parse(plantioDTO.getDataplantio().replace("/", "-"));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de data inválido. Use yyyy-MM-dd.");
        }
    
        // Tentativa de buscar o plantio existente
        Optional<Plantio> existingPlantio = plantioService.getPlantioById(id);
        if (existingPlantio.isEmpty()) {
            return ResponseEntity.badRequest().body("Plantio não encontrado para o ID: " + id);
        }
    
        // Atualizando os dados do plantio
        Plantio plantio = existingPlantio.get();
        plantio.setDataPlantio(dataPlantioLocalDate);
        plantio.setCultura(culturaRepository.getReferenceById(plantioDTO.getIdCultura()));
        plantio.setTerreno(terrenoRepository.getReferenceById(plantioDTO.getIdTerreno()));
    
        String response = plantioService.updatePlantioById(id, plantio);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlantio(@PathVariable Long id){
        String response = plantioService.deletePlantioById(id);
        if (response.contains("não encontrado")){
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

}